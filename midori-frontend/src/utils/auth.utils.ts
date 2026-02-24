const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);

export const getToken = () =>
  localStorage.getItem(TOKEN_KEY);

export const saveUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};