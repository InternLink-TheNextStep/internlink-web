<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
  >
    <!-- Left -->
    <div class="flex-1">
      <p class="text-sm text-blue-600 font-semibold mb-1">{{ category }}</p>
      <h3 class="text-lg font-bold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ description }}</p>
      <NuxtLink
        :to="`/internships/${id}`"
        class="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        View Details
      </NuxtLink>
    </div>

    <!-- Right -->
    <img
      :src="image"
      alt="Internship image"
      class="w-full sm:w-48 h-32 object-cover rounded-xl mt-4 sm:mt-0 sm:ml-6"
    />
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  category: String,
  title: String,
  description: String,
  image: String
})
</script>
