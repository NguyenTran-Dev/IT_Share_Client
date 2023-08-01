export const setSession = (key: string, item: unknown) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSession = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) ?? '{}');
};

export const clearSession = () => {
  sessionStorage.clear();
};
