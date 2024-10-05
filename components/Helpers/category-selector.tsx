"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Sample tags (your provided list)
const initialTags = [
  { _id: 'fvpORe-t', name: 'Famous Quotes', slug: 'famous-quotes', quoteCount: 1090 },
  { _id: '6J1qxxuj3', name: 'Wisdom', slug: 'wisdom', quoteCount: 550 },
  { _id: 'krXU-q4FE', name: 'Friendship', slug: 'friendship', quoteCount: 189 },
  { _id: 'JCMoLDds9', name: 'Inspirational', slug: 'inspirational', quoteCount: 89 },
  { _id: 'wm1HFcO8vf', name: 'Success', slug: 'success', quoteCount: 82 },
  { _id: 'Gq75KBrfb', name: 'Technology', slug: 'technology', quoteCount: 50 },
  { _id: 'EKV8W1TN-wb', name: 'Sports', slug: 'sports', quoteCount: 43 },
  { _id: 'poT-7QEBm', name: 'Life', slug: 'life', quoteCount: 42 },
  { _id: 'JaQwywHSk59', name: 'Competition', slug: 'competition', quoteCount: 38 },
  { _id: 'QmvdN2qkQCC', name: 'Change', slug: 'change', quoteCount: 34 },
  { _id: 'CaE-vzeOZb', name: 'Motivational', slug: 'motivational', quoteCount: 32 },
  { _id: 'M83oc3scg', name: 'Business', slug: 'business', quoteCount: 31 },
  { _id: 'OMnUd1CUg', name: 'Future', slug: 'future', quoteCount: 21 },
  { _id: 'rnrd8q9X1', name: 'Love', slug: 'love', quoteCount: 20 },
  { _id: 'k97A51Uf5', name: 'Happiness', slug: 'happiness', quoteCount: 18 },
  { _id: 'KBWnDu4rH', name: 'History', slug: 'history', quoteCount: 18 },
  { _id: 'vWfmIQt6k8c', name: 'Character', slug: 'character', quoteCount: 17 },
  { _id: 'HJp_e1usX', name: 'Humorous', slug: 'humorous', quoteCount: 17 },
  { _id: 'mh6HEhK_T_a', name: 'Philosophy', slug: 'philosophy', quoteCount: 16 },
  { _id: '96NNdxeI_', name: 'Politics', slug: 'politics', quoteCount: 15 },
  { _id: 'qO4zwIUdFW', name: 'Science', slug: 'science', quoteCount: 14 },
  { _id: 'HJ05xaA6gN', name: 'Film', slug: 'film', quoteCount: 13 },
];

interface CategorySelectorProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelector = ({ selectedTags, setSelectedTags }: CategorySelectorProps) => {
  const [tags] = useState(initialTags);
  const [filteredTags, setFilteredTags] = useState(tags);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectionLimitReached, setSelectionLimitReached] = useState(false);

  useEffect(() => {
    // Filter tags based on search term
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchTerm, tags]);

  const handleTagSelection = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tagName]);
        setSelectionLimitReached(false);
      } else {
        setSelectionLimitReached(true);
      }
    } else {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tagName));
      setSelectionLimitReached(false);
    }
  };

  const handleRemoveTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tagName));
    setSelectionLimitReached(false);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button role="combobox" aria-expanded="false">
            Quote Category...
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <input
              type="text"
              placeholder="Search category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CommandGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredTags.map((tag) => (
                <div key={tag._id}>
                  <div
                    onClick={() => handleTagSelection(tag.name)}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem",
                      backgroundColor: selectedTags.includes(tag.name) ? "#007bff" : "#ffffff",
                      color: selectedTags.includes(tag.name) ? "#ffffff" : "#000000",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tag.name} ({tag.quoteCount} quotes)
                  </div>
                </div>
              ))}
            </CommandGroup>
            {selectionLimitReached && (
              <div style={{ marginTop: "0.5rem", color: "#ff0000" }}>
                Max tags selection limit reached (3 tags maximum).
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
      <div style={{ marginTop: "0.5rem" }}>
        Selected Categories:{" "}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.25rem 0.5rem",
              backgroundColor: "#007bff",
              color: "#ffffff",
              borderRadius: "0.5rem",
              marginRight: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {tag}
            <button
              style={{
                marginLeft: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#ffffff",
              }}
              onClick={() => handleRemoveTag(tag)}
            >
              X
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;