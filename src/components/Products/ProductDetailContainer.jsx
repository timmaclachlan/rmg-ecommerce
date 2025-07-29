import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

import ProductDetail from './ProductDetail';

function ProductDetailContainer() {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `https://dummyjson.com/products/${id}`;

        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (product === null) {
      fetchProduct();
    }
  }, [product, id]);

  if (loading) return <div>Loading...Please Wait</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h2>Category: {category}</h2>
      <ProductDetail product={product} />
    </>
  );
}

export default ProductDetailContainer;
