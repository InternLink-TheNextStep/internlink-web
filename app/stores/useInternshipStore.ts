import type { Internship } from "@/core/types/internship";
import type { Place } from "@/core/types/place";
import {
    getInternshipBySlug,
    getInternships,
} from "@/services/internship-service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInternshipStore = defineStore("internships", () => {
  const internships = ref<Internship[]>([]);
  const currentInternship = ref<Internship | null>(null);
  const places = ref<Place[]>([]); // for filtering by place/state
  const loading = ref(true);
  const error = ref<string | null>(null);

  /** Fetch all internships */
  const fetchInternships = async (forceRefresh = false) => {
    // Skip fetch if already loaded and not forcing refresh
    if (internships.value.length && !forceRefresh) {
      loading.value = false;
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const data = await getInternships();
      internships.value = data ?? [];
    } catch (err) {
      console.error("Error fetching internships:", err);
      error.value = "Failed to load internships.";
    } finally {
      loading.value = false;
    }
  };

  /** Fetch a single internship by slug */
  const fetchInternshipBySlug = async (
    slug: string
  ): Promise<Internship | null> => {
    if (currentInternship.value?.slug === slug) return currentInternship.value;

    const cached = internships.value.find((i) => i.slug === slug);
    if (cached) {
      currentInternship.value = cached;
      return cached;
    }

    loading.value = true;
    error.value = null;

    try {
      const data = await getInternshipBySlug(slug);
      if (!data) return null;

      currentInternship.value = data;
      return data;
    } catch (err) {
      console.error(`Error fetching internship ${slug}:`, err);
      error.value = "Failed to load internship.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    internships,
    currentInternship,
    places,
    loading,
    error,
    fetchInternships,
    fetchInternshipBySlug,
  };
});
