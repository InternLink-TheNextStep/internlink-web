import { baseApi } from "@/core/api/base-api";
import type { Internship } from "~/core/types/internship";

/**
 * Fetch all internships
 */

const MIN_LOADING_TIME = 500; // in milliseconds

export const getInternships = async (): Promise<Internship[]> => {
  const startTime = Date.now();

  try {
    const response = await baseApi<{ data: { items: Internship[] } }>(
      "internships"
    );
    const elapsed = Date.now() - startTime;
    const remainingTime = MIN_LOADING_TIME - elapsed;
    if (remainingTime > 0)
      await new Promise((r) => setTimeout(r, remainingTime));
    return response.data.items ?? [];
  } catch (error) {
    console.error("Failed to fetch internships:", error);
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

  const startTime = Date.now();

  try {
    const response = await baseApi<{ data: Internship }>(`internships/${slug}`);

    const elapsed = Date.now() - startTime;
    const remainingTime = MIN_LOADING_TIME - elapsed;
    if (remainingTime > 0)
      await new Promise((r) => setTimeout(r, remainingTime));

    return response.data ?? null;
  } catch (error) {
    console.error(`Failed to fetch internship: ${slug}`, error);
    return null;
  }
};
