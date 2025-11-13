<template>
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
        type="text"
        placeholder="Search applications"
        class="flex-1 outline-none border-none text-[#4D8099] placeholder-[#4D8099] bg-transparent text-base"
      />
    </div>

    <!-- Filters -->
    <div class="flex mt-6 w-[300px] text-sm gap-3 mb-5">
      <select class="select">
        <option disabled selected>Status</option>
        <option>Crimson</option>
        <option>Amber</option>
        <option>Velvet</option>
      </select>
      <select class="select">
        <option disabled selected>Date</option>
        <option>Crimson</option>
        <option>Amber</option>
        <option>Velvet</option>
      </select>
    </div>

    <!-- Applications -->
    <NuxtLink
      v-for="company in companies"
      :key="company.id"
      :to="`/internships/${company.id}`"
    >
      <ApplicationCard
        :title="company.title"
        :applied_date="company.applied_date"
        :company="company.company_name"
      />
    </NuxtLink>
  </div>

  <div v-else class="flex justify-center items-center h-[80vh]">
    <p>Redirecting to login...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useUserStore } from "#imports";
import { navigateTo } from "#app";

const userStore = useUserStore();

// If user is not logged in after initialization, redirect
watch(
  () => userStore.isLoggedIn,
  (loggedIn) => {
    if (!loggedIn && !userStore.loading) {
      navigateTo("/login");
    }
  },
  { immediate: true }
);

const companies = [
  {
    id: 1,
    title: "Marketing intern",
    applied_date: "Applied on 10/10/2024",
    company_name: "Book me plus",
  },
  {
    id: 2,
    title: "Full-stack engineering",
    applied_date: "Applied on 10/12/2020",
    company_name: "Netflix",
  },
  {
    id: 3,
    title: "Marketing intern",
    applied_date: "Applied on 1/10/2022",
    company_name: "Camob",
  },
  {
    id: 4,
    title: "Marketing intern",
    applied_date: "Applied on 1/10/2022",
    company_name: "Camob",
  },
  {
    id: 5,
    title: "Marketing intern",
    applied_date: "Applied on 1/10/2022",
    company_name: "Camob",
  },
];

definePageMeta({
  layout: "base",
});
</script>
