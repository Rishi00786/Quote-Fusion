// BackgroundImageSelector.tsx

import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react'; // Example icon import, adjust as per your UI library
import { Input } from '@/components/ui/input'; // Example input component import, adjust as per your UI library
import { useStateContext } from '@/context';

interface BackgroundImageSelectorProps {
  selectedBgImage: string;
  setSelectedBgImage: (image: string) => void;
  onSearchChange: (query: string) => void;
}

const BackgroundImageSelector: React.FC<BackgroundImageSelectorProps> = ({
  selectedBgImage,
  setSelectedBgImage,
  onSearchChange,
}) => {
  const {searchQuery , setSearchQuery } = useStateContext()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value); // Pass the query back to the parent component
  };

  return (
    <div className="flex flex-col sm:flex-row items-center mt-4">
      <div className="relative flex-grow sm:max-w-sm">
        <div className="relative">
          <Input
            type="text"
            placeholder="Type Query for background image..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500 hidden sm:block">
          Try: Ocean, Tigers, Pears, etc.
        </div>
      </div>
      <div className="ml-0 sm:ml-4">
        <span className="text-sm text-gray-500 hidden sm:inline-block">Query:</span> {searchQuery}
      </div>
    </div>
  );
};

export default BackgroundImageSelector;