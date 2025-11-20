import { db } from '../mocks/db';
import {
  getProductById,
  getProductsByCategory,
  getProductsBySearchTerm,
} from './productService';

describe('productService', () => {
  beforeEach(() => {
    db.products = [
      { id: 1, title: 'Apple', category: 'fruit' },
      { id: 2, title: 'Banana', category: 'fruit' },
      { id: 3, title: 'Carrot', category: 'vegetable' },
    ];
  });

  describe('getProductById', () => {
    it('returns product for valid ID', () => {
      const product = getProductById(1);
      expect(product).toMatchObject({ id: 1, title: 'Apple' });
    });

    it('returns null for unknown ID', () => {
      const product = getProductById(999);
      expect(product).toBeNull();
    });

    it('handles string ID input', () => {
      const product = getProductById('2');
      expect(product).toMatchObject({ id: 2, title: 'Banana' });
    });
  });

  describe('getProductsByCategory', () => {
    it('returns all products in category', () => {
      const products = getProductsByCategory('fruit');
      expect(products.length).toBe(2);
      expect(products.map((p) => p.title)).toEqual(['Apple', 'Banana']);
    });

    it('returns empty array for unknown category', () => {
      const products = getProductsByCategory('meat');
      expect(products).toEqual([]);
    });

    it('handles category with one product', () => {
      const products = getProductsByCategory('vegetable');
      expect(products).toEqual([
        { id: 3, title: 'Carrot', category: 'vegetable' },
      ]);
    });

    it('gets products by search term', () => {
      const products = getProductsBySearchTerm('Apple');
      expect(products).toEqual([{ id: 1, title: 'Apple', category: 'fruit' }]);
    });
  });
});
