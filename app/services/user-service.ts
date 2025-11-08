import { baseApi } from "@/core/api/base-api";
import { useCookie } from "#app";

interface LoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in_seconds: number;
  };
  message: string;
  status: any;
  errors: any;
 
}

export const onLogin = async (email: string, password: string) => {
  const response = await baseApi<LoginResponse>("/login", {
    method: "POST",
    body: { email, password },
    headers: { "Content-Type": "application/json" },
  });


  console.log("Login response:", response.status);

  return response;
};

export const onLogout = async () => {
  const response = await baseApi<LoginResponse>("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.status === "success") {
    useCookie("access_token").value = null;
  }

  return response;
};

export const onRefreshToken = async () => {
  const token = useCookie("access_token").value;
  if (!token) return null;

  try {
    const response = await baseApi<{ data: { access_token: string } }>(
      "/refresh-token",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response?.data?.access_token) {
      useCookie("access_token").value = response.data.access_token;
      return response.data.access_token;
    }

    return null;
  } catch {
    useCookie("access_token").value = null;
    return null;
  }
};

export const onGetUserProfile = async () => {
  const token = useCookie("access_token").value;
  if (!token) return null;

  try {
    const response = await baseApi<{ data: { id: number; first_name: string; last_name: string; email: string } }>(
      "/profile",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch {
    return null;
  }
}
