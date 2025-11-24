<template>
  <div>
    <!-- Company info -->
    <div class="flex items-start gap-4 mb-6">
      <img
        v-if="internship.company.image"
        :src="internship.company.image"
        alt="Company"
        class="w-28 h-28 rounded-lg object-cover"
      />

      <div v-else class="w-28 h-28 rounded-lg object-cover skeleton"></div>

      <div>
        <h2 class="text-lg font-semibold">
          {{ internship.company.name }}
        </h2>
        <p class="text-gray-600 text-sm mb-1">
          {{ internship.company.description }}
        </p>
        <p class="text-gray-500 text-sm">
          {{ internship.company.industry }} •
          {{ internship.company.location }} •
          <a
            v-if="internship.company.website"
            :href="`https://${internship.company.website}`"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            {{ internship.company.website || "None" }}
          </a>
          <span v-else>None</span>
        </p>
      </div>
    </div>

    <h3 class="text-lg font-semibold mb-3">About Us</h3>
    <p class="text-gray-700 leading-relaxed mb-6">
      {{ internship.company.about || "None" }}
    </p>

    <h3 class="text-lg font-semibold mb-3">Contact</h3>
    <div class="border-t border-gray-200 pt-4 mt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <div class="space-y-3">
          <div>
            <p class="font-semibold text-gray-900">Website</p>
            <a
              v-if="internship.company.website"
              :href="`https://${internship.company.website}`"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              {{ internship.company.website }}
            </a>
            <span v-else>None</span>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Phone</p>
            <p>{{ internship.company.phone || "None" }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <p class="font-semibold text-gray-900">Email</p>
            <a
              v-if="internship.company.notification_email"
              :href="`mailto:${internship.company.notification_email}`"
              class="text-blue-600 hover:underline"
            >
              {{ internship.company.notification_email }}
            </a>
            <span v-else>None</span>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Location</p>
            <p>{{ internship.company.location || "None" }}</p>
          </div>
        </div>
      </div>
    </div>

    <ActiveInternships class="mt-10" :internships="activeInternships" />
  </div>
</template>

<script setup>
import ActiveInternships from "./ActiveInternships.vue";
defineProps({
  internship: Object,
  activeInternships: Array,
});
</script>
