<template>
  <section class="min-h-screen bg-gray-50 pb-16">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Find your dream internship</h1>
      <p class="text-gray-500 mt-2 mb-4">
        Explore opportunities from leading companies in Cambodia.
      </p>

      <!-- 🔍 Search Component -->
      <InternshipSearchBar v-model="searchQuery" />

      <!-- 🔽 Filters Component -->
      <InternshipFilters v-model="filters" />

      <!-- 🧩 Internship List -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Featured Internships</h2>
      <InternshipList :internships="filteredInternships" :query="searchQuery" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { internships } from '@/data/internships'
import InternshipSearchBar from '~/components/internships/InternshipSearchBar.vue'
import InternshipFilters from '~/components/internships/InternshipFilters.vue'
import InternshipList from '~/components/internships/InternshipList.vue'

definePageMeta({
  layout: 'base'
})

const searchQuery = ref('')
const filters = ref({
  industry: '',
  location: '',
  duration: '',
  skills: ''
})

// Computed filtering logic
const filteredInternships = computed(() =>
  internships.filter((intern) => {
    const query = searchQuery.value.toLowerCase()
    const matchesSearch =
      intern.title.toLowerCase().includes(query) ||
      intern.description.toLowerCase().includes(query) ||
      intern.category.toLowerCase().includes(query) ||
      intern.company.name.toLowerCase().includes(query)

    const matchesIndustry =
      !filters.value.industry || intern.category === filters.value.industry
    const matchesLocation =
      !filters.value.location ||
      intern.company.location.toLowerCase().includes(filters.value.location.toLowerCase())

    return matchesSearch && matchesIndustry && matchesLocation
  })
)
</script>
