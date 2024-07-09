// QuoteModal.tsx

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CategorySelector from '@/components/Helpers/category-selector';
import QuoteSlider from '@/components/Helpers/quote-slider';
import { handleGenerateQuotes } from '@/lib/API/generate-quote'; // Adjust import path as per your project structure
import BackgroundImageSelector from '../Helpers/bg-image-selector'; // Import BackgroundImageSelector component

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

  const { setQuotes } = useStateContext();

  const handleGenerateClick = async () => {
    setLoading(true); // Set loading state while fetching quotes
    try {
      const data = await handleGenerateQuotes({
        quoteCount,
        selectedTags,
        setQuotes: setQuotes,
      });
      // Optionally update state or handle generated quotes
    } catch (error) {
      console.error('Error generating quotes:', error);
      // Optionally handle error, e.g., display error message to the user
    } finally {
      setLoading(false); // Reset loading state after fetching quotes
    }
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
