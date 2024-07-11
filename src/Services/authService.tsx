// src/services/authService.ts

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
  const response = await fetch('http://165.227.232.51:3000/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ email, password }),
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
