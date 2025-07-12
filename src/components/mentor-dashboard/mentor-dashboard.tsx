"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { ChatInterface } from "../mentorship/chat-interface";
import toast from "react-hot-toast";
import { IUser } from "@/interfaces";

interface Message {
  id: number;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: Date;
  chat_session_id: string;
}

interface MentorDashboardProps {
  currentMentor: IUser;
}

export const MentorDashboard = ({ currentMentor }: MentorDashboardProps) => {
  const [selectedWorker, setSelectedWorker] = useState<IUser | null>(null);
  const [showChat, setShowChat] = useState(false); // for mobile view
  const [workers, setWorkers] = useState<
    (IUser & { lastMessage: string; unreadCount: number })[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  console.log({ currentMentor, selectedWorker, messages });

  // Fetch workers from database
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("role", "worker")
          .order("last_seen", { ascending: false });

        if (error) {
          console.error("Error fetching workers:", error);
          toast.error("Failed to fetch workers. Please try again.");
          return;
        }

        const formattedWorkers: (IUser & {
          lastMessage: string;
          unreadCount: number;
        })[] =
          data?.map((worker) => ({
            id: worker.id,
            created_at: new Date(worker.created_at),
            email: worker.email,
            role: worker.role,
            occupation: worker.occupation,
            first_name: worker.first_name,
            last_name: worker.last_name,
            avatar_url: worker.avatar_url || "/default-avatar.png",
            status: worker.status || "offline",
            last_seen: new Date(worker.last_seen),
            lastMessage: "",
            unreadCount: 0,
          })) || [];

        setWorkers(formattedWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
        toast.error("Failed to fetch workers. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkers();
  }, [supabase]);

  // Fetch messages for a specific worker
  const fetchMessages = useCallback(
    async (workerId: string) => {
      if (!currentMentor?.id) return [];

      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("chat_session_id", `${workerId}-${currentMentor.id}`)
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
      } catch (error) {
        console.error("Error in fetchMessages:", error);
        return [];
      }
    },
    [currentMentor?.id, supabase]
  );

  // Real-time subscription to messages
  useEffect(() => {
    if (!selectedWorker || !currentMentor?.id) return;

    const channel = supabase
      .channel(`chat_messages_${selectedWorker.id}_${currentMentor.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `chat_session_id=eq.${selectedWorker.id}-${currentMentor.id}`,
        },
        async (payload) => {
          console.log("New message received:", payload);
          const updatedMessages = await fetchMessages(selectedWorker.id);
          setMessages(updatedMessages);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedWorker, currentMentor?.id, fetchMessages, supabase]);

  // Handle sending messages with proper error handling and optimistic updates
  const handleSendMessage = async (content: string) => {
    if (!selectedWorker || !currentMentor?.id || !content.trim()) return;

    const tempId = Date.now(); // Temporary ID for optimistic update
    const newMessage: Message = {
      id: tempId,
      sender_id: currentMentor.id,
      recipient_id: selectedWorker.id,
      content: content.trim(),
      created_at: new Date(),
      chat_session_id: `${selectedWorker.id}-${currentMentor.id}`,
    };

    // Optimistic update
    setMessages((prev) => [...prev, newMessage]);

    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .insert({
          sender_id: currentMentor.id,
          recipient_id: selectedWorker.id,
          content: content.trim(),
          chat_session_id: `${selectedWorker.id}-${currentMentor.id}`,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again.");
        // Remove optimistic update on error
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
        return;
      }

      if (data) {
        // Replace optimistic message with real one
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId
              ? {
                  id: data.id,
                  sender_id: data.sender_id,
                  recipient_id: data.recipient_id,
                  content: data.content,
                  created_at: new Date(data.created_at),
                  chat_session_id: data.chat_session_id,
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error("Failed to send message. Please try again.");
      // Remove optimistic update on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    }
  };

  // Handle worker selection
  const handleWorkerSelect = async (worker: IUser) => {
    setSelectedWorker(worker);
    setShowChat(true);
    const msgs = await fetchMessages(worker.id);
    setMessages(msgs);
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-3 sm:gap-0">
            {/* Mobile: Icon on top, all centered; Desktop: icon right, content left */}
            <div className="flex flex-col w-full sm:w-auto items-center sm:items-start text-center sm:text-left">
              <div className="flex justify-center sm:hidden mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Mentor Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Guide remote workers on their career path
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-end mt-2 sm:mt-0">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex bg-gray-50">
        {/* Worker list/sidebar: full width on mobile when chat is not open */}
        <div
          className={
            `transition-all duration-500 ease-in-out ` +
            (showChat && selectedWorker
              ? "hidden lg:block lg:w-80"
              : "fixed inset-0 z-30 bg-white w-full h-full lg:static lg:w-80 flex-shrink-0")
          }
        >
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src={currentMentor.avatar_url || "/dave.jpg"}
                alt={currentMentor.first_name + " " + currentMentor.last_name}
                width={40}
                height={40}
                className="rounded-full sm:w-[50px] sm:h-[50px] ml-10 lg:ml-0"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">
                  {currentMentor.first_name + " " + currentMentor.last_name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {currentMentor.occupation}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full h-full">
            <TabsList className="w-full grid grid-cols-2 p-2 sm:p-4">
              <TabsTrigger value="active" className="text-xs sm:text-sm">
                Active
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All Workers
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-280px)] lg:h-[calc(100vh-180px)]">
              <TabsContent value="active" className="m-0">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading workers...
                  </div>
                ) : (
                  workers
                    .filter((worker) => worker.status === "online")
                    .map((worker) => (
                      <div
                        key={worker.id}
                        className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedWorker?.id === worker.id
                            ? "bg-blue-50 border-blue-200"
                            : ""
                        }`}
                        onClick={() => handleWorkerSelect(worker)}
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="relative">
                            <Image
                              src={worker.avatar_url || "/default-avatar.png"}
                              alt={worker.first_name + " " + worker.last_name}
                              width={40}
                              height={40}
                              className="rounded-full sm:w-[50px] sm:h-[50px] object-cover"
                            />
                            <div
                              className={`absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white ${
                                worker.status === "online"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                                {worker.first_name + " " + worker.last_name}
                              </h3>
                              <Badge
                                variant={
                                  worker.status === "online"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {worker.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {worker.lastMessage || "No messages yet"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </TabsContent>

              <TabsContent value="all" className="m-0">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading workers...
                  </div>
                ) : (
                  workers.map((worker) => (
                    <div
                      key={worker.id}
                      className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedWorker?.id === worker.id
                          ? "bg-blue-50 border-blue-200"
                          : ""
                      }`}
                      onClick={() => handleWorkerSelect(worker)}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="relative">
                          <Image
                            src={worker.avatar_url || "/default-avatar.png"}
                            alt={worker.first_name + " " + worker.last_name}
                            width={40}
                            height={40}
                            className="rounded-full sm:w-[50px] sm:h-[50px] object-cover"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white ${
                              worker.status === "online"
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                              {worker.first_name + " " + worker.last_name}
                            </h3>
                            <Badge
                              variant={
                                worker.status === "online"
                                  ? "default"
                                  : "secondary"
                              }
                              className="text-xs"
                            >
                              {worker.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {worker.lastMessage || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Chat overlay: full width on mobile when chat is open */}
        <div
          className={
            `transition-all duration-500 ease-in-out ` +
            (showChat && selectedWorker
              ? "fixed inset-0 z-40 bg-white w-full h-full lg:static lg:w-auto flex-1 flex flex-col"
              : "hidden lg:flex flex-1 flex-col")
          }
        >
          {selectedWorker ? (
            <div className="flex flex-col h-full">
              {/* Chat header with back button on mobile */}
              <div className="lg:hidden flex items-center p-4 border-b border-gray-200 bg-white">
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 rounded-full hover:bg-gray-100 flex-shrink-0"
                  aria-label="Back to worker list"
                  style={{ minWidth: 40 }}
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="flex items-center flex-1 min-w-0 ml-2 overflow-hidden">
                  {/* Back arrow on mobile in chat header */}
                  <button
                    type="button"
                    className="lg:hidden mr-2 p-2 rounded-full hover:bg-gray-100"
                    style={{ minWidth: 40 }}
                    aria-label="Back to list"
                    onClick={() => setShowChat(false)}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <Image
                    src={selectedWorker.avatar_url || "/default-avatar.png"}
                    alt={
                      selectedWorker.first_name + " " + selectedWorker.last_name
                    }
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0 ml-2 lg:ml-0"
                  />
                  <span className="font-semibold text-gray-900 truncate">
                    {selectedWorker.first_name} {selectedWorker.last_name}
                  </span>
                </div>
              </div>
              {/* Chat interface (hide header on desktop, show on mobile) */}
              <div className="flex-1 flex flex-col min-h-0">
                <ChatInterface
                  currentUser={currentMentor}
                  recipient={selectedWorker}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
              <div className="text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a worker to start mentoring
                </h3>
                <p className="text-gray-500">
                  Choose from the list of workers to begin your mentoring
                  session
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
