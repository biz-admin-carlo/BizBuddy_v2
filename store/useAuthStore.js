// File: biz-web-app/store/useAuthStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,    
      company: null, 

      login: (userData) => {
        set({ user: userData, company: userData.company || null });
      },
      
      logout: () => {
        set({ user: null, company: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
