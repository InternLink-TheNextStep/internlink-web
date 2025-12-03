<template>
  <div
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
  >
    <!-- Left -->
    <div class="flex-1">
      <p class="text-sm text-blue-600 font-semibold mb-1">Finance</p>
      <h3 class="text-lg font-bold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sit enim
        quibusdam aliquam fugiat explicabo qui, commodi quidem odio corrupti
        voluptate tenetur ipsam harum ipsa, similique dolor praesentium!
        Similique, tempora.
      </p>
      <NuxtLink
        :to="`/internships/${slug}`"
        class="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        View Details
      </NuxtLink>
    </div>

    <!-- Right -->
    <img
      v-if="file_path"
      :src="getSpaceFileUrl(file_path)"
      alt="Internship image"
      class="w-full sm:w-48 h-32 object-cover rounded-xl mt-4 sm:mt-0 sm:ml-6 skeleton"
    />

    <!-- Skeleton fallback if no image -->
    <div
      v-else
      class="w-full sm:w-48 h-32 rounded-xl mt-4 sm:mt-0 sm:ml-6 skeleton"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  id: Number,
  category: String,
  title: String,
  description: String,
  file_path: String,
  slug: String,
});
</script>
