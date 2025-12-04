<template>
  <section class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-5xl mx-auto px-6">
      <NuxtLink
        to="/internships"
        class="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        < Go Back
      </NuxtLink>

      <!-- Loading state -->
      <div
        v-if="store.loading"
        class="flex flex-col items-center justify-center h-48 text-gray-500"
      >
        <span class="loading loading-ring text-blue-600 text-4xl mb-4"></span>
        <span>Loading internship...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="store.error" class="text-center text-red-500">
        <p>{{ store.error }}</p>
      </div>

      <!-- Internship content -->
      <div v-else-if="internship">
        <!-- Title and company info -->
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
                ? 'text-blue-600 border-b-2 border-blue-600'
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
          :active-internships="activeInternships"
        />
      </div>

      <!-- Not found state -->
      <div v-else class="text-center mt-20">
        <p class="text-gray-500 text-lg">Internship not found.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useInternshipStore } from "@/stores/internship";

import InternshipOverview from "~/components/InternshipOverview.vue";
import InternshipCompany from "~/components/InternshipCompany.vue";
import type { Internship } from "~/core/types/internship";

const route = useRoute();
const store = useInternshipStore();

// Tabs and active state
const activeTab = ref("Overview");
const tabs = ["Overview", "About the company"];

// Computed: find internship by slug
let internship = ref<Internship | null>(null);

const activeInternships = computed(() => {
  if (!internship.value) return [];
  return store.internships.filter(
    (i) => i.company?.id === internship.value?.company?.id
  );
});

onMounted(async () => {
  internship.value = await store.fetchInternshipBySlug(
    route.params.slug as string
  );
});

definePageMeta({ layout: "base" });
</script>
