import type { Internship } from "@/core/types/internship";
import { defineStore } from "pinia";
import { ref } from "vue";
import { getInternships } from "@/services/internship-service";

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
      console.log("Internships loaded into store:", internships.value[0]?.file_path);
    } catch (err) {
      console.error("Error fetching internships:", err);
      error.value = "Failed to load internships.";
    } finally {
      loading.value = false;
    }
  };

  return { internships, loading, error, fetchInternships };
});
