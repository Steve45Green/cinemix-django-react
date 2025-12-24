import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Definimos a interface para o nosso utilizador
interface User {
  id: number;
  username: string;
  email: string;
}

// Definimos a interface para o nosso "store"
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

/**
 * O nosso "store" global para o estado do utilizador.
 *
 * Usamos o middleware `persist` do Zustand para guardar automaticamente
 * o estado no `localStorage`. Isto significa que, se o utilizador
 * recarregar a página, ele continuará logado.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Ação para definir o utilizador (usada no login)
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      // Ação para limpar o utilizador (usada no logout)
      logout: () => {
        set({ user: null, isAuthenticated: false });
        // Limpar também os tokens JWT do localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
    }),
    {
      name: 'user-storage', // Nome da chave no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
