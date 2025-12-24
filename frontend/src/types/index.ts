// src/types/index.ts

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Genero {
  id: number;
  nome: string;
  slug: string;
}

export interface Filme {
  id: number;
  titulo: string;
  slug: string;
  ano_lancamento: number;
  media_rating: number;
  poster: string;
  backdrop: string;
  generos?: Genero[];
  descricao: string;
  imdb_id: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface MovieStatus {
  in_watchlist: boolean;
  is_favorite: boolean;
}

// --- Novos Tipos para Reviews ---

export interface Review {
  id: number;
  autor: User;
  titulo: string;
  texto: string;
  rating: number;
  spoiler: boolean;
  created_at: string;
}

export interface ReviewPayload {
  titulo?: string;
  texto: string;
  rating: number;
  spoiler: boolean;
}
