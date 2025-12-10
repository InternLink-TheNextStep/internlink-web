import { baseApi } from "@/core/api/base-api";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Place } from "@/core/types/place";
import type { Industry } from "@/core/types/industry";

export const useFilterStore = defineStore("filters", () => {
  const places = ref<Place[]>([]);
  const industries = ref<Industry[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPlaces = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await baseApi<{ data: Place[] }>("filters/places");
      places.value = response.data ?? []; // <-- directly use data, not items
      console.log("Fetched places:", places.value);
    } catch (err) {
      console.error("Failed to fetch places:", err);
      error.value = "Failed to load places";
    } finally {
      loading.value = false;
    }
  };

  const fetchIndustries = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await baseApi<{ data: Industry[] }>(
        "filters/industries"
      );
      industries.value = response.data ?? []; // <-- directly use data
      console.log("Fetched industries:", industries.value);
    } catch (err) {
      console.error("Failed to fetch industries:", err);
      error.value = "Failed to load industries";
    } finally {
      loading.value = false;
    }
  };

  // Computed options for dropdowns
  const placeOptions = computed(() => [
    "All Locations",
    ...Array.from(new Set(places.value.map((p) => p.state).filter(Boolean))),
  ]);

  const industryOptions = computed(() => [
    "All Industries",
    ...Array.from(new Set(industries.value.map((i) => i.name).filter(Boolean))),
  ]);

  return {
    places,
    industries,
    loading,
    error,
    fetchPlaces,
    fetchIndustries,
    placeOptions,
    industryOptions,
  };
});
