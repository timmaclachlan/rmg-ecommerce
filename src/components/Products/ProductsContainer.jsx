import { useEffect, useState } from "react";
import axios from "axios";

import Products from "./Products";

function ProductsContainer({ category, onSelectedItem, onStageChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products/category/${category}`;

        const response = await axios.get(url);
        setItems(response.data.products);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (category !== null) {
      fetchProducts();
    }
  }, [category]);

  if (loading) return <div>Loading...Please Wait</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h3>{category ?? "No category"}</h3>
      <Products
        items={items}
        onClick={onSelectedItem}
        onStageChange={onStageChange}
      />
    </>
  );
}

export default ProductsContainer;
