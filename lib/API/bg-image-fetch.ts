import { useStateContext } from "@/context";

export const useImageFetch = () => {
  const { searchQuery, setBgimage, bgimage } = useStateContext();

  const handleImageFetch = async ({quoteCount}:{quoteCount: number}) => {
    const api_URL = "https://api.pexels.com/v1/search";
    const query = searchQuery;
    const key = "xJTgtamgnjiaKuXCf3gW9nHiKNtIU7OwgLnVxfsqCC9mHAP3us0PDnSh"; // Replace with your Pexels API key from environment variables

    if (!key) {
      throw new Error('PEXELS_KEY environment variable is not defined.');
    }

    const new_URL = `${api_URL}?query=${query}&per_page=${quoteCount}`;

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

      setBgimage((prevBgimages) => [
        ...prevBgimages,
        ...data.photos.map((photo: { src: { portrait: any; }; }) => photo.src.portrait)
      ]);
            console.log("fetched image log in bg-image fetch",bgimage)
      console.log(bgimage)
      return data;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };

  return { handleImageFetch };
};
