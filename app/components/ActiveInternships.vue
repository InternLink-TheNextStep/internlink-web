<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">Active Internships</h3>
    <div class="space-y-6">
      <div
        v-for="(job, i) in internships"
        :key="i"
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
      >
        <div class="flex-1">
          <h4 class="text-md font-semibold text-gray-800 mb-1">{{ job.title }}</h4>
          <p class="text-sm text-gray-500 mb-3">
            {{ job.company.name }} • {{ job.company.location }}
          </p>
          <NuxtLink
            :to="`/internships/${job.id}`"
            class="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            View Details
          </NuxtLink>
        </div>
        <img
          :src="job.image"
          alt="Internship"
          class="w-full sm:w-48 h-32 object-cover rounded-lg mt-4 sm:mt-0 sm:ml-6"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ internships: Array })
</script>
