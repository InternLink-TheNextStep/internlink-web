<template>
  <section class="min-h-screen bg-gray-50 pb-16">
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

      <!-- Loading / Error / Empty States -->
      <div v-if="pending" class="space-y-4 mb-4">
        <InternshipCardSkeleton v-for="n in 6" :key="n" />
      </div>
      <div v-else-if="error" class="text-red-500 mb-4">
        Failed to load internships.
      </div>
      <div
        v-else-if="filteredInternships.length === 0"
        class="text-gray-500 mb-4"
      >
        No internships found matching your criteria.
      </div>

      <!-- Internship List -->
      <InternshipList
        v-else
        :internships="filteredInternships"
        :query="searchQuery"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import InternshipSearchBar from "~/components/internships/InternshipSearchBar.vue";
import InternshipFilters from "~/components/internships/InternshipFilters.vue";
import InternshipList from "~/components/internships/InternshipList.vue";
import InternshipCardSkeleton from "~/components/skeletons/InternshipCardSkeleton.vue";

import type { Internship } from "~/core/types/internship";
import { getInternships } from "@/services/internship-service";

definePageMeta({ layout: "base" });

// ✅ State
const internships = ref<Internship[]>([]);
const pending = ref(true);
const error = ref<string | null>(null);

// 🔥 Fetch internships
const fetchInternships = async () => {
  try {
    pending.value = true;
    error.value = null;
    internships.value = await getInternships();
    console.log("Fetched internships:", internships.value);
  } catch (err) {
    console.error("Error fetching internships:", err);
    error.value = "Failed to load internships.";
  } finally {
    pending.value = false;
  }
};

onMounted(fetchInternships);

// 🔍 Search input
const searchQuery = ref("");

// 🎛️ Filters
const filters = ref({
  industry: "",
  location: "",
  duration: "",
  skills: "",
});

// 🧠 Safe filtered internships
const filteredInternships = computed(() => {
  const list = internships.value || [];
  const query = searchQuery.value.toLowerCase();

  return list.filter((intern) => {
    // Safe access to properties
    const title = intern.title?.toLowerCase() ?? "";
    const desc = intern.description?.toLowerCase() ?? "";
    const companyName = intern.company?.name?.toLowerCase() ?? "";

    const matchesSearch =
      title.includes(query) ||
      desc.includes(query) ||
      companyName.includes(query);

    return matchesSearch;
  });
});
</script>
