import Image from "next/image";

interface TypingIndicatorProps {
  mentorName: string;
  mentorAvatar: string;
}

export const TypingIndicator = ({
  mentorName,
  mentorAvatar,
}: TypingIndicatorProps) => {
  return (
    <div className="flex items-start space-x-3">
      <Image
        src={mentorAvatar}
        alt={mentorName}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
      <div className="bg-gray-100 rounded-lg px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
