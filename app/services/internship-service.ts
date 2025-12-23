import { baseApi } from "@/core/api/base-api";
import type { Internship } from "~/core/types/internship";
import type { Place } from "~/core/types/place";

/**
 * Fetch all internships
 */

export const getInternships = async (): Promise<Internship[]> => {
  try {
    // Request all internships (no pagination limit)
    const response = await baseApi<{ data: { items: Internship[] } }>(
      "internships?limit=-1"
    );

    return response.data.items ?? [];
  } catch (error) {
    console.error("Failed to fetch internships:", error);
    return [];
  }
};

/**
 * Fetch recommended internships based on user skills
 */
export const getRecommendedInternships = async (): Promise<Internship[]> => {
  try {
    const response = await baseApi<{ data: { items: Internship[] } }>(
      "internships/recommendations"
    );

    return response.data.items ?? [];
  } catch (error) {
    console.error("Failed to fetch recommended internships:", error);
    return [];
  }
};

/**
 * Fetch single internship by slug
 */
export const getInternshipBySlug = async (
  slug: string
): Promise<Internship | null> => {
  if (!slug) return null;

  try {
    const response = await baseApi<{ data: Internship }>(`internships/${slug}`);

    console.log(response.data);
    return response.data ?? null;
  } catch (error) {
    console.error(`Failed to fetch internship: ${slug}`, error);
    return null;
  }
};

/** Fetch all places */
export const getAllPlaces = async (): Promise<Place[]> => {
  try {
    const response = await baseApi<{ data: Place[] }>("places"); // adjust endpoint
    return response.data ?? [];
  } catch (error) {
    console.error("Failed to fetch places:", error);
    return [];
  }
};
