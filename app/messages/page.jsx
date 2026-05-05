'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 px-10">
      <Navbar />
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-5xl font-black tracking-tighter mb-12">INBOX <span className="text-outline">.</span></h1>
        
        {loading ? (
          <p className="opacity-50">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="opacity-50">No messages yet.</p>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="glass p-8 rounded-2xl border-l-4 border-l-[var(--accent)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{msg.name}</h3>
                    <p className="text-sm opacity-50">{msg.email}</p>
                  </div>
                  <span className="text-[10px] font-mono opacity-30">{new Date(msg.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-lg opacity-80 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
