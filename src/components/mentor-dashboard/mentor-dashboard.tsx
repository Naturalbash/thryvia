"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";
import { User } from "lucide-react";
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
  const [workers, setWorkers] = useState<
    (IUser & { lastMessage: string; unreadCount: number })[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const supabase = createClient();

  console.log({ currentMentor, selectedWorker, messages });

  // Memoize fetchMessages to prevent re-creation

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
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
            created_at: worker.created_at,
            email: worker.email,
            role: worker.role,
            occupation: worker.occupation,
            first_name: worker.first_name,
            last_name: worker.last_name,
            avatar_url: worker.avatar_url,
            status: worker.status,
            last_seen: new Date(worker.last_seen),
            lastMessage: "",
            unreadCount: 0,
          })) || [];

        setWorkers(formattedWorkers);
      } catch (error) {
        console.error("Error fetching workers:", error);
        toast.error("Failed to fetch workers. Please try again.");
      }
    };

    fetchWorkers();
  }, [currentMentor.id, supabase]);

  const fetchMessages = useCallback(
    async (workerId: string) => {
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
    },
    [currentMentor.id, supabase]
  );

  return (
    <div>
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mentor Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Guide remote workers on their career path
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex bg-gray-50">
        {/* Left Sidebar - Worker List */}
        <div className="w-80 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src={currentMentor.avatar_url || "/dave.jpg"}
                alt={currentMentor.first_name + " " + currentMentor.last_name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {currentMentor.first_name + " " + currentMentor.last_name}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentMentor.occupation}
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full h-full">
            <TabsList className="w-full grid grid-cols-2 p-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="all">All Workers</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-180px)]">
              <TabsContent value="active" className="m-0">
                {workers
                  .filter((worker) => worker.status === "online")
                  .map((worker) => (
                    <div
                      key={worker.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedWorker?.id === worker.id ? "bg-blue-50" : ""
                      }`}
                      onClick={async () => {
                        setSelectedWorker(worker);
                        const msgs = await fetchMessages(worker.id);
                        setMessages(msgs);
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Image
                            src={worker.avatar_url || "/default-avatar.png"}
                            alt={worker.first_name + " " + worker.last_name}
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                              worker.status === "online"
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">
                              {worker.first_name + " " + worker.last_name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {worker.last_seen
                                ? format(worker.last_seen, "h:mm a")
                                : ""}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {worker.lastMessage || "No messages yet"}
                          </p>
                          {worker.unreadCount && worker.unreadCount > 0 && (
                            <Badge variant="destructive" className="mt-1">
                              {worker.unreadCount} new
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="all" className="m-0">
                {workers.map((worker) => (
                  <div
                    key={worker.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedWorker?.id === worker.id ? "bg-blue-50" : ""
                    }`}
                    onClick={async () => {
                      setSelectedWorker(worker);
                      const msgs = await fetchMessages(worker.id);
                      setMessages(msgs);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <Image
                        src={worker.avatar_url || "/default-avatar.png"}
                        alt={worker.first_name + " " + worker.last_name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {worker.first_name + " " + worker.last_name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {worker.last_seen
                              ? format(worker.last_seen, "MMM d")
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {worker.lastMessage || "No messages yet"}
                        </p>
                        {worker.unreadCount && worker.unreadCount > 0 && (
                          <Badge variant="destructive" className="mt-1">
                            {worker.unreadCount} new
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {selectedWorker ? (
            <ChatInterface
              currentUser={currentMentor}
              recipient={selectedWorker}
              messages={messages}
              onSendMessage={async (content: string) => {
                const msg = {
                  id: Math.floor(Math.random() * 1000000), // Temporary ID, replace with actual ID generation
                  sender_id: currentMentor.id,
                  recipient_id: selectedWorker.id,
                  content,
                  chat_session_id: `${selectedWorker.id}-${currentMentor.id}`,
                  created_at: new Date(),
                };
                setMessages((prev) => [...prev, msg]);
                const { error } = await supabase.from("messages").insert(msg);
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
                  Select a worker to start chatting
                </h3>
                <p className="text-gray-500">
                  Choose a worker from the sidebar to view their messages
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Worker Details */}
        {selectedWorker && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-center">
                  Remote Worker Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <Image
                    src={selectedWorker.avatar_url || "/default-avatar.png"}
                    alt={
                      selectedWorker.first_name + " " + selectedWorker.last_name
                    }
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold">
                    {selectedWorker.first_name + " " + selectedWorker.last_name}
                  </h3>
                  <Badge
                    variant={
                      selectedWorker.status === "online"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {selectedWorker.status ?? "Unknown"}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Last Active
                    </h4>
                    <p className="text-sm">
                      {selectedWorker.last_seen
                        ? format(selectedWorker.last_seen, "PPP 'at' h:mm a")
                        : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Session Status
                    </h4>
                    <p className="text-sm">Active Conversation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
