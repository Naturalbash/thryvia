"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MessageBubble } from "./message-bubble";
import { IUser } from "@/interfaces";

interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: Date;
  chat_session_id: string;
}

interface ChatInterfaceProps {
  currentUser: IUser;
  recipient: IUser;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatInterface = ({
  currentUser,
  recipient,
  messages,
  onSendMessage,
}: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      await onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white">
        <Image
          src={recipient.avatar_url}
          alt={recipient.first_name + " " + recipient.last_name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-gray-900">
            {recipient.first_name} {recipient.last_name}
          </h2>
          <p className="text-sm text-gray-500">
            {recipient.role || "Remote Worker"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            currentUser={currentUser}
            recipientAvatar={
              message.sender_id === currentUser.id
                ? (currentUser.avatar_url || "/default-avatar.png")
                : (recipient.avatar_url || "/default-avatar.png")
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${recipient.first_name} ${recipient.last_name}...`}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
