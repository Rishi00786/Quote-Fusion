import React from "react";
import { Slider } from "@/components/ui/slider";

interface QuoteSliderProps {
  quoteCount: number;
  setQuoteCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuoteSlider = ({ quoteCount, setQuoteCount }: QuoteSliderProps) => {
  const handleSliderChange = (value: number) => {
    setQuoteCount(value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Number of Quotes: {quoteCount}
      </label>
      <Slider
        value={[quoteCount]}
        onValueChange={(values: number[]) => handleSliderChange(values[0])}
        min={1}
        max={5}
        step={1}
      />
    </div>
  );
};

export default QuoteSlider;