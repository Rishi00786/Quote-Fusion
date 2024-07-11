import { useStateContext } from "@/context";
import { pexelsApiKey } from '@/PEXELS-KEY';

const key = pexelsApiKey;

export const useImageFetch = () => {
  const { searchQuery, setBgimage, bgimage } = useStateContext();

  const handleImageFetch = async () => {
    const api_URL = "https://api.pexels.com/v1/search";
    const query = searchQuery;

    const new_URL = `${api_URL}?query=${query}&per_page=1`;

    try {
      if (!key) {
        console.log(key);
        throw new Error("Pexels API key not found in environment variables");
      }

      const response = await fetch(new_URL, {
        headers: {
          Authorization: `${key}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      console.log(data); // Log the fetched data to see the structure

      setBgimage((prevBgimages) => [...prevBgimages, data.photos[0].src.portrait]);
      console.log(bgimage)
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };

  return { handleImageFetch };
};