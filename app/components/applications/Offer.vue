<template>
  <section class="flex flex-col gap-4">
    <!-- Skeleton (shown on first load / while fetching) -->
    <div v-if="isInitialLoad || store.loading" class="flex flex-col gap-4">
      <div v-for="n in 2" :key="n" class="flex gap-4 p-4 border rounded-lg">
        <div class="skeleton w-[70px] h-[70px] rounded-lg"></div>

        <div class="flex-1 space-y-2">
          <div class="skeleton h-4 w-2/3"></div>
          <div class="skeleton h-3 w-1/3"></div>
          <div class="skeleton h-3 w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Empty State (after first load only) -->
    <div
      v-else-if="hiredApplications.length === 0"
      class="text-center py-8 text-gray-500"
    >
      You haven’t received any offers yet.
      <br />
      Keep applying!
    </div>

    <!-- Applications List -->
    <div v-else class="flex flex-col gap-4">
      <ApplicationCard
        v-for="app in hiredApplications"
        :key="app.applicationId"
        :image="app.file"
        :title="app.title"
        :applied_date="app.appliedDate"
        :company="app.companyName"
        :slug="app.slug"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useApplicationStore } from "~/stores/userApplicationStore";

const store = useApplicationStore();
const isInitialLoad = ref(true);

onMounted(async () => {
  try {
    await store.fetchApplications();
  } finally {
    isInitialLoad.value = false;
  }
});

const hiredApplications = computed(() => store.hired);
</script>
