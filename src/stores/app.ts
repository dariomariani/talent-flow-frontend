// Utilities
import { defineStore } from 'pinia'

interface AuthData {
  token: string;
}

interface UserData {
  displayName: string;
  role: string;
}

export const useAppStore = defineStore('app', {
  state: () => ({
    authData: null as AuthData | null, // Stores user authentication info
    userData: null as UserData | null,
  }),
  actions: {
    setAuthData(payload: AuthData) {
      this.authData = payload;
    },
    clearAuthData() {
      this.authData = null;
      this.userData = null;
    },
    setUserData(payload: UserData) {
      this.userData = payload;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.authData?.token,
    isRecruiter: (state) => state.userData?.role === "RECRUITER",
  },
  persist: true,
})
