import React from 'react';
import { Edit2, Trash2, MessageSquare, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Sidebar() {
  const { chats, currentChat, setCurrentChat, deleteChat, updateChatTitle ,addChat } = useStore();

  const handleEditTitle = (chatId: string, currentTitle: string) => {
    const newTitle = prompt('Enter new chat title:', currentTitle);
    if (newTitle && newTitle.trim()) {
      updateChatTitle(chatId, newTitle.trim());
    }
  };

  return (
    <div className="w-64 bg-[#171717] h-full fixed left-0 top-16 border-r border-gray-800 overflow-y-auto">
    <div className='w-full flex justify-center p-2 h-auto'>  
      <button
              onClick={addChat}
              className="inline-flex  
               items-center px-6 py-2 border border-transparent text-lg font-medium rounded-md text-[#ECECEC]  hover:bg-[#2f2f2f] "
            >
              <Plus className="h-5 w-5 mr-2" />
              New Chat
            </button></div>
            <div className="p-1">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                currentChat === chat.id
                  ? ' hover:bg-[#2f2f2f] text-white'
                  : ' text-white hover:bg-[#2f2f2f]'
              }`}
              onClick={() => setCurrentChat(chat.id)}
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <MessageSquare className="h-5 w-5" />
                <span className="truncate">{chat.title}</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTitle(chat.id, chat.title);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}