import { useLoaderData, Link } from 'react-router';

function ProductDetail() {
  const product = useLoaderData();

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>Price: ${product.price}</span>

      <Link to="/store" style={{ textDecoration: 'none' }}>
        Go to Store
      </Link>
    </div>
  );
}

export default ProductDetail;
