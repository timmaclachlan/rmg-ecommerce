import { useLoaderData } from 'react-router-dom';
import ProductDetail from '../../../components/Products/ProductDetail';

export default function ProductPage() {
  const product = useLoaderData();
  return <ProductDetail product={product} />;
}
