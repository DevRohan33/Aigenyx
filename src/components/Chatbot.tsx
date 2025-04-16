
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  id: number;
}

const initialMessage: Message = {
  text: "Hi! I'm Ava, your AI assistant. How can I help you today?",
  sender: 'bot',
  id: 0
};

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [messageIdCounter, setMessageIdCounter] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      id: messageIdCounter
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageIdCounter(prev => prev + 1);
    setInput('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! We'd be happy to help with your AI automation needs.",
        "I'd love to tell you more about our custom AI solutions.",
        "We can build custom AI agents for your specific needs.",
        "Our team specializes in workflow automation. Would you like to know more?",
        "We integrate with various platforms like Telegram, WhatsApp, and more."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        text: randomResponse,
        sender: 'bot',
        id: messageIdCounter + 1
      };
      
      setMessages(prev => [...prev, botMessage]);
      setMessageIdCounter(prev => prev + 2);
    }, 1000);
  };

  // Handle keypress (enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot trigger button (visible when chatbot is closed) */}
      {!isOpen && (
        <motion.button
          onClick={onClose}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chatbot panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
            {/* Chatbot header */}
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-semibold">Ava Bot</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-primary/90"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white border shadow-sm rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
