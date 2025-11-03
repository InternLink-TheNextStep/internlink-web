<template>
  <div class="relative">
    <!-- Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-xl shadow-sm transition"
    >
      {{ label }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-4 h-4 text-gray-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-44 z-20"
    >
      <ul class="py-2">
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  options: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)

const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) isOpen.value = false
  })
})
</script>
