import { defineStore } from "pinia";
import { ref } from "vue";
import {
  onGetUserProfile,
  onLogin,
  onLogout,
  onRefreshToken,
  onSignUp,
} from "~/services/user-service";
import { useCookie, navigateTo, useRoute, useRouter } from "#app";

import type { User } from "@/core/types/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const errorMessage = ref("");
  const isLoggedIn = ref(false);
  const refreshTimer = ref<NodeJS.Timeout | null>(null);

  const route = useRoute();
  const router = useRouter();

  /** --- Helpers --- */
  const setToken = (token: string) => (useCookie("access_token").value = token);
  const clearToken = () => (useCookie("access_token").value = null);

  // Safe navigation to prevent redundant warnings
  const safeNavigate = (path: string) => {
    if (!import.meta.client) return;

    const resolved = router.resolve(path);
    const current = router.currentRoute.value;

    if (
      current.fullPath.replace(/\/$/, "") ===
      resolved.fullPath.replace(/\/$/, "")
    ) {
      return; // already on the target, do nothing
    }

    navigateTo(resolved.fullPath, { replace: true });
  };

  const resetUser = () => {
    user.value = null;
    isLoggedIn.value = false;
  };

  /** --- Initialize user --- */
  const initUser = async () => {
    const token = useCookie("access_token").value;
    if (!token) return resetUser();

    try {
      const profile = await onGetUserProfile();
      if (!profile) return resetUser();

      user.value = {
        id: profile.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
      };
      isLoggedIn.value = true;
    } catch {
      resetUser();
    }
  };

  /** --- Token refresh --- */
  const scheduleTokenRefresh = (seconds: number) => {
    if (refreshTimer.value) clearTimeout(refreshTimer.value);

    refreshTimer.value = setTimeout(async () => {
      try {
        const newToken = await onRefreshToken();
        if (newToken) {
          scheduleTokenRefresh(3600); // refresh again in 1h
        } else {
          logout();
        }
      } catch {
        logout();
      }
    }, seconds * 1000);
  };

  /** --- Wrapper to safely call APIs and handle validation errors --- */
  const safeApiCall = async (fn: Function) => {
    try {
      return await fn();
    } catch (err: any) {
      if (err?.response?._data) return err.response._data;
      throw err;
    }
  };

  /** --- Login --- */
  const login = async (email: string, password: string) => {
    loading.value = true;
    errorMessage.value = "";

    try {
      const response = await safeApiCall(() => onLogin(email, password));

      if (
        !response ||
        response.status !== "success" ||
        !response.data?.access_token
      ) {
        errorMessage.value = response?.message || "Login failed";
        return; // do not navigate
      }

      setToken(response.data.access_token);
      await initUser();
      scheduleTokenRefresh(3600);
      safeNavigate("/home");
    } catch (err: any) {
      errorMessage.value = err?.message || "Network error";
    } finally {
      loading.value = false;
    }
  };

  /** --- Signup --- */
  const signup = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    loading.value = true;
    errorMessage.value = "";

    try {
      const response = await safeApiCall(() =>
        onSignUp(email, password, first_name, last_name)
      );

      if (
        !response ||
        response.status !== "success" ||
        !response.data?.access_token
      ) {
        errorMessage.value = response?.message || "Signup failed";
        return; // do not navigate
      }

      setToken(response.data.access_token);
      await initUser();
      scheduleTokenRefresh(3600);
      safeNavigate("/home");
    } catch (err: any) {
      errorMessage.value = err?.message || "Network error";
    } finally {
      loading.value = false;
    }
  };

  /** --- Logout --- */
  const logout = () => {
    onLogout();
    resetUser();
    clearToken();

    if (refreshTimer.value) clearTimeout(refreshTimer.value);
    refreshTimer.value = null;

    safeNavigate("/login"); // only navigates if not already on /login
  };

  return {
    user,
    loading,
    errorMessage,
    isLoggedIn,
    login,
    signup,
    logout,
    initUser,
  };
});
