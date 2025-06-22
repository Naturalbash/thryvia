"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { MentorSidebar } from "./mentor-sidebar";
import { ChatInterface } from "./chat-interface";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  title?: string;
  avatar: string;
  status?: "online" | "offline";
  lastActive?: Date;
}

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  timestamp: Date;
}

export default function WorkersChatDashboard() {
  const [selectedMentor, setSelectedMentor] = useState<User | null>(null);
  const [currentWorker, setCurrentWorker] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingWorker, setIsLoadingWorker] = useState(true);
  const supabase = createClient();

  const mentors: User[] = [
    {
      id: "1",
      name: "Thomas Miller",
      title: "Senior Software Engineer",
      avatar: "/dave.jpg",
      status: "online",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      title: "Product Manager",
      avatar: "/marcus.jpg",
      status: "online",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      title: "UX Designer",
      avatar: "/emily.jpg",
      status: "offline",
      lastActive: new Date(Date.now() - 7200000),
    },
  ];

  // Fetch current worker from Supabase Auth
  useEffect(() => {
    const fetchCurrentWorker = async () => {
      try {
        setIsLoadingWorker(true);
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;

        if (user) {
          const worker: User = {
            id: user.id,
            name: user.user_metadata?.name || user.email || "Worker",
            avatar: user.user_metadata?.avatar || "/muhammed.jpg",
            status: "online",
            lastActive: new Date(),
            title: user.user_metadata?.title || undefined,
          };
          setCurrentWorker(worker);
          console.log("Current worker set:", worker);
        } else {
          toast.error("No authenticated user found. Please log in.");
          setCurrentWorker({
            id: "2",
            name: "Umar Muhammed Basheer",
            avatar: "/muhammed.jpg",
            status: "online",
            lastActive: new Date(),
          });
        }
      } catch (error) {
        console.error("Error fetching current worker:", error);
        toast.error("Failed to load worker profile. Using default profile.");
        setCurrentWorker({
          id: "2",
          name: "Umar Muhammed Basheer",
          avatar: "/muhammed.jpg",
          status: "online",
          lastActive: new Date(),
        });
      } finally {
        setIsLoadingWorker(false);
      }
    };

    fetchCurrentWorker();
  }, [supabase]);

  // Memoize fetchMessages to prevent re-creation
  const fetchMessages = useCallback(
    async (mentorId: string) => {
      if (!currentWorker?.id) return [];

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${currentWorker.id},recipient_id.eq.${mentorId}),and(sender_id.eq.${mentorId},recipient_id.eq.${currentWorker.id})`
        )
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages. Please try again.");
        return [];
      }

      return (
        data?.map((msg) => ({
          id: msg.id,
          sender_id: msg.sender_id,
          recipient_id: msg.recipient_id,
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        })) || []
      );
    },
    [currentWorker?.id, supabase]
  );

  // Real-time subscription to messages
  useEffect(() => {
    if (!selectedMentor || !currentWorker?.id) return;

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (
            payload.new.recipient_id === currentWorker.id ||
            payload.new.sender_id === currentWorker.id
          ) {
            const updatedMessages = await fetchMessages(selectedMentor.id);
            setMessages(updatedMessages);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedMentor, currentWorker?.id, fetchMessages, supabase]);

  // Render loading state while fetching worker
  if (isLoadingWorker || !currentWorker) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading worker profile...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <MentorSidebar
        mentors={mentors}
        selectedMentor={selectedMentor}
        onSelectMentor={async (mentor: User) => {
          // Explicitly type mentor as User
          setSelectedMentor(mentor);
          const msgs = await fetchMessages(mentor.id);
          setMessages(msgs);
        }}
      />
      <div className="flex-1 flex flex-col">
        {selectedMentor ? (
          <ChatInterface
            currentUser={currentWorker}
            recipient={selectedMentor}
            messages={messages}
            onSendMessage={async (content: string) => {
              const { error } = await supabase.from("messages").insert({
                sender_id: currentWorker.id,
                recipient_id: selectedMentor.id,
                content,
                timestamp: new Date().toISOString(),
              });
              if (error) {
                console.error("Error sending message:", error);
                toast.error("Failed to send message. Please try again.");
              }
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a mentor to start chatting
              </h3>
              <p className="text-gray-500">
                Choose a mentor from the sidebar to begin your conversation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
