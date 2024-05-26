if (typeof window !== 'undefined') {
  const localStorageMock = {
    getItem: (key: string) => {
      return localStorageMock.store[key] || null;
    },
    setItem: (key: string, value: Record<string, string>) => {
      localStorageMock.store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete localStorageMock.store[key];
    },
    clear: () => {
      localStorageMock.store = {};
    },
    store: {} as Record<string, string>,
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
}
