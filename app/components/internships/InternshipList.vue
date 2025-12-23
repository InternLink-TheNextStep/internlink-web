<template>
  <div>
    <div v-if="internships.length" class="flex flex-col gap-6">
      <InternshipCard
        v-for="intern in internships"
        :key="intern.id"
        :id="intern.id"
        :category="intern.category"
        :title="intern.title"
        :description="intern.description"
        :file_path="intern.file_path"
        :slug="intern.slug"
        :is_favorited="intern.is_favorited"
        :industry="intern.industry?.name"
        @favoriteToggled="handleFavoriteToggled"
      />
    </div>
    <div v-else class="text-center text-gray-500 mt-20">
      No internships found matching "{{ query }}".
    </div>
  </div>
</template>

<script setup>
import InternshipCard from './InternshipCard.vue';

const props = defineProps({
  internships: Array,
  query: String
});

const handleFavoriteToggled = (data) => {
  // Find and update the internship in the list
  const internship = props.internships.find(i => i.id === data.internshipId);
  if (internship) {
    internship.is_favorited = data.isFavorited;
  }
};
</script>
