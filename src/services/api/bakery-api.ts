import { Product } from '@/types/product';
import { OrderItem } from '@/features/checkout/hooks/use-checkout';
import axios from 'axios';

/**
 * Fetches the storage data from the API
 */
export const fetchStorage = async (): Promise<Product[]> => {
  const { data } = await axios.get<{ storage: Product[] }>('/storage');
  return data.storage || [];
};

/**
 * Places an order with the given items
 */
export const placeOrder = async (items: OrderItem[]): Promise<void> => {
  await axios.post('/order', { items });
};
