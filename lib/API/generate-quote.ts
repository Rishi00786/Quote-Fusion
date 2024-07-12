interface HandleGenerateQuotesProps {
  quoteCount: number;
  selectedTags: string[];
  setQuotes: React.Dispatch<React.SetStateAction<any[]>>;
  currentQuotes: any[];
}

export const handleGenerateQuotes = async ({
  quoteCount,
  selectedTags,
  setQuotes,
  currentQuotes
}: HandleGenerateQuotesProps) => {
  const api_URL = "https://api.quotable.io/quotes/random";
  const limit = quoteCount;
  const tags = selectedTags.join(",");
  const new_URL = `${api_URL}?tags=${tags}&limit=${limit}`;

  try {
    const response = await fetch(new_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    const data = await response.json();
    console.log("generate quotes data",data); // Log the fetched data to see the structure

    setQuotes([...currentQuotes, ...data]); // Append new quotes to the existing quotes

    return data; // Return the fetched data for further processing
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error; // Re-throw the error to handle it further up the call stack
  }
};