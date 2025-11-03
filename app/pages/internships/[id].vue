<template>
  <section class="min-h-screen bg-gray-50 pb-20">
    <div class="max-w-5xl mx-auto px-6 pt-16">
      <div v-if="internship">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ internship.title }}</h1>
        <p class="text-gray-600 mb-6">{{ internship.company.name }} • {{ internship.company.location }}</p>

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

        <InternshipOverview v-if="activeTab === 'Overview'" :internship="internship" />
        <InternshipCompany
          v-else-if="activeTab === 'About the company'"
          :internship="internship"
          :active-internships="activeInternships"
        />
        <div v-else-if="activeTab === 'Reviews'">
          <p class="text-gray-600 italic">No reviews yet — coming soon!</p>
        </div>
      </div>

      <div v-else class="text-center mt-20">
        <p class="text-gray-500 text-lg">Internship not found.</p>
        <NuxtLink to="/internships" class="text-blue-600 hover:underline text-sm mt-3 inline-block">
          ← Back to Internships
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { internships } from '@/data/internships'
import InternshipOverview from '~/components/InternshipOverview.vue'
import InternshipCompany from '~/components/InternshipCompany.vue'

definePageMeta({ layout: 'base' })

const route = useRoute()
const activeTab = ref('Overview')
const tabs = ['Overview', 'About the company', 'Reviews']

const internship = ref(null)
const activeInternships = ref([])

const loadInternship = (id) => {
  internship.value = internships.find((i) => i.id == id)
  activeInternships.value = internships.filter((i) => i.id != id)
}

loadInternship(route.params.id)
watch(() => route.params.id, (newId) => loadInternship(newId))
</script>
