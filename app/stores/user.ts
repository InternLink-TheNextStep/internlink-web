import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  onGetUserProfile,
  onLogin,
  onLogout,
  onRefreshToken,
} from "~/services/user-service";
import { useCookie, navigateTo, useRoute } from "#app";

export interface User {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const errorMessage = ref("");
  const route = useRoute();
  const refreshTimer = ref<NodeJS.Timeout | null>(null);

  /** Login logic */
  const login = async (email: string, password: string, rememberMe = false) => {
    loading.value = true;
    errorMessage.value = "";

    const response = await onLogin(email, password);

    if (response?.status !== "success" || !response?.data?.access_token) {
      errorMessage.value = response?.message || "Login failed";
      loading.value = false;
      return;
    }

    // Save token in cookie
    useCookie("access_token").value = response.data.access_token;

    // Load user profile
    await initUser();

    // Schedule automatic refresh every 3600s (1 hour)
    scheduleTokenRefresh(3600);

    if (import.meta.client && route.path !== "/home") navigateTo("/home");

    loading.value = false;
  };

  /** Logout logic */
  const logout = () => {
    onLogout();
    user.value = null;
    useCookie("access_token").value = null;

    if (refreshTimer.value) clearTimeout(refreshTimer.value);
    refreshTimer.value = null;

    if (import.meta.client && route.path !== "/login") {
      navigateTo("/login", { replace: true });
    }
  };

  /** Initialize user on app load */

  const initUser = async () => {
    const token = useCookie("access_token").value;
    if (!token) {
      user.value = null;
      return;
    }

    const response = await onGetUserProfile();
    if (response) {
      user.value = {
        id: response.id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
      };

    } else {
      user.value = null;
    }
  };

  const isLoggedIn = computed(() => !!user.value);

  /** Schedule token refresh in-memory */
  const scheduleTokenRefresh = (seconds: number) => {
    if (refreshTimer.value) clearTimeout(refreshTimer.value);

    refreshTimer.value = setTimeout(async () => {
      const newToken = await onRefreshToken();
      if (newToken) {
        scheduleTokenRefresh(3600);
      } else {
        logout();
      }
    }, seconds * 1000);
  };

  return {
    user,
    loading,
    errorMessage,
    login,
    logout,
    initUser,
    isLoggedIn,
  };
});
