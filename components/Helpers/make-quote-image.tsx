import React, { useRef, useState } from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { Download, Share, Heart } from 'lucide-react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

interface QuoteImageProps {
  quote: string;
  bgImage: string;
  imageName: string;
}

const QuoteImage: React.FC<QuoteImageProps> = ({ quote, bgImage, imageName }) => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const generateImage = async () => {
    if (quoteRef.current) {
      const dataUrl = await toPng(quoteRef.current);
      try {
        await axios.post('/api/saveGeneration', {
          userId,
          imageName,
          image: dataUrl,
        });
        alert('Image saved successfully!');
      } catch (error) {
        console.error('Error saving image:', error);
        alert('Failed to save image.');
      }
    }
  };

  const downloadImage = async () => {
    if (quoteRef.current) {
      const dataUrl = await toPng(quoteRef.current);
      saveAs(dataUrl, `${imageName}.png`);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prevLikes => (isLiked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div className="relative m-2 border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div
        ref={quoteRef}
        className="relative w-64 h-96 bg-cover flex justify-center items-center text-center text-white font-bold p-4"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay with semi-transparent background */}
        <div className="absolute inset-0 bg-black opacity-40" aria-hidden="true" />
        <div className="relative z-10 text-blue-300">{quote}</div>
      </div>

      <div className="absolute top-2 left-2">
        <UserButton />
      </div>
      <div className="flex justify-between items-center bg-gray-900 bg-opacity-75 text-white p-2">
        <button onClick={generateImage} className="flex items-center space-x-1">
          Save
        </button>
        <button onClick={downloadImage} className="flex items-center space-x-1">
          <Download className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-1">
          <Share className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-1">
          <button onClick={toggleLike} className="flex items-center space-x-1">
            <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500' : ''}`} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuoteImage; 