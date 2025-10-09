import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

import { productLoader } from '../../loaders/loaders';

function ProductDetail() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const product = await productLoader(params);
      setData(product);
    };

    loadData();
  }, [params]);

  if (!data) {
    return <div>No product</div>;
  }
  return (
    <div className="product-detail">
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <span>Price: ${data.price}</span>

      <Link to="/store" style={{ textDecoration: 'none' }}>
        Go to Store
      </Link>
    </div>
  );
}

export default ProductDetail;
