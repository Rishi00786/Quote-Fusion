"use client";

import React, { useEffect } from 'react';
import { useStateContext } from '@/context'; // Adjust the path as needed
import { Textarea } from '@/components/ui/textarea'; // Adjust the path as needed

const DisplayQuotes = () => {
  const { quotes } = useStateContext(); // Access the quotes state using the custom hook

  useEffect(() => {
    console.log(quotes);
  }, [quotes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Generated Quotes</h1>
      {quotes.map((quote: any, index: number) => (
        <div key={index} className="mb-4">
          <Textarea 
            value={quote.content} 
            readOnly 
            className="w-full p-2 border rounded-md"
          />
          <p className="text-right text-gray-500 mt-1">- {quote.author}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayQuotes;
