"use client"

import React, { useRef, useEffect, useState, createRef } from 'react';
import { useStateContext } from '@/context';

const ImageWithTextOverlay: React.FC = () => {
  const { quotes, bgimage } = useStateContext();
  const [canvasRefs, setCanvasRefs] = useState<React.RefObject<HTMLCanvasElement>[]>([]);

  useEffect(() => {
    // Create an array of refs based on the number of quotes
    setCanvasRefs((refs) =>
      Array(quotes.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef<HTMLCanvasElement>())
    );
  }, [quotes.length]);

  useEffect(() => {
    if (quotes.length > 0) {
      quotes.forEach((quote, index) => {
        const canvasRef = canvasRefs[index];
        if (canvasRef && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const image = new Image();
          image.src = bgimage[index] || "https://cdn.pixabay.com/photo/2015/05/31/13/42/old-791836_640.jpg"; // Use the fetched background image or a default one
  
          image.onload = () => {
            if (ctx) {
              // Set canvas dimensions
              const canvasWidth = 400; // Set your desired width
              const canvasHeight = 400; // Set your desired height
  
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
  
              // Scale the image to fit the canvas
              const scale = Math.min(canvasWidth / image.width, canvasHeight / image.height);
              const x = (canvasWidth / 2) - (image.width / 2) * scale;
              const y = (canvasHeight / 2) - (image.height / 2) * scale;
  
              ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
  
              // Set text properties
              ctx.font = '24px Arial';
              ctx.fillStyle = 'white';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
  
              // Draw the text on the canvas
              const text = quote.content;
              wrapText(ctx, text, canvasWidth / 2, canvasHeight - 50, canvasWidth - 20, 30);
            }
          };
        } else {
          // Handle case when canvasRef is null or current is undefined
          console.error(`Canvas ref at index ${index} is null or undefined.`);
        }
      });
    }
  }, [quotes, canvasRefs, bgimage]);
  
  

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  };

  return (
    <div className="image-with-text-overlay">
      {quotes.map((quote, index) => (
        <canvas key={index} ref={canvasRefs[index]}></canvas>
      ))}
    </div>
  );
};

export default ImageWithTextOverlay;