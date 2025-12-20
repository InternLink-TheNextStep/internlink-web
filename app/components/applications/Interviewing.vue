<template>
  <div>
    <ApplicationCard
      v-for="app in interviewedApplications"
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

onMounted(async () => {
  await store.fetchApplications()
})

const interviewedApplications = computed(() => store.interviewed)
</script>
