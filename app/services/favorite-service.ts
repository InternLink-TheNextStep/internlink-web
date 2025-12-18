import { baseApi } from "@/core/api/base-api";
import type { Internship } from "~/core/types/internship";

/**
 * Toggle favorite status for an internship
 */
export const toggleFavorite = async (internshipId: number): Promise<{
  is_favorited: boolean;
  internship_id: number;
}> => {
  try {
    const response = await baseApi<{
      data: { is_favorited: boolean; internship_id: number };
    }>(`internships/${internshipId}/favorite`, {
      method: "POST",
    });

    return response.data;
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    throw error;
  }
};

/**
 * Check if an internship is favorited by the user
 */
export const checkFavoriteStatus = async (
  internshipId: number
): Promise<boolean> => {
  try {
    const response = await baseApi<{
      data: { is_favorited: boolean; internship_id: number };
    }>(`internships/${internshipId}/favorite/check`);

    return response.data.is_favorited;
  } catch (error) {
    console.error("Failed to check favorite status:", error);
    return false;
  }
};

/**
 * Get user's favorite internships
 */
export const getFavoriteInternships = async (): Promise<{
  items: Internship[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}> => {
  try {
    const response = await baseApi<{
      data: {
        items: Internship[];
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
      };
    }>("favorites");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch favorite internships:", error);
    return {
      items: [],
      total: 0,
      current_page: 1,
      per_page: 10,
      last_page: 1,
    };
  }
};
