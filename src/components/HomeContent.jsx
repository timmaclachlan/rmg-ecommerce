import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router';
import { Typography, Box, Paper } from '@mui/material';

import Products from './Products/Products';
import ProductsSkeleton from './Products/ProductsSkeleton';
import Categories from './Categories/Categories';
import { productsPageLoader } from '../loaders/productLoaders';
import CategoriesSkeleton from './Categories/CategoriesSkeleton';

function HomeContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const params = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState({ categories: [], products: [] });

  // For dynamic grid columns
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(3);

  // For sticky sidebar demo
  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [sidebarTop, setSidebarTop] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const search = searchParams.get('search') || '';
      setIsLoading(true);
      const { categories, products } = await productsPageLoader({
        params,
        search,
      });
      setIsLoading(false);
      setData({ categories, products });
    };
    loadData();
  }, [params, searchParams]);

  // --- useLayoutEffect 1: Dynamic grid columns ---
  useLayoutEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const newColumns = Math.floor(width / 260);
        setColumns(Math.max(newColumns, 1));
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // --- useLayoutEffect 2: Sticky categories sidebar ---
  useLayoutEffect(() => {
    if (!sidebarRef.current) return;

    // Measure where the sidebar starts
    const sidebarOffsetTop =
      sidebarRef.current.getBoundingClientRect().top + window.scrollY;
    setSidebarTop(sidebarOffsetTop);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Toggle sticky mode once we scroll past the sidebar’s top
      if (scrollY > sidebarTop - 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sidebarTop]);

  const handleCategoryClick = (category) => {
    navigate(`/store/${category}`);
  };

  const categoryName =
    data.categories.find((t) => t.slug === params.category)?.name ||
    'Special Offers';

  return (
    <Box sx={{ display: 'flex', p: 2, gap: 2 }}>
      {/* LEFT COLUMN - Sticky Categories */}
      <Box
        ref={sidebarRef}
        sx={{
          width: 250,
          flexShrink: 0,
          alignSelf: 'flex-start',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? 20 : 'auto',
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
      >
        <Paper elevation={2} sx={{ p: 2 }}>
          {isLoading ? (
            <CategoriesSkeleton />
          ) : (
            <Categories
              categories={data.categories}
              onCategoriesClick={handleCategoryClick}
            />
          )}
        </Paper>
      </Box>

      {/* RIGHT COLUMN - Products Grid */}
      <Box sx={{ flex: 1, ml: isSticky ? '270px' : 0 }}>
        <Typography variant="h4" gutterBottom>
          {categoryName}
        </Typography>
        <Box ref={containerRef}>
          {isLoading ? (
            <ProductsSkeleton columns={columns} />
          ) : (
            <Products products={data.products} columns={columns} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

HomeContent.displayName = 'RMG-HomeContent';
export default HomeContent;
