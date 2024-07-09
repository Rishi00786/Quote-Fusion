export const getQuoteTags = async () => {
  try {
    const response = await fetch('https://api.quotable.io/tags');
    const data = await response.json();

    // Filter tags with quoteCount > 10
    const filteredTags = data.filter((tag: { quoteCount: number }) => tag.quoteCount > 10);

    // Sort filtered tags by quoteCount in descending order
    filteredTags.sort((a: { quoteCount: number }, b: { quoteCount: number }) => b.quoteCount - a.quoteCount);

    // Extract and return only the names of the tags
    return filteredTags.map((tag: { name: string }) => tag.name);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return []; // Return empty array on error
  }
};