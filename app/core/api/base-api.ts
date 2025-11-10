import { useCookie, navigateTo } from "#app";

export const baseApi = async <T = unknown>(
  endpoint: string,
  options: Record<string, any> = {}
): Promise<T> => {
  const config = useRuntimeConfig();
  const token = useCookie("access_token").value;

  const request = () =>
    $fetch<T>(`${config.public.apiBase}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

  try {
    return await request();
  } catch (err: any) {
    if (err?.status === 401) {
      console.warn("Unauthorized - token invalid");
      useCookie("access_token").value = null;
      return navigateTo("/login") as any;
    }
    throw err;
  }
};
