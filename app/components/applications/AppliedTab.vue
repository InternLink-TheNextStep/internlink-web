<template>
  <div>
    <ApplicationCard
      v-for="app in appliedApplications"
      :key="app.applicationId"
      :image="app.file"
      :title="app.title"
      :applied_date="app.appliedDate"
      :company="app.companyName"
      :slug="app.slug"
    />
  </div>
</template>

<script setup lang="ts">

const store = useApplicationStore()

// Fetch applications once when component mounts
onMounted(async () => {
  await store.fetchApplications()
})

// Computed: only show Applied / Pending apps
const appliedApplications = computed(() => store.pending) // or store.applied if you mapped differently
</script>
