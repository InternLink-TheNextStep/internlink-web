<template>
  <div>
    <div class="prose" v-html="internship.description"></div> 

    <button
      class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
    >
      Apply Now
    </button>
  </div>
</template>

<script setup>
defineProps({ internship: Object });
</script>
