<template>
  <div>
    <h2 class="text-xl font-semibold mb-3">About the Internship</h2>
    <p class="text-gray-700 leading-relaxed mb-6">{{ internship.description }}</p>

    <SectionList title="Responsibilities" :items="internship.responsibilities" />
    <SectionList title="Requirements" :items="internship.requirements" />
    <SectionList title="Benefits" :items="internship.benefits" />

    <button
      class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
    >
      Apply Now
    </button>
  </div>
</template>

<script setup>
import SectionList from './SectionList.vue'
defineProps({ internship: Object })
</script>
