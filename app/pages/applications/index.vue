<template>
  <section class="min-h-screen pb-16">
    <div
      v-if="userStore.loading"
      class="flex justify-center items-center h-[80vh]"
    >
      <p>Loading...</p>
    </div>

    <div
      class="px-4 md:px-24 lg:px-[160px] mx-auto mt-8 flex flex-col"
      v-else-if="userStore.isLoggedIn"
    >
      <h1 class="font-bold text-[24px] md:text-[32px] mb-4">My Applications</h1>

      <!-- Search -->
      <div
        class="flex justify-start items-center rounded-[8px] border h-[48px] w-full max-w-[928px] px-[16px]"
      >
        <Icon
          name="mdi:magnify"
          style="color: #4d8099"
          class="w-[24px] h-[24px] mr-[8px]"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Search applications"
          class="flex-1 outline-none border-none text-[#4D8099] placeholder-[#4D8099] bg-transparent text-base"
        />
      </div>

      <!-- Filters -->
      <div class="flex mt-6 w-[300px] text-sm gap-3 mb-5">
        <select class="select" v-model="statusFilter">
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select class="select" v-model="dateSort">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <!-- Loading Applications -->
      <div v-if="applicationStore.loading" class="text-center py-8">
        <p>Loading applications...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="applicationStore.error"
        class="text-center py-8 text-red-600"
      >
        <p>{{ applicationStore.error.message }}</p>
        <button
          @click="applicationStore.fetchApplications(true)"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>

      <!-- No Results -->
      <div
        v-else-if="filteredApplications.length === 0"
        class="text-center py-8"
      >
        <p>No applications match your search.</p>
      </div>

      <!-- Applications List -->
      <div v-else>
        <ApplicationCard
          v-for="app in filteredApplications"
          :key="app.applicationId"
          :title="app.title"
          :applied_date="app.appliedDate"
          :company="app.companyName"
          :image="app.file"
          :slug="app.slug"
        />
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-[80vh]">
      <p>Redirecting to login...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "~/stores/useUserStore";
import { useApplicationStore } from "~/stores/userApplicationStore";

const userStore = useUserStore();
const applicationStore = useApplicationStore();

const search = ref("");
const statusFilter = ref<"all" | string>("all");
const dateSort = ref<"newest" | "oldest">("newest");

onMounted(async () => {
  try {
    await applicationStore.fetchApplications();
  } catch (e) {
    // swallow - store exposes error if needed
  }
});

const filteredApplications = computed(() => {
  const q = search.value.trim().toLowerCase();

  let list = applicationStore.applications.slice();

  // Filter by status
  if (statusFilter.value !== "all") {
    list = list.filter((a) => a.status === statusFilter.value);
  }

  // Filter by search query
  if (q) {
    list = list.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.companyName.toLowerCase().includes(q)
      );
    });
  }

  // Sort by date
  list.sort((a, b) => {
    const da = new Date(a.appliedDate).getTime();
    const db = new Date(b.appliedDate).getTime();
    return dateSort.value === "newest" ? db - da : da - db;
  });

  return list;
});

definePageMeta({
  layout: "base",
  middleware: ["auth-user"],
});
</script>

<style scoped>
.select {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  background-color: white;
  cursor: pointer;
}

.select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
