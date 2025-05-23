import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import ChatInterface from '../components/Chat/ChatInterface';
import { useTheme } from '../contexts/ThemeContext';

interface ChatProps {
  userId: number;
}

const Chat: React.FC<ChatProps> = ({ userId }) => {
  const api = useApi();
  const { theme } = useTheme();
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getChatHistory(userId);
      setChatHistory(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setError('Failed to load chat history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [api, userId]);

  const handleSendMessage = async (message: string) => {
    // Optimistically add message to UI
    const tempMessage = {
      message,
      response: '',
      isLoading: true,
    };
    
    setChatHistory(prev => [tempMessage, ...prev]);
    
    try {
      const response = await api.chatWithBot(userId, message);
      
      // Remove the temporary message and add the real one
      setChatHistory(prev => {
        const newHistory = prev.filter(msg => !msg.isLoading);
        return [
          {
            message,
            response: response.response,
            timestamp: new Date().toISOString(),
          },
          ...newHistory,
        ];
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove the temporary message and show error
      setChatHistory(prev => prev.filter(msg => !msg.isLoading));
      setError('Failed to send message. Please try again.');
      
      return Promise.reject(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">AI Financial Advisor</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Dismiss
          </button>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <ChatInterface
          messages={loading ? [] : chatHistory}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;