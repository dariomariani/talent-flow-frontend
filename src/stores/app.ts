// Utilities
import { defineStore } from 'pinia'

interface AuthData {
  token: string;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    authData: null as AuthData | null, // Stores user authentication info
  }),
  actions: {
    setAuthData(payload: AuthData) {
      this.authData = payload;
    },
    clearAuthData() {
      this.authData = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.authData?.token,
  }
})
