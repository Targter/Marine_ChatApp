import { create } from 'zustand';
import { Chat, Message, User } from '../types';
import axios from 'axios';
interface State {
  chats: Chat[];
  currentChat: string | null;
  user: User;
  setUser: (user: User) => void;
  addChat: () => void;
  deleteChat: (id: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  setCurrentChat: (id: string | null) => void;
  addMessage: (
    chatId: string,
    message: Omit<Message, 'id' | 'timestamp'>
  ) => Promise<void>;
}

export const useStore = create<State>((set) => ({
  chats: [],
  currentChat: null,
  user: {
    id: '1',
    name: 'Abhay Bansal',
    isPremium: false,
  },
  setUser: (user) => set({ user }),
  addChat: () =>
    set((state) => ({
      chats: [
        ...state.chats,
        {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
        },
      ],
    })),
  deleteChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      currentChat: state.currentChat === id ? null : state.currentChat,
    })),
  updateChatTitle: (id, title) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, title } : chat
      ),
    })),
  setCurrentChat: (id) => set({ currentChat: id }),
  addMessage: async (chatId, message) => {
    // Add user's message to the chat immediately
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  ...message,
                  id: crypto.randomUUID(),
                  timestamp: Date.now(),
                },
              ],
            }
          : chat
      ),
    }));

    try {
      // API call to save the message and fetch the response
      const response = await axios.get(
        `https://flask-api-three-mu.vercel.app/stream/${message.content}`
      );

      if (response.status !== 200) {
        throw new Error('Failed to fetch the message');
      }

      const data: Message = {
        content: response.data, // Adjust to match your API's response structure
        role: 'assistant',
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };

      // Ensure the response is added only to the correct chat
      set((state) => {
        const updatedChats = state.chats.map((chat) => {
          if (chat.id === chatId) {
            const updatedMessages = [
              ...chat.messages,
              data, // Add the assistant's response
            ];

            // Set the title only for the first message
            if (chat.messages.length === 1) {
              const title = message.content.slice(0, 20);
              return {
                ...chat,
                title, // Set the title based on the first message
                messages: updatedMessages,
              };
            } else {
              return {
                ...chat,
                messages: updatedMessages,
              };
            }
          }
          return chat;
        });

        return { chats: updatedChats };
      });  } catch (error) {
      console.error('Error saving message:', error);
    }
  },
}));
