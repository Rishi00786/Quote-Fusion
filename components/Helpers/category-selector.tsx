"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getQuoteTags } from "@/lib/API/quote-tags-fetch";

interface CategorySelectorProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelector = ({ selectedTags, setSelectedTags }: CategorySelectorProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectionLimitReached, setSelectionLimitReached] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getQuoteTags();
      setTags(fetchedTags);
      setFilteredTags(fetchedTags); // Initially set filtered tags to all tags
    };
    fetchTags();
  }, []);

  useEffect(() => {
    // Filter tags based on search term
    const filtered = tags.filter(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchTerm, tags]);

  const handleTagSelection = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
        setSelectionLimitReached(false);
      } else {
        setSelectionLimitReached(true);
      }
    } else {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
      setSelectionLimitReached(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
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
            {/* <CommandEmpty>No categories found.</CommandEmpty> */}
            <CommandGroup style={{ maxHeight: "200px", overflowY: "auto" }}>
              {filteredTags.map((tag) => (
                <div key={tag}>
                  <div
                    onClick={() => handleTagSelection(tag)}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem",
                      backgroundColor: selectedTags.includes(tag) ? "#007bff" : "#ffffff",
                      color: selectedTags.includes(tag) ? "#ffffff" : "#000000",
                      borderRadius: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {tag}
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