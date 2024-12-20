import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { PremiumBanner } from './components/PremiumBanner';

import 'regenerator-runtime/runtime';
function App() {
  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <ChatWindow />
      </div>
      <PremiumBanner />
    </div>
  );
}

export default App;