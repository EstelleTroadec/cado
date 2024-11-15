// src/hooks/useAuth.ts

interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const useAuth = () => {
  const getAuthData = (): AuthData | null => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      return JSON.parse(authData);
    }
    return null;
  };

  return {
    authData: getAuthData(),
  };
};
