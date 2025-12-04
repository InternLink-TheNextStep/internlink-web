import type { Internship } from "@/core/types/internship";
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getInternships,
  getInternshipBySlug,
} from "@/services/internship-service";

export const useInternshipStore = defineStore("internships", () => {
  const internships = ref<Internship[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchInternships = async () => {
    if (internships.value.length) return;

    try {
      loading.value = true;
      error.value = null;
      const data = await getInternships();
      internships.value = data ?? [];
    } catch (err) {
      console.error("Error fetching internships:", err);
      error.value = "Failed to load internships.";
    } finally {
      loading.value = false;
    }
  };

  const fetchInternshipBySlug = async (
    slug: string
  ): Promise<Internship | null> => {
    try {
      loading.value = true;
      error.value = null;

      // Check cache first
      const cached = internships.value.find((i) => i.slug === slug);
      if (cached) return cached;

      // Fetch from API
      const data = await getInternshipBySlug(slug);
      if (!data) return null; // API returned null

      // Cache in store
      internships.value.push(data);

      return data;
    } catch (err) {
      console.error(`Error fetching internship with slug ${slug}:`, err);
      error.value = "Failed to load internship.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    internships,
    loading,
    error,
    fetchInternships,
    fetchInternshipBySlug,
  };
});
