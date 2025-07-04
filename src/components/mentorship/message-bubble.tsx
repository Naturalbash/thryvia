import { IUser } from "@/interfaces";
import { format } from "date-fns";
import Image from "next/image";

interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: Date;
  chat_session_id: string;
}

interface MessageBubbleProps {
  message: Message;
  currentUser: IUser;
  recipientAvatar: string;
}

export const MessageBubble = ({
  message,
  currentUser,
  recipientAvatar,
}: MessageBubbleProps) => {
  const formatTime = (date: Date) => {
    return format(date, "h:mm a");
  };

  if (message.sender_id === currentUser.id) {
    return (
      <div className="flex justify-end">
        <div className="max-w-xs lg:max-w-md">
          <div className="bg-blue-500 text-white rounded-lg px-4 py-2">
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {formatTime(message.created_at)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3">
      <Image
        src={recipientAvatar}
        alt="Recipient"
        width={32}
        height={32}
        className="rounded-full object-cover flex-shrink-0"
      />
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-gray-100 rounded-lg px-4 py-2">
          <p className="text-sm text-gray-900">{message.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {formatTime(message.created_at)}
        </p>
      </div>
    </div>
  );
};
