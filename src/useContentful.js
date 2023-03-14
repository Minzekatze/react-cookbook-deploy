import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: process.env.REACT_APP_CONTENTFULT_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN,
    host: "preview.contentful.com",
  });
  const getRecipes = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "recipeTitle",
        select: "fields",
      });
      const sanitizedEntries = entries.items.map((item) => {
        const recipeImg = item.fields.recipePicture?.fields;
        return {
          ...item.fields,
          recipeImg,
        };
      });
      return sanitizedEntries;
    } catch (error) {
      console.log(`Error fetching recipes: ${error}`);
    }
  };
  return { getRecipes };
};
export default useContentful;
