/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { MentorSidebar } from "./mentor-sidebar";
import { ChatInterface } from "./chat-interface";
import toast from "react-hot-toast";
import { IUser } from "@/interfaces";
import { ArrowLeft, Menu } from "lucide-react";
import Image from "next/image";

interface Message {
  id: number;
  created_at: Date;
  content: string;
  chat_session_id: string;
  sender_id: string;
  recipient_id: string;
}

export default function WorkersChatDashboard() {
  const [selectedMentor, setSelectedMentor] = useState<IUser | null>(null);
  const [showChat, setShowChat] = useState(false); // for mobile view
  const [currentWorker, setCurrentWorker] = useState<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingWorker, setIsLoadingWorker] = useState(true);
  const [mentors, setMentors] = useState<IUser[]>([]);
  const supabase = createClient();

  // const mentors: IUser[] = [
  //   {
  //     id: "1",
  //     email: "thomassmith@gmail.com",
  //     first_name: "Thomas",
  //     last_name: "Smith",
  //     occupation: "Senior Software Engineer",
  //     avatar_url: "/dave.jpg",
  //     status: "online",
  //     created_at: new Date(),
  //     last_seen: new Date(),
  //     role: "mentor",
  //   },
  //   {
  //     id: "2",
  //     email: "janedoe@example.com",
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     occupation: "Product Manager",
  //     avatar_url: "/jane.jpg",
  //     status: "offline",
  //     created_at: new Date(),
  //     last_seen: new Date(),
  //     role: "mentor",
  //   },
  //   {
  //     id: "3",
  //     email: "michaelchen@example.com",
  //     first_name: "Michael",
  //     last_name: "Chen",
  //     occupation: "Data Scientist",
  //     avatar_url: "/michael.jpg",
  //     status: "online",
  //     created_at: new Date(),
  //     last_seen: new Date(),
  //     role: "mentor",
  //   },
  //   {
  //     id: "4",
  //     email: "lindaroberts@example.com",
  //     first_name: "Linda",
  //     last_name: "Roberts",
  //     occupation: "UX Designer",
  //     avatar_url: "/linda.jpg",
  //     status: "offline",
  //     created_at: new Date(),
  //     last_seen: new Date(),
  //     role: "mentor",
  //   },
  //   {
  //     id: "5",
  //     email: "davidnguyen@example.com",
  //     first_name: "David",
  //     last_name: "Nguyen",
  //     occupation: "DevOps Engineer",
  //     avatar_url: "/david.jpg",
  //     status: "online",
  //     created_at: new Date(),
  //     last_seen: new Date(),
  //     role: "mentor",
  //   },
  // ];

  console.log({ currentWorker, selectedMentor, messages });

  useEffect(() => {
    async function fetchMentors() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "mentor");

        if (error) throw error;

        if (data) {
          const formattedMentors = data.map((mentor: any) => ({
            id: mentor.id,
            email: mentor.email,
            first_name: mentor.first_name,
            last_name: mentor.last_name,
            occupation: mentor.occupation,
            avatar_url: mentor.avatar_url || "/default-avatar.jpg",
            status: mentor.status || "offline",
            created_at: new Date(mentor.created_at),
            last_seen: new Date(mentor.last_seen),
            role: mentor.role,
          }));
          setMentors(formattedMentors);
          // setSelectedMentor(formattedMentors[0] || null);
          return formattedMentors;
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        toast.error("Failed to load mentors. Please try again.");
      }
    }
    fetchMentors();
  }, [supabase]);

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
          const worker = {
            id: user.id,
            name: user.user_metadata?.name || user.email || "Worker",
            avatar: user.user_metadata?.avatar || "/muhammed.jpg",
            status: "online",
            lastActive: new Date(),
            occupation: user.user_metadata?.occupation || undefined,
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
        .from("chat_messages")
        .select("*")
        .eq("chat_session_id", `${currentWorker.id}-${mentorId}`)
        // .or(
        //   `and(sender_id.eq.${currentWorker.id},recipient_id.eq.${mentorId}),and(sender_id.eq.${mentorId},recipient_id.eq.${currentWorker.id})`
        // )
        .order("created_at", { ascending: true });

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
          created_at: new Date(msg.created_at),
          chat_session_id: msg.chat_session_id,
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
        { event: "INSERT", schema: "public", table: "chat_messages" },
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
      {/* Desktop: show both, Mobile: show one at a time, each at full width */}
      {/* Mentor list/sidebar: full width on mobile when chat is not open */}
      <div
        className={
          `transition-all duration-500 ease-in-out ` +
          (showChat && selectedMentor
            ? "hidden lg:block lg:w-80"
            : "fixed inset-0 z-30 bg-white w-full h-full lg:static lg:w-80 flex-shrink-0")
        }
      >
        <MentorSidebar
          mentors={mentors}
          selectedMentor={selectedMentor}
          onSelectMentor={async (mentor: IUser) => {
            setSelectedMentor(mentor);
            setShowChat(true);
            const msgs = await fetchMessages(mentor.id);
            setMessages(msgs);
          }}
        />
      </div>
      {/* Chat overlay: full width on mobile when chat is open */}
      <div
        className={
          `transition-all duration-500 ease-in-out ` +
          (showChat && selectedMentor
            ? "fixed inset-0 z-40 bg-white w-full h-full lg:static lg:w-auto flex-1 flex flex-col"
            : "hidden lg:flex flex-1 flex-col")
        }
      >
        {selectedMentor ? (
          <div className="flex flex-col h-full">
            {/* Chat header with menu and back button on mobile */}
            <div className="lg:hidden flex items-center p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Open menu"
                  style={{ minWidth: 40 }}
                >
                  <Menu size={24} />
                </button>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Back to mentor list"
                  style={{ minWidth: 40 }}
                >
                  <ArrowLeft size={24} />
                </button>
              </div>
              <div className="flex items-center flex-1 min-w-0 ml-4 overflow-hidden">
                <Image
                  src={selectedMentor.avatar_url || "/default-avatar.png"}
                  alt={
                    selectedMentor.first_name + " " + selectedMentor.last_name
                  }
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                />
                <span className="font-semibold text-gray-900 truncate">
                  {selectedMentor.first_name} {selectedMentor.last_name}
                </span>
              </div>
            </div>
            {/* Chat interface (hide header on desktop, show on mobile) */}
            <div className="flex-1 flex flex-col min-h-0">
              <ChatInterface
                currentUser={currentWorker}
                recipient={selectedMentor}
                messages={messages}
                onSendMessage={async (content: string) => {
                  const msg = {
                    id: Math.floor(Math.random() * 1000000),
                    sender_id: currentWorker.id,
                    recipient_id: selectedMentor.id,
                    content,
                    chat_session_id: `${currentWorker.id}-${selectedMentor.id}`,
                    created_at: new Date(),
                  };
                  setMessages((prev) => [...prev, msg]);
                  const { error } = await supabase
                    .from("chat_messages")
                    .insert(msg);

                  if (error) {
                    console.error("Error sending message:", error);
                    toast.error("Failed to send message. Please try again.");
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
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
