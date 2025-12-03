<template>
  <section class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-5xl mx-auto px-6 ">
  
      <NuxtLink
        to="/internships"
        class="text-blue-600 hover:underline text-sm mb-2 inline-block"
      >
        <  Go Back
      </NuxtLink>

      <!-- Loading state -->
      <div
        v-if="pending"
        class="flex flex-col items-center justify-center h-48 text-gray-500"
      >
        <span class="loading loading-ring text-blue-600 text-4xl mb-4"></span>
        <span>Loading internship...</span>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>

      <!-- Internship content -->
      <div v-else-if="internship">
        <!-- Title and company info -->
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          {{ internship.title }}
        </h1>
        <p class="text-gray-600 mb-6">
          {{ internship.company.name }} • {{ internship.company.location }}
        </p>

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

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getInternshipBySlug } from "@/services/internship-service";
import InternshipOverview from "~/components/InternshipOverview.vue";
import InternshipCompany from "~/components/InternshipCompany.vue";

// Route
const route = useRoute();

// Reactive refs
const internship = ref(null);
const activeInternships = ref([]); // for company tab if needed
const activeTab = ref("Overview");
const tabs = ["Overview", "About the company"];
const pending = ref(true);
const error = ref(null);

// Fetch internship on mount
onMounted(async () => {
  try {
    pending.value = true;
    internship.value = await getInternshipBySlug(route.params.slug); // Example slug usage
  } catch (err) {
    console.error("Error fetching internship:", err);
    error.value = "Failed to load internship.";
  } finally {
    pending.value = false;
  }
});

// Page metadata
definePageMeta({ layout: "base" });
</script>
