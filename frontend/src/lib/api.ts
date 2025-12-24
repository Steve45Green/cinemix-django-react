// src/lib/api.ts
import axios from 'axios';
import { Filme, PaginatedResponse, User, LoginCredentials, RegisterCredentials, MovieStatus, Review, ReviewPayload } from '../types';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8765';

const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTOR DE DEPURAÇÃO ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log(`[API Interceptor] A fazer pedido para: ${config.url}`);
    
    if (token) {
      console.log('[API Interceptor] Token encontrado. A anexar ao cabeçalho.');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('[API Interceptor] Nenhum token encontrado no localStorage.');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getFilmes = async (params: { ordering?: string } = {}): Promise<PaginatedResponse<Filme>> => {
  const response = await apiClient.get('/filmes/', { params });
  return response.data;
};

export const getFilmeDetail = async (slug: string): Promise<Filme> => {
  const response = await apiClient.get(`/filmes/${slug}/`);
  return response.data;
};

export const login = async (credentials: LoginCredentials) => {
  const response = await apiClient.post('/auth/token/', credentials);
  const tokens = response.data;
  if (tokens.access) {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
  }
  return tokens;
};

export const register = async (data: RegisterCredentials): Promise<User> => {
  const response = await apiClient.post('/auth/register/', data);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me/');
  return response.data;
};

export const getMovieStatus = async (slug: string): Promise<MovieStatus> => {
  const response = await apiClient.get(`/filmes/${slug}/status/`);
  return response.data;
};

export const toggleWatchlist = async (slug: string): Promise<{ in_watchlist: boolean }> => {
  const response = await apiClient.post(`/filmes/${slug}/toggle_watchlist/`);
  return response.data;
};

export const toggleFavorite = async (slug: string): Promise<{ is_favorite: boolean }> => {
  const response = await apiClient.post(`/filmes/${slug}/toggle_favorite/`);
  return response.data;
};

export const getMovieReviews = async (slug: string): Promise<Review[]> => {
  const response = await apiClient.get(`/filmes/${slug}/reviews/`);
  return response.data;
};

export const createMovieReview = async (slug: string, payload: ReviewPayload): Promise<Review> => {
  const response = await apiClient.post(`/filmes/${slug}/reviews/create/`, payload);
  return response.data;
};
