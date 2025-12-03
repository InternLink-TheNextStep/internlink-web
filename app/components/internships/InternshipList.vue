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
      />
    </div>
    <div v-else class="text-center text-gray-500 mt-20">
      No internships found matching “{{ query }}”.
    </div>
  </div>
</template>

<script setup>
import InternshipCard from './InternshipCard.vue'

defineProps({
  internships: Array,
  query: String
})
</script>
