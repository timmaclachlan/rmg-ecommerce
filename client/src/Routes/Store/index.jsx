import { useLoaderData } from 'react-router-dom';
import HomeContent from '../../components/HomeContent';

export default function CategoryPage() {
  const data = useLoaderData();
  return <HomeContent data={data} />;
}
