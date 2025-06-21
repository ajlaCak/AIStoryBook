import React from 'react';
import { Card } from "@heroui/card";
import { Link } from '@heroui/react';

type StoryItemType = {
  story: {
    id: number;
    storyType: string;
    ageGroup: string;
    imageBase64: string;
    imageStyle: string;
    userEmail: string;
    userImage: string;
    userName: string;
    output: [] | any;
    storyId: string;
    storySubject: string;
  };
};

function StoryItem({ story }: StoryItemType) {
  return (
    <Link href={`/view-story/${story?.storyId}`} className="block group cursor-pointer w-full">
      <Card className="rounded-2xl overflow-hidden shadow-xl transition-transform transform hover:scale-105 h-[400px]">
        <div className="relative w-full h-3/5">
          <img
            src={story?.imageBase64 ?? "/crtic.png"}
            alt="Card background"
            className="object-cover w-full h-full transition-all duration-300 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>
        <div className="flex flex-col justify-between h-2/5 p-4">
          <p className="text-black font-semibold text-xl group-hover:text-yellow-400 transition-colors duration-300">
            {story?.output?.title}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export default StoryItem;
