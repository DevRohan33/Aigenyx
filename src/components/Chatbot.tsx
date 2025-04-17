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
  sender: "user" | "bot";
  id: number;
}

interface WebhookResponse {
  reply: string;
}

const initialMessage: Message = {
  text: "Hi! I'm Ava, your AI assistant. How can I help you today?",
  sender: "bot",
  id: 0,
};

const WEBHOOK_URL = "http://localhost:5678/webhook/webhook-test/e9ce502d-cb24-49b8-be18-96c2daf41b7f";

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [messageIdCounter, setMessageIdCounter] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      text: input,
      sender: "user",
      id: messageIdCounter,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageIdCounter((prev) => prev + 1);
    const currentInput = input;
    setInput("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!res.ok) throw new Error("Webhook call failed");

      const data: WebhookResponse = await res.json();

      const botMessage: Message = {
        text: data.reply || "No response from webhook.",
        sender: "bot",
        id: messageIdCounter + 1,
      };

      setMessages((prev) => [...prev, botMessage]);
      setMessageIdCounter((prev) => prev + 1);
    } catch (error) {
      console.error("Error calling webhook:", error);
      const errorMessage: Message = {
        text: "Sorry, there was a problem connecting to the server.",
        sender: "bot",
        id: messageIdCounter + 1,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setMessageIdCounter((prev) => prev + 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden z-50 flex flex-col"
          >
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

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-white border shadow-sm rounded-tl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

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
