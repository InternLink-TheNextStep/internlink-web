import { useCookie } from "#app";
import { baseApi } from "@/core/api/base-api";

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
  const response = await baseApi<LoginResponse>("user/login", {
    method: "POST",
    body: { email, password },
    headers: { "Content-Type": "application/json" },
  });

  console.log("Login response:", response.status);

  return response;
};

export const onLogout = async () => {
  const response = await baseApi<LoginResponse>("user/logout", {
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
    const response = await baseApi<{
      data: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      };
    }>("user/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const onSignUp = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  const response = await baseApi<LoginResponse>("user/signup", {
    method: "POST",
    body: { email, password, first_name, last_name },
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

/**
 * Upload user CV
 */
export const uploadCV = async (file: File) => {
  const formData = new FormData();
  formData.append("cv", file);

  const config = useRuntimeConfig();
  const token = useCookie("access_token").value;

  try {
    const response = await $fetch<{
      data: {
        cv_url: string;
      };
      message: string;
    }>(`${config.public.apiBase}user/profile/cv`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    console.error("Failed to upload CV:", error);
    throw error;
  }
};

/**
 * Get user profile details
 */
export const getUserProfileDetails = async () => {
  try {
    const response = await baseApi<{
      data: {
        id: number;
        university: string | null;
        major: string | null;
        graduation_year: number | null;
        dob: string | null;
        gender: string | null;
        skills: string | null;
        profile_picture_url: string | null;
        cv_url: string | null;
      };
    }>("user/profile/details");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile details:", error);
    throw error;
  }
};
