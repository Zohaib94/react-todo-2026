import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '../../types';
import { Link } from 'react-router';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
  };

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {error && <span>{error}</span>}
      {!isLoading &&
        !error &&
        products.map((product: Product) => (
          <div key={product.id}>
            <span>
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </span>
            <span> - </span>
            <span>{product.price}</span>
          </div>
        ))}
    </>
  );
}

export default ProductsPage;
