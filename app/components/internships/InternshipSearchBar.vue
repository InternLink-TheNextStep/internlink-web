<template>
  <div class="relative mb-6">
    <input
      v-model="model"
      type="text"
      placeholder="Search for internships"
      class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="absolute left-3 top-3 w-5 h-5 text-gray-400"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
      />
    </svg>
  </div>
</template>

<script setup>
const model = defineModel() // shorthand for v-model binding in parent
</script>
