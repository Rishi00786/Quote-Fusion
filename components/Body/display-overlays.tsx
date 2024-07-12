"use client";

import React, { useEffect, useState } from 'react';
import { useStateContext } from '@/context';
import QuoteImage from '@/components/Helpers/make-quote-image';
import { Progress } from '@/components/ui/progress'; // Adjust the import path as needed

interface Generation {
  id: string;
  content: string;
  imageUrl: string;
  profile: {
    imageUrl: string;
    name: string;
  };
}

const DisplayOverlay: React.FC = () => {
  const { quotes, bgimage } = useStateContext();
  const [apiGenerations, setApiGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchGenerations = async () => {
      try {
        setProgress(50); // Update progress to 50% while fetching
        const response = await fetch('/api/generations');
        if (!response.ok) {
          throw new Error('Failed to fetch generations');
        }
        const data = await response.json();
        setApiGenerations(data);
        setProgress(100); // Update progress to 100% after successful fetch
      } catch (error) {
        console.error('Error fetching generations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenerations();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col m-4 h-screen">
        <Progress value={progress} className="w-[100px] mb-4" />
      </div>
    );
  }

  if (apiGenerations.length === 0 && (quotes.length === 0 || bgimage.length === 0)) {
    return <div>No generations found</div>;
  }

  return (
    <div className="flex flex-wrap">
      {/* Display API Generations */}
      {apiGenerations.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">API Generations</h2>
          <div className="flex flex-wrap gap-4">
            {apiGenerations.map((generation) => (
              <QuoteImage
                key={generation.id}
                quote={generation.content}
                bgImage={generation.imageUrl}
                imageName={`api-quote-${generation.id}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Display User-Generated Quotes */}
      {quotes.length > 0 && bgimage.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Generated Quotes</h2>
          <div className="flex flex-wrap gap-4">
            {quotes.map((quote, index) => (
              <QuoteImage
                key={`user-${index}`}
                quote={quote.content}
                bgImage={bgimage[index] || 'https://via.placeholder.com/400'}
                imageName={`user-quote-${index}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOverlay;
