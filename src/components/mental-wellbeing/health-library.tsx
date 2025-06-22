"use client";
import React, { useEffect, useState } from "react";

interface LibraryResource {
  id: number;
  type: "Article" | "Video" | "Podcast";
  title: string;
  description: string;
  url: string;
}

const MentalHealthLibrary: React.FC = () => {
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchedResources: LibraryResource[] = [
      {
        id: 1,
        type: "Article",
        title: "How to Combat Remote Work Burnout",
        description:
          "This article explores ways to identify and manage burnout while working remotely.",
        url: "https://hbr.org/2021/02/how-to-combat-remote-work-burnout",
      },
      {
        id: 2,
        type: "Podcast",
        title: "The Science of Happiness: Fighting Burnout",
        description:
          "A helpful podcast for remote workers struggling with stress and isolation.",
        url: "https://greatergood.berkeley.edu/podcasts/item/the_science_of_happiness",
      },
      {
        id: 3,
        type: "Video",
        title: "Stress Relief Meditation for Remote Workers",
        description:
          "A guided meditation video designed for professionals working from home.",
        url: "https://www.youtube.com/watch?v=1vx8iUvfyCY",
      },
      {
        id: 4,
        type: "Article",
        title: "Building Connection When Working Remotely",
        description:
          "Practical advice on overcoming feelings of isolation and staying connected.",
        url: "https://www.mindful.org/how-to-stay-connected-when-working-remotely/",
      },
      {
        id: 5,
        type: "Podcast",
        title: "Calm Collective – Remote Life Balance",
        description:
          "This episode discusses finding calm and balance in a remote work lifestyle.",
        url: "https://www.thecalmcollective.com/podcast",
      },
      {
        id: 6,
        type: "Article",
        title: "Remote Work Burnout: 7 Ways to Prevent It",
        description:
          "From the New York Times, how to recognize and mitigate burnout at home.",
        url: "https://www.nytimes.com/guides/well/prevent-burnout",
      },
      {
        id: 7,
        type: "Article",
        title: "Mental Health Toolkit for Remote Workers",
        description:
          "Big Orange Heart’s comprehensive toolkit for mental health support.",
        url: "https://www.bigorangeheart.org/2023/04/mental-health-toolkit/",
      },
      {
        id: 8,
        type: "Podcast",
        title: "WorkLife with Adam Grant: Burnout is Everyone’s Problem",
        description:
          "NPR’s TED Podcast dives into the root causes of burnout and workplace mental health.",
        url: "https://www.npr.org/podcasts/510325/worklife",
      },
    ];

    setResources(fetchedResources);
  }, []);

  const visibleResources = showAll ? resources : resources.slice(0, 3);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Mental Health Library</h2>
      <p className="text-gray-600 mb-6">
        Explore tools to help ease burnout, stress, and isolation for remote
        workers.
      </p>
      <ul className="space-y-4">
        {visibleResources.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-sm font-medium text-[#8B5CF6]">
              {item.type}
            </span>
            <h3 className="text-lg text-gray-800 font-semibold mt-1">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1 mb-2">
              {item.description}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B5CF6] hover:underline text-sm"
            >
              Open Resource ↗
            </a>
          </li>
        ))}
      </ul>

      {resources.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-[#8B5CF6] cursor-pointer text-white rounded hover:bg-blue-700 transition"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MentalHealthLibrary;
