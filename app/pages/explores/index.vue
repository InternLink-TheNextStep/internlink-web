
<template>

  <section class="min-h-screen bg-gray-50 pb-16">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Find your dream internship</h1>
      <p class="text-gray-500 mt-2 mb-4">
        Explore opportunities from leading companies in Cambodia.
      </p>
      
      <!-- 🔽 Search -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for internships"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />      
  <!-- <img src="/assets/images/SEI.jpg" alt="avatar" class="w-full h-full object-cover" /> -->
      </div>

      <!-- 🔽 Dropdown Filter Bar -->
      <div class="flex flex-wrap gap-3 mb-10">
        <FilterDropdown
          label="Industry"
          v-model="filters.industry"
          :options="['Technology', 'Finance', 'Marketing', 'Design']"
        />
        <FilterDropdown
          label="Location"
          v-model="filters.location"
          :options="['Phnom Penh', 'Siem Reap', 'Battambang']"
        />
        <FilterDropdown
          label="Duration"
          v-model="filters.duration"
          :options="['1–3 months', '3–6 months', '6+ months']"
        />
        <FilterDropdown
          label="Skills"
          v-model="filters.skills"
          :options="['Frontend', 'Backend', 'Marketing', 'Design']"
        />
      </div>
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Featured Internships</h1>

      <section class="min-h-screen bg-gray-50 pb-16">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex flex-col gap-6">
        <InternshipCard
          v-for="intern in internships"
          :key="intern.id"
          :category="intern.category"
          :title="intern.title"
          :description="intern.description"
          :image="intern.image"
        />
      </div>
    </div>
  </section>
    </div>
  </section>
</template>




<script setup>
import { ref } from 'vue'
import FilterDropdown from '~/components/FilterDropdown.vue'
import InternshipCard from '~/components/InternshipCard.vue'
// NavBar
definePageMeta({
    layout: 'base',
})
// Search and filters
const searchQuery = ref('')
// Dropdown
const filters = ref({
  industry: '',
  location: '',
  duration: '',
  skills: ''})
  // Internship list
const internships = [
  {
    id: 1,
    category: 'Technology',
    title: 'Software Engineering Intern',
    description:
      'Develop and maintain software applications, collaborate with senior engineers, and participate in code reviews.',
     image: new URL('~/assets/images/SEI.jpg', import.meta.url).href
  },
  {
    id: 2,
    category: 'Finance',
    title: 'Financial Analyst Intern',
    description:
      'Assist in financial modeling, data analysis, and reporting, supporting investment decisions and financial planning.',
    image: new URL('~/assets/images/FAI.jpg', import.meta.url).href
  },
  {
    id: 3,
    category: 'Marketing',
    title: 'Marketing Intern',
    description:
      'Support marketing campaigns, conduct market research, and create content for social media and other platforms.',
    image: new URL('~/assets/images/MI.jpg', import.meta.url).href
  },
  {
    id: 4,
    category: 'Design',
    title: 'UX/UI Design Intern',
    description:
      'Contribute to user research, wireframing, prototyping, and visual design for digital products, enhancing user experience.',
    image: new URL('~/assets/images/UI.jpg', import.meta.url).href
  }
]
//view detail
</script>
