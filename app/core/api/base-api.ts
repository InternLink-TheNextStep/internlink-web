import { useCookie, navigateTo } from "#app";

export const baseApi = async <T>(
  endpoint: string,
  options: Record<string, any> = {}
): Promise<T> => {
  const config = useRuntimeConfig();
  const token = process.client ? useCookie("access_token").value : null;

  try {
    return await $fetch<T>(`${config.public.apiBase}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (err: any) {
    if (err?.status === 401 || err?.status === 403) {
      useCookie("access_token").value = null;
      return navigateTo("/login") as any;
    }
    throw err;
  }
};