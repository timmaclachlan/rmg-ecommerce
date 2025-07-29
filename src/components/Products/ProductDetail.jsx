function ProductDetail({ product }) {
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>Price: ${product.price}</span>

      <a href="/">Back to Home</a>
    </div>
  );
}

export default ProductDetail;
