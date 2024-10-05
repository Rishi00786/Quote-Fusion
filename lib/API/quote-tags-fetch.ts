// License Error with the API (fixed)
// import axios from 'axios';
// import https from 'https';

// export const getQuoteTags = async () => {
//   try {
//     const response = await axios.get('https://api.quotable.io/tags', {
//       httpsAgent: new https.Agent({
//         rejectUnauthorized: false, // Ignore invalid SSL certificates
//       }),
//     });

//     const data = response.data;
//     // console.log("data", data);

//     const filteredTags = data.filter((tag: { quoteCount: number }) => tag.quoteCount > 10);
//     console.log(filteredTags)

//     filteredTags.sort((a: { quoteCount: number }, b: { quoteCount: number }) => b.quoteCount - a.quoteCount);

//     return filteredTags.map((tag: { name: string }) => tag.name);
//   } catch (error) {
//     console.error('Error fetching tags:', error);
//     return [];
//   }

// };