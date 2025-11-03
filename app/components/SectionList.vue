<template>
  <div class="mb-10">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="space-y-2">
      <label
        v-for="(item, i) in items"
        :key="i"
        class="flex items-start gap-2 text-gray-700"
      >
        <input
          type="checkbox"
          class="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span>{{ item }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
})
</script>
