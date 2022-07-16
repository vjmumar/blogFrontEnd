const useLocalStorage = () => {
  const get = (name) => {
    return localStorage.getItem(name);
  };

  const set = (name, item) => {
    localStorage.setItem(name, item);
  };

  const remove = (name) => {
    localStorage.removeItem(name);
  };
  return { get, set, remove };
};

export default useLocalStorage;
