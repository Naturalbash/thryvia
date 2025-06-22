"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ToolItem {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  thumbnail: string;
}

const fetchMindfulnessTools = async (): Promise<ToolItem[]> => {
  // Replace with a real API call if available
  return [
    {
      id: 1,
      title: "Meditation & Exercise",
      duration: "5 Minutes",
      videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
      thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/0.jpg",
    },
    {
      id: 2,
      title: "Calm",
      duration: "10 Minutes",
      videoUrl: "https://www.youtube.com/watch?v=ZToicYcHIOU",
      thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/0.jpg",
    },
    {
      id: 3,
      title: "Mindful Breathing",
      duration: "15 Minutes",
      videoUrl: "https://www.youtube.com/watch?v=1owksQTH6RQ",
      thumbnail: "https://img.youtube.com/vi/1owksQTH6RQ/0.jpg",
    },

    {
      id: 4,
      title: " Goodful",
      duration: "5 Minutes",
      videoUrl: "https://www.youtube.com/watch?v=ssss7V1_eyA",
      thumbnail: "https://img.youtube.com/vi/ssss7V1_eyA/0.jpg",
    },
    {
      id: 5,
      title: "Inner Piece and Calm",
      duration: "20 Minutes",
      videoUrl: "https://www.youtube.com/watch?v=-2zdUXve6fQ",
      thumbnail: "https://img.youtube.com/vi/-2zdUXve6fQ/0.jpg",
    },
  ];
};

const MindfulnessTools: React.FC = () => {
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  useEffect(() => {
    fetchMindfulnessTools().then(setTools);
  }, []);

  const visibleTools = showAll ? tools : tools.slice(0, 1);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Meditation & Exercise</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visibleTools.map((tool) => (
          <div
            key={tool.id}
            className="relative bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl flex items-center justify-between"
          >
            <div>
              <h3 className="text-md font-semibold mb-1">{tool.title}</h3>
              <p className="text-sm text-gray-700 mb-3">{tool.duration}</p>
              <button
                onClick={() => setSelectedTool(tool)}
                className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
              >
                ▶️
              </button>
            </div>
            <div className="w-32 h-20 relative">
              <Image
                src={tool.thumbnail}
                alt={tool.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {selectedTool && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">
            Now Playing: {selectedTool.title}
          </h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-64 rounded-xl"
              src={selectedTool.videoUrl}
              title={selectedTool.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindfulnessTools;
