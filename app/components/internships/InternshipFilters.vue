<template>
  <div class="flex flex-wrap gap-3">
    <!-- Industry Dropdown -->
    <FilterDropdown
      v-model="localFilters.industry"
      :options="filterStore.industryOptions"
    />

    <!-- Location Dropdown -->
    <FilterDropdown
      v-model="localFilters.location"
      :options="filterStore.placeOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
import { useFilterStore } from "~/stores/userFilterStore";

const props = defineProps<{
  modelValue: {
    industry: string;
    location: string;
    skills?: string;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void;
}>();

const filterStore = useFilterStore();

// Local copy that syncs with parent v-model
const localFilters = reactive({
  industry: props.modelValue.industry ?? "All Industries",
  location: props.modelValue.location ?? "All Locations",
  skills: props.modelValue.skills ?? "All Skills",
});

// Log when filters change
watch(
  localFilters,
  (newVal) => {
    console.log("🔥 Filters changed:", newVal);
    emit("update:modelValue", { ...newVal });
  },
  { deep: true }
);

// Load dropdown options
onMounted(async () => {
  console.log("📌 Fetching places & industries...");

  await filterStore.fetchPlaces();
  console.log("📍 Places loaded:", filterStore.placeOptions);

  await filterStore.fetchIndustries();
  console.log("🏭 Industries loaded:", filterStore.industryOptions);
});
</script>
