import { ref, computed } from "vue";
import { useInternshipStore } from "~/stores/useInternshipStore";
import type { Internship } from "@/core/types/internship";

export function useInternshipSearch() {
  const store = useInternshipStore();

  // Search input
  const searchQuery = ref("");

  // Filters with default "All" values
  const filters = ref({
    industry: "All Industries",
    location: "All Locations",
    skills: "All Skills",
  });

  // Computed filtered internships
  const filteredInternships = computed(() => {
    const list: Internship[] = store.internships || [];
    const query = searchQuery.value.toLowerCase();

    return list.filter((intern) => {
      const title = intern.title?.toLowerCase() ?? "";
      const desc = intern.description?.toLowerCase() ?? "";
      const companyName = intern.company?.name?.toLowerCase() ?? "";

      const matchesSearch =
        title.includes(query) ||
        desc.includes(query) ||
        companyName.includes(query);

      const matchesIndustry =
        filters.value.industry === "All Industries" ||
        (intern.industry && intern.industry.name === filters.value.industry);

      const matchesLocation =
        filters.value.location === "All Locations" ||
        intern.company?.place?.state === filters.value.location;

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  });

  return {
    store,
    searchQuery,
    filters,
    filteredInternships,
  };
}
