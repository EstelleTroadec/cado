// src/ceeirssv / authService.ts;
import baseApi from './baseApi';

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // http://165.227.232.51/:5000/login/ API
  // https://cado.zapto.org/login/
  const response = await fetch(`${baseApi}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message);
  }
  const data = await response.json();
  return {
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
    },
    token: data.token,
  };
};
