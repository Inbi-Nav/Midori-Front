const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveUser = (user: any) => {
  if (!user) {
    localStorage.removeItem(USER_KEY);
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);

    if (!user || user === "undefined") return null;

    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};