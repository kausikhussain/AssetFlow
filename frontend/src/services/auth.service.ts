import api from './api';
import { AuthResponse, User } from '../types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const response = await api.post<AuthResponse>('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};
