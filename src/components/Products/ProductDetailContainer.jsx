import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

import ProductDetail from './ProductDetail';

function ProductDetailContainer() {
  const navigate = useNavigate();
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

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      navigate('/products/notfound');
    }
  }

  return (
    <>
      <h2>Category: {category}</h2>
      <ProductDetail product={product} />
    </>
  );
}

export default ProductDetailContainer;
