<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 relative"
  >
    <!-- Save/Unsave Button (Top Right) -->
    <button
      v-if="userStore.isLoggedIn"
      @click.prevent="handleToggleFavorite"
      :disabled="isTogglingFavorite"
      class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
      :title="isFavorited ? 'Remove from saved' : 'Save internship'"
    >
      <Icon
        :name="isFavorited ? 'mdi:heart' : 'mdi:heart-outline'"
        :class="[
          'w-6 h-6 transition-colors',
          isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
        ]"
      />
    </button>

    <!-- Left -->
    <div class="flex-1">
      <p class="text-sm text-primary font-semibold mb-1">{{ industry }}</p>
      <h3 class="text-lg font-bold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sit enim
        quibusdam aliquam fugiat explicabo qui, commodi quidem odio corrupti
        voluptate tenetur ipsam harum ipsa, similique dolor praesentium!
        Similique, tempora.
      </p>
      <NuxtLink
        :to="`/internships/${slug}`"
        class="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        View Details
      </NuxtLink>
    </div>

    <!-- Right -->
    <img
      v-if="file_path"
      :src="getSpaceFileUrl(file_path)"
      alt="Internship image"
      class="w-full sm:w-48 h-32 object-cover rounded-xl mt-4 sm:mt-0 sm:ml-6 "
    />

    <!-- Skeleton fallback if no image -->
    <div
      v-else
      class="w-full sm:w-48 h-32 rounded-xl mt-4 sm:mt-0 sm:ml-6 skeleton"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { toggleFavorite } from "~/services/favorite-service";

const props = defineProps({
  id: Number,
  industry: String,
  title: String,
  description: String,
  file_path: String,
  slug: String,
  is_favorited: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['favoriteToggled']);

const userStore = useUserStore();
const isFavorited = ref(props.is_favorited);
const isTogglingFavorite = ref(false);

// Watch for prop changes
watch(() => props.is_favorited, (newValue) => {
  isFavorited.value = newValue;
});

const handleToggleFavorite = async () => {
  if (!props.id || isTogglingFavorite.value) return;

  isTogglingFavorite.value = true;

  try {
    const result = await toggleFavorite(props.id);
    isFavorited.value = result.is_favorited;
    
    // Emit event to parent component if needed
    emit('favoriteToggled', {
      internshipId: props.id,
      isFavorited: result.is_favorited,
    });
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    // Optionally show error toast/notification
  } finally {
    isTogglingFavorite.value = false;
  }
};
</script>
