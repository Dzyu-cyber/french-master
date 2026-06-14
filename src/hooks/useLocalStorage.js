import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage.
 * @param {string} key - The localStorage key.
 * @param {*} initialValue - The fallback value if no value exists in localStorage.
 * @returns {[*, Function]} - State value and setter function.
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or fallback
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep localStorage in sync with the state
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
