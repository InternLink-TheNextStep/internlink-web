<template>
  <section class="min-h-screen pb-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-800 mb-2">
        Find your dream internship
      </h1>
      <p class="text-gray-500 mb-6">
        Explore opportunities from leading companies in Cambodia.
      </p>

      <!-- Search & Filters -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <InternshipSearchBar v-model="searchQuery" />
        <InternshipFilters v-model="filters" />
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="space-y-4 mb-4">
        <InternshipCardSkeleton v-for="n in 6" :key="n" />
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="text-red-500 mb-4">
        {{ store.error }}
      </div>

      <!-- No Results -->
      <div
        v-else-if="
          !store.loading &&
          store.internships.length > 0 &&
          filteredInternships.length === 0
        "
        class="text-gray-500 mb-4"
      >
        No internships found matching your criteria.
      </div>

      <!-- Internship List -->
      <InternshipList
        v-else-if="filteredInternships.length > 0"
        :internships="filteredInternships"
        :query="searchQuery"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useInternshipSearch } from "~/composables/useInternshipSearch";

import InternshipSearchBar from "~/components/internships/InternshipSearchBar.vue";
import InternshipFilters from "~/components/internships/InternshipFilters.vue";
import InternshipList from "~/components/internships/InternshipList.vue";
import InternshipCardSkeleton from "~/components/skeletons/InternshipCardSkeleton.vue";

definePageMeta({ layout: "base" });

const { store, searchQuery, filters, filteredInternships } =
  useInternshipSearch();

// Fetch internships on mount
onMounted(async () => {
  await store.fetchInternships();
});
</script>
