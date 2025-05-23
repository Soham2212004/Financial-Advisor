import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  response: string;
  timestamp?: string;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  response,
  timestamp,
  isLoading = false,
}) => {
  const { theme } = useTheme();

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Function to convert markdown-like syntax in responses
  const formatResponse = (text: string) => {
    // Replace **bold** with <strong>bold</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace *italic* with <em>italic</em>
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace bullet points
    formattedText = formattedText.replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>');
    
    // Wrap bullet points in ul
    if (formattedText.includes('<li>')) {
      formattedText = formattedText.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    }
    
    // Replace \n with <br />
    formattedText = formattedText.replace(/\n/g, '<br />');
    
    return formattedText;
  };

  return (
    <div className="space-y-3">
      <div className={`flex items-start gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
        }`}>
          <User size={16} />
        </div>
        <div className="flex-1">
          <div className={`inline-block rounded-lg py-2 px-3 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            {message}
          </div>
          {timestamp && (
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatTimestamp(timestamp)}
            </div>
          )}
        </div>
      </div>
      
      <div className={`flex items-start gap-3 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          theme === 'dark' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
        }`}>
          <Bot size={16} />
        </div>
        <div className="flex-1">
          <div className={`inline-block rounded-lg py-2 px-3 max-w-full ${
            theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-50'
          }`}>
            {isLoading ? (
              <div className="flex space-x-1 justify-center py-2">
                <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: formatResponse(response) }} />
            )}
          </div>
          {timestamp && !isLoading && (
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatTimestamp(timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;