import { useState, useEffect } from "react";
import axios from "axios";

import Categories from "./Categories";

function CategoriesContainer({ onCategoriesClick }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        setCategories(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...Please Wait</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Categories categories={categories} onClick={onCategoriesClick} />;
}

export default CategoriesContainer;
