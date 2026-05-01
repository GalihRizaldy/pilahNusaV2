import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing scan history via backend API
 */
const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchHistory();
  }, []);

  /**
   * Add a new scan result to history
   * @param {Object} item - History item to add
   */
  const addToHistory = useCallback(async (item) => {
    try {
      const response = await axios.post('/api/history', item);
      setHistory((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error('Failed to add history item:', error);
    }
  }, []);

  /**
   * Remove an item from history by ID
   * @param {string} id - Item ID
   */
  const removeFromHistory = useCallback(async (id) => {
    try {
      await axios.delete(`/api/history/${id}`);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to remove history item:', error);
    }
  }, []);

  /**
   * Clear all history items
   */
  const clearAllHistory = useCallback(async () => {
    // We didn't implement DELETE /api/history (all) in the backend to keep it simple,
    // so we'll just clear local state for now, or you can add a route for it.
    // For now, let's just do it locally to avoid backend errors.
    setHistory([]);
  }, []);

  /**
   * Filter history by category
   * @param {string} category - Category to filter by ('all' for no filter)
   * @returns {Array} Filtered history
   */
  const filterByCategory = useCallback((category) => {
    if (category === 'all') return history;
    return history.filter((item) => item.result?.category === category);
  }, [history]);

  /**
   * Search history by name
   * @param {string} query - Search query
   * @returns {Array} Matching history items
   */
  const searchHistory = useCallback((query) => {
    if (!query.trim()) return history;
    const lowerQuery = query.toLowerCase();
    return history.filter(
      (item) =>
        item.result?.name?.toLowerCase().includes(lowerQuery) ||
        item.result?.category?.toLowerCase().includes(lowerQuery)
    );
  }, [history]);

  const totalScans = history.length;
  const categoryCounts = history.reduce((acc, item) => {
    const cat = item.result?.category || 'unknown';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return {
    history,
    isLoaded,
    totalScans,
    categoryCounts,
    addToHistory,
    removeFromHistory,
    clearAllHistory,
    filterByCategory,
    searchHistory,
  };
};

export default useHistory;

