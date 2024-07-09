// BackgroundImageSelector.tsx

import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react'; // Example icon import, adjust as per your UI library
import { Input } from '@/components/ui/input'; // Example input component import, adjust as per your UI library

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value); // Pass the query back to the parent component
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for background image type..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-64"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageSelector;