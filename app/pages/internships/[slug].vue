<template>
  <section class="min-h-screen pb-20">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Back link -->
      <NuxtLink
        to="/internships"
        class="text-primary hover:underline text-sm mb-4 inline-block"
      >
        < Go Back
      </NuxtLink>

      <!-- Loading state -->
      <div
        v-if="store.loading && !internship"
        class="flex flex-col items-center justify-center h-48 text-gray-500"
      >
        <span class="loading loading-ring text-primary text-4xl mb-4"></span>
        <span>Loading internship...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="text-center text-red-500">
        <p>{{ store.error }}</p>
      </div>

      <!-- Internship content -->
      <div v-else-if="internship">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ internship.title }}
        </h1>

        <!-- Tabs -->
        <div class="border-b border-gray-200 mb-6 flex gap-6">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'pb-2 text-sm font-medium transition-all',
              activeTab === tab
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Tab content -->
        <InternshipOverview
          v-if="activeTab === 'Overview'"
          :internship="internship"
        />
        <InternshipCompany
          v-else-if="activeTab === 'About the company'"
          :internship="internship"
        />
      </div>

      <!-- Not found -->
      <div v-else class="text-center mt-20">
        <p class="text-gray-500 text-lg">Internship not found.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useInternshipStore } from "~/stores/useInternshipStore";

import InternshipOverview from "~/components/InternshipOverview.vue";
import InternshipCompany from "~/components/InternshipCompany.vue";

const route = useRoute();
const store = useInternshipStore();

// Tabs
const activeTab = ref("Overview");
const tabs = ["Overview", "About the company"];

// Compute currently viewed internship only if slug matches
const internship = computed(() => {
  const slug = route.params.slug as string;
  if (!store.currentInternship) return null;
  return store.currentInternship.slug === slug ? store.currentInternship : null;
});

// Fetch fresh data when slug changes
watch(
  () => route.params.slug,
  async (slug) => {
    if (!slug) return;
    await store.fetchInternshipBySlug(slug as string);
  },
  { immediate: true }
);

console.log("Internship page loaded:", internship.value);

definePageMeta({ layout: "base" });
</script>
