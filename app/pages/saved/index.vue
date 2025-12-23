<template>
  <section class="min-h-screen pb-16 ">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Saved Internships</h1>
      <p class="text-gray-500 mb-6">
        View all internships you've saved for later.
      </p>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-4">
        <InternshipCardSkeleton v-for="n in 6" :key="n" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button
          @click="fetchFavorites"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!loading && favorites.length === 0"
        class="text-center py-20"
      >
        <Icon
          name="mdi:heart-outline"
          class="w-20 h-20 text-gray-300 mx-auto mb-4"
        />
        <h2 class="text-2xl font-semibold text-gray-600 mb-2">
          No saved internships yet
        </h2>
        <p class="text-gray-500 mb-6">
          Start saving internships to keep track of opportunities you're
          interested in.
        </p>
        <NuxtLink
          to="/internships"
          class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Internships
        </NuxtLink>
      </div>

      <!-- Favorites List -->
      <div v-else class="space-y-6">
        <InternshipCard
          v-for="internship in favorites"
          :key="internship.id"
          :id="internship.id"
          :category="internship.industry?.name"
          :title="internship.title"
          :description="internship.description"
          :file_path="internship.file_path"
          :slug="internship.slug"
          :is_favorited="true"
          @favoriteToggled="handleFavoriteToggled"
        />

        <!-- Pagination info (optional) -->
        <div v-if="total > 0" class="text-center text-gray-500 text-sm">
          Showing {{ favorites.length }} of {{ total }} saved internships
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InternshipCard from "~/components/internships/InternshipCard.vue";
import InternshipCardSkeleton from "~/components/skeletons/InternshipCardSkeleton.vue";
import type { Internship } from "~/core/types/internship";
import { getFavoriteInternships } from "~/services/favorite-service";

definePageMeta({
  layout: "base",
  middleware: ["auth-user"],
});

const loading = ref(true);
const error = ref<string | null>(null);
const favorites = ref<Internship[]>([]);
const total = ref(0);

const fetchFavorites = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await getFavoriteInternships();
    favorites.value = response.items;
    total.value = response.total;
  } catch (err: any) {
    console.error("Failed to fetch favorites:", err);
    error.value = "Failed to load saved internships. Please try again.";
  } finally {
    loading.value = false;
  }
};

// Handle when a favorite is toggled from a card
const handleFavoriteToggled = (data: {
  internshipId: number;
  isFavorited: boolean;
}) => {
  if (!data.isFavorited) {
    // Remove from list when unfavorited
    favorites.value = favorites.value.filter(
      (item) => item.id !== data.internshipId
    );
    total.value = Math.max(0, total.value - 1);
  }
};

// Fetch favorites on mount
onMounted(async () => {
  await fetchFavorites();
});
</script>