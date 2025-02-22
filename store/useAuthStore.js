// File: biz-web-app/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      company: null,
      subscription: null, // not persisted if you remove it from the persist config

      login: (userData) => {
        set({
          user: userData,
          company: userData.company || null,
          // omit subscription here so that it doesn't persist old values
        });
      },
      
      logout: () => {
        set({ user: null, company: null, subscription: null });
      },

      setSubscription: (subscriptionData) => set({ subscription: subscriptionData }),
    }),
    {
      name: "auth-storage",
      // Optionally, specify which keys to persist if you want to exclude subscription:
      partialize: (state) => ({
        user: state.user,
        company: state.company,
      }),
    }
  )
);

export default useAuthStore;
