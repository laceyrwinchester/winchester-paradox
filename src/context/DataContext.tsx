import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import axios from 'axios';

const API_URL = '/api';

export interface Item {
  id: string;
  title: string;
  type: 'art' | 'article' | 'product';
  content: string;
  price: number;
  image: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface DataContextType {
  items: Item[];
  subscribers: Subscriber[];
  loading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  fetchSubscribers: () => Promise<void>;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateItem: (id: string, item: Partial<Item>) => Promise<boolean>;
  deleteItem: (id: string) => Promise<boolean>;
  subscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  deleteSubscriber: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/subscribers`);
      setSubscribers(response.data);
    } catch (err) {
      console.error('Error fetching subscribers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (item: Omit<Item, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/items`, item);
      setItems(prev => [...prev, response.data]);
      return true;
    } catch (err) {
      console.error('Error adding item:', err);
      return false;
    }
  }, []);

  const updateItem = useCallback(async (id: string, item: Partial<Item>): Promise<boolean> => {
    try {
      const response = await axios.put(`${API_URL}/items/${id}`, item);
      setItems(prev => prev.map(i => i.id === id ? response.data : i));
      return true;
    } catch (err) {
      console.error('Error updating item:', err);
      return false;
    }
  }, []);

  const deleteItem = useCallback(async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(prev => prev.filter(i => i.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting item:', err);
      return false;
    }
  }, []);

  const subscribe = useCallback(async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await axios.post(`${API_URL}/subscribe`, { email });
      setSubscribers(prev => [...prev, response.data.subscriber]);
      return { success: true, message: 'Successfully joined the protocol' };
    } catch (err: any) {
      if (err.response?.status === 409) {
        return { success: false, message: 'This frequency is already registered' };
      }
      return { success: false, message: 'Transmission failed. Try again.' };
    }
  }, []);

  const deleteSubscriber = useCallback(async (id: string): Promise<boolean> => {
    try {
      await axios.delete(`${API_URL}/subscribers/${id}`);
      setSubscribers(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting subscriber:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <DataContext.Provider value={{
      items,
      subscribers,
      loading,
      error,
      fetchItems,
      fetchSubscribers,
      addItem,
      updateItem,
      deleteItem,
      subscribe,
      deleteSubscriber
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
