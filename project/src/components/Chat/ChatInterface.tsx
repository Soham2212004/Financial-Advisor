import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ChatMessage from './ChatMessage';
import { Send, MessageCircle } from 'lucide-react';

interface Message {
  id?: number;
  message: string;
  response: string;
  timestamp?: string;
  isLoading?: boolean;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
}) => {
  const { theme } = useTheme();
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!newMessage.trim() || loading) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSendMessage(newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  // Suggested questions
  const suggestedQuestions = [
    "How can I improve my savings?",
    "Should I pay off debt or invest?",
    "How to create an emergency fund?",
    "Tips for budgeting my income?",
    "How much should I save for retirement?",
  ];

  return (
    <Card title="Financial Advisor Chat" icon={<MessageCircle size={20} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />}>
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.length === 0 ? (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageCircle size={40} className="mx-auto mb-2 opacity-50" />
              <p className="font-medium">Welcome to the Financial Advisor</p>
              <p className="text-sm mt-1">Ask any financial questions to get started!</p>
              
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Try asking:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className={`text-xs px-3 py-1.5 rounded-full text-left ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                      onClick={() => {
                        setNewMessage(question);
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id || index}
                  message={message.message}
                  response={message.response}
                  timestamp={message.timestamp}
                  isLoading={message.isLoading}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="mt-auto">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask a financial question..."
                className={`w-full py-3 px-4 pr-10 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                    : 'bg-white text-gray-900 placeholder-gray-400 border-gray-300'
                } border focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className={`px-4 py-3 ${loading ? 'opacity-70' : ''}`}
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;