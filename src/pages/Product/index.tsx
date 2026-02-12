import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { Product } from '../../types';
import { useParams } from 'react-router';

function ProductPage() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const { id } = useParams();

  const fetchProduct = useCallback(async (): Promise<Product> => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }, [id]);

  useEffect(() => {
    const getProduct = async (): Promise<void> => {
      try {
        const data = await fetchProduct();
        setProduct(data);
        setIsLoading(false);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : JSON.stringify(err);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    getProduct();
  }, [fetchProduct]);

  return (
    <>
      {isLoading && <span>Loading.... please wait!</span>}
      {error && <span>{error}</span>}
      {!isLoading && !error && product && (
        <div>
          <span>{product.title}</span>
          <span> - </span>
          <span>{product.price}</span>
        </div>
      )}
    </>
  );
}

export default ProductPage;
