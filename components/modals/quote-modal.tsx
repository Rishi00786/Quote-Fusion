import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CategorySelector from '@/components/Helpers/category-selector';
import QuoteSlider from '@/components/Helpers/quote-slider';
import { handleGenerateQuotes } from '@/lib/API/generate-quote'; // Adjust import path as per your project structure
import BackgroundImageSelector from '../Helpers/bg-image-selector'; // Import BackgroundImageSelector component
import { useImageFetch } from '@/lib/API/bg-image-fetch'; // Import useImageFetch hook

import { useStateContext } from '@/context';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [quoteCount, setQuoteCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading state
  const [selectedBgImage, setSelectedBgImage] = useState<string>(''); // State for selected background image type

  const { quotes, setQuotes, bgimage, setBgimage } = useStateContext();
  const { handleImageFetch } = useImageFetch(); // Use the custom hook to fetch images

  const handleGenerateClick = async () => {
    setLoading(true); // Set loading state while fetching quotes and images
    try {
      const data = await handleGenerateQuotes({
        quoteCount,
        selectedTags,
        setQuotes: setQuotes,
        currentQuotes: quotes,
      });

      const imageData = await handleImageFetch({quoteCount}); // Fetch images concurrently with quotes

      console.log('Fetched Images:', imageData);
      console.log('Generated Quotes:', data);

      // Optionally update state or handle generated quotes and images
    } catch (error) {
      console.error('Error generating quotes or images', error);
      // Optionally handle error, e.g., display error message to the user
    } finally {
      setLoading(false); // Reset loading state after fetching quotes and images
    }
  };

  const handleBackgroundImageSearch = (query: string) => {
    setSelectedBgImage(query); // Update state with selected background image type
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate a Quote</DialogTitle>
        </DialogHeader>
        <CategorySelector
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <BackgroundImageSelector
          selectedBgImage={selectedBgImage}
          setSelectedBgImage={setSelectedBgImage}
          onSearchChange={handleBackgroundImageSearch}
        />
        <QuoteSlider
          quoteCount={quoteCount}
          setQuoteCount={setQuoteCount}
        />
        <DialogFooter>
          <Button onClick={handleGenerateClick} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;