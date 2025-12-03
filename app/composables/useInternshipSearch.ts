import type { Internship } from "@/core/types/internship";

export function useInternshipSearch() {
  const store = useInternshipStore();

  // 🔍 Search input
  const searchQuery = ref("");

  // 🎛️ Filters
  const filters = ref({
    industry: "",
    location: "",
    duration: "",
    skills: "",
  });

  // 🧠 Filtered internships
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

      // TODO: Apply additional filters if needed
      // Example:
      // const matchesFilters =
      //   (!filters.value.industry || intern.industry === filters.value.industry)
      // return matchesSearch && matchesFilters;

      return matchesSearch;
    });
  });

  return {
    store,
    searchQuery,
    filters,
    filteredInternships,
  };
}
