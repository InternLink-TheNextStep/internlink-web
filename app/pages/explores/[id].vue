<template>
<section class="min-h-screen bg-white pb-20">
    <!-- <div class="max-w-5xl mx-auto px-6 pt-16">
      <NuxtLink to="/explore" class="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Explore
      </NuxtLink>
    </div> -->

    <section class="min-h-screen bg-white pb-20">
    <div class="max-w-5xl mx-auto px-6 pt-16">
      <NuxtLink to="/explore" class="text-blue-600 hover:underline text-sm mb-6 inline-block">
        ← Back to Explore
      </NuxtLink>

      <!-- Check if internship found -->
      <div v-if="internship">
        <h1 class="text-3xl font-bold text-gray-900 mb-3">{{ internship.title }}</h1>
        <p class="text-gray-600 mb-6">{{ internship.category }} Internship</p>

        <img
          :src="internship.image"
          alt="Internship image"
          class="w-full h-64 object-cover rounded-xl mb-8"
        />

        <h2 class="text-xl font-semibold mb-3">About this Internship</h2>
        <p class="text-gray-700 leading-relaxed mb-6">
          {{ internship.description }}
        </p>

        <h3 class="text-lg font-semibold mb-2">Responsibilities</h3>
        <ul class="list-disc list-inside text-gray-600 mb-6">
          <li v-for="(item, i) in internship.responsibilities" :key="i">{{ item }}</li>
        </ul>

        <h3 class="text-lg font-semibold mb-2">Requirements</h3>
        <ul class="list-disc list-inside text-gray-600 mb-6">
          <li v-for="(req, i) in internship.requirements" :key="i">{{ req }}</li>
        </ul>

        <h3 class="text-lg font-semibold mb-2">Benefits</h3>
        <ul class="list-disc list-inside text-gray-600 mb-10">
          <li v-for="(benefit, i) in internship.benefits" :key="i">{{ benefit }}</li>
        </ul>

        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Apply Now
        </button>
      </div>

      <!-- If not found -->
      <div v-else>
        <p class="text-gray-500">Internship not found.</p>
      </div>
    </div>
  </section>
</section>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Nuxt layout
definePageMeta({
  layout: 'base'
})

// Get the route parameter (e.g., /internships/1)
const route = useRoute()

// Static internship data for now (temporary until DB is connected)
const internships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    category: 'Technology',
    description:
      'Develop and maintain software applications, collaborate with senior engineers, and participate in code reviews.',
    image: new URL('~/assets/images/SEI.jpg', import.meta.url).href,
    responsibilities: [
      'Write clean, efficient, and maintainable code.',
      'Assist in debugging and testing web applications.',
      'Collaborate with team members using Git and Agile practices.'
    ],
    requirements: [
      'Familiar with HTML, CSS, and JavaScript.',
      'Basic understanding of frameworks like Vue.js or React.',
      'Eager to learn and improve coding skills.'
    ],
    benefits: [
      'Real project experience with senior developers.',
      'Flexible working hours.',
      'Certificate upon completion.'
    ]
  },
  {
    id: 2,
    title: 'Financial Analyst Intern',
    category: 'Finance',
    description:
      'Assist in financial modeling, data analysis, and reporting, supporting investment decisions and financial planning.',
    image: new URL('~/assets/images/FAI.jpg', import.meta.url).href,
    responsibilities: [
      'Analyze financial statements and prepare reports.',
      'Assist in market research and data interpretation.',
      'Support senior analysts with forecasting models.'
    ],
    requirements: [
      'Currently studying Finance or Accounting.',
      'Proficient in Microsoft Excel.',
      'Strong analytical and numerical skills.'
    ],
    benefits: [
      'Hands-on experience with real financial data.',
      'Mentorship from experienced financial professionals.',
      'Opportunity for full-time offer upon graduation.'
    ]
  }
]

// Find internship based on the id from URL
const internship = internships.find(
  (item) => item.id === Number(route.params.id)
)
</script>