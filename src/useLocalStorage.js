export const useLocalStorage = () => {
  const saveToLocalStorage = (id, data) => {
    localStorage.setItem(id, data);
  };

  const loadFromLocalStorage = (id) => {
    return localStorage.getItem(id);
  };

  return {
    saveToLocalStorage,
    loadFromLocalStorage,
  };
};
