import { createClient } from "contentful";

const useContentful = () => {
  const client = createClient({
    space: "8sp5hqkneneh",
    accessToken: "3ne6cvWMB5xiFG6QbzVqd7IzgNbqvAObxg3Co6pP7XE",
    host: "preview.contentful.com",
  });
  const getRecipes = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "recipeTitle",
        select: "fields",
      });
      console.log(entries);
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

  const getCategories = async () => {
    try {
      const categories = await client.getEntries({
        content_type: "categories",
        select: "fields",
      });
      return categories.items;
    } catch (error) {
      console.log(`Error fetching recipes: ${error}`);
    }
  };
  return { getRecipes, getCategories };
};
export default useContentful;
