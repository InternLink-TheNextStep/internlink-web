<template>
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
</template>

<script setup>
import FilterDropdown from '~/components/FilterDropdown.vue'

const filters = defineModel() // allows parent to bind filters object via v-model
</script>
