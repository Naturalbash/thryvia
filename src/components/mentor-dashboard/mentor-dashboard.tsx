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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Mentor Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Guide remote workers on their career path
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-slate-500 to-slate-800 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
        {/* Left Sidebar - Worker List */}
        <div className="w-full lg:w-80 bg-white border-b lg:border-r border-gray-200 flex-shrink-0">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src={currentMentor.avatar_url || "/dave.jpg"}
                alt={currentMentor.first_name + " " + currentMentor.last_name}
                width={40}
                height={40}
                className="rounded-full sm:w-[50px] sm:h-[50px]"
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
              <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
              <TabsTrigger value="all" className="text-xs sm:text-sm">All Workers</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-280px)] lg:h-[calc(100vh-180px)]">
              <TabsContent value="active" className="m-0">
                {workers
                  .filter((worker) => worker.status === "online")
                  .map((worker) => (
                    <div
                      key={worker.id}
                      className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedWorker?.id === worker.id ? "bg-blue-50" : ""
                      }`}
                      onClick={async () => {
                        setSelectedWorker(worker);
                        const msgs = await fetchMessages(worker.id);
                        setMessages(msgs);
                      }}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="relative">
                          <Image
                            src={worker.avatar_url || "/default-avatar.png"}
                            alt={worker.first_name + " " + worker.last_name}
                            width={40}
                            height={40}
                            className="rounded-full sm:w-[50px] sm:h-[50px]"
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
                            <h3 className="text-xs sm:text-sm font-medium">
                              {worker.first_name + " " + worker.last_name}
                            </h3>
                            <Badge
                              variant={
                                worker.status === "online" ? "default" : "secondary"
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
                  ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {selectedWorker ? (
            <ChatInterface
              currentUser={currentMentor}
              selectedUser={selectedWorker}
              messages={messages}
              setMessages={setMessages}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a worker to start mentoring
                </h3>
                <p className="text-gray-500">
                  Choose from the list of active workers to begin your mentoring session
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
