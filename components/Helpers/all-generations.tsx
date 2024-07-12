"use client";

import React, { useEffect, useState } from 'react';
import { Download, Share, Heart } from 'lucide-react';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress'; // Adjust the import path as needed

interface Generation {
  id: string;
  imageUrl: string;
  profile: {
    imageUrl: string;
    name: string;
  };
}

const PopularGenerations: React.FC = () => {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        setProgress(50); // Update progress to 50% while fetching
        const response = await fetch('/api/allGenerations');
        if (!response.ok) {
          throw new Error('Failed to fetch generations');
        }
        const fetchedGenerations = await response.json();
        setGenerations(fetchedGenerations);
        setProgress(100); // Update progress to 100% after successful fetch
      } catch (error) {
        console.error('Error fetching generations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenerations();
  }, []);

  const downloadImage = (imageUrl: string) => {
    saveAs(imageUrl, 'generation_image.png');
  };

  const toggleLike = (generationId: string) => {
    // Your toggle like logic here
  };

  if (loading) {
    return (
      <div className="flex flex-col m-4 h-screen">
        <Progress value={progress} className="w-[100px] mb-4" />
      </div>
    );
  }

  return (
    <div className='m-10'>
      <h2 className="text-4xl font-bold mb-12">Popular Generations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {generations.map((generation) => (
          <div key={generation.id} className="relative">
            <Image
              src={generation.imageUrl}
              alt="Generated Image"
              width={270}
              height={300}
              className="object-cover"
            />
            <div className="absolute top-2 left-2 text-white">
              <div className="relative group">
                <Image
                  src={generation.profile.imageUrl}
                  alt="Profile Image"
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full"
                />
                <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {generation.profile.name}
                </span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 flex space-x-2">
              <button onClick={() => downloadImage(generation.imageUrl)}>
                <Download className="h-5 w-5" />
              </button>
              <button>
                <Share className="h-5 w-5" />
              </button>
              <button onClick={() => toggleLike(generation.id)}>
                <Heart
                  className={`h-5 w-5 text-red-500`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularGenerations;
