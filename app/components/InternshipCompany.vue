<template>
  <div>
    <!-- Company info -->
    <div class="flex items-start gap-4 mb-6">
      <img
        v-if="internship?.company?.logo_path"
        :src="getSpaceFileUrl(internship.company.logo_path)"
        alt="Company"
        class="w-28 h-28 rounded-lg object-cover"
      />

      <div v-else class="w-28 h-28 rounded-lg object-cover skeleton"></div>

      <div>
        <h2 class="text-lg font-semibold">
          {{ internship?.company?.name || "N/A" }}
        </h2>
        <p class="text-gray-600 text-sm mb-1">
          {{ internship?.company?.description || "No description available" }}
        </p>
      </div>
    </div>

    <h3 class="text-lg font-semibold mb-3">Contact</h3>
    <div class="border-t border-gray-200 pt-4 mt-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <!-- Website -->
        <div class="flex flex-col">
          <p class="font-semibold text-gray-900">Website</p>
          <a
            v-if="internship?.company?.website"
            :href="`https://${internship.company.website}`"
            target="_blank"
            class="text-blue-600 hover:underline"
          >
            {{ internship.company.website }}
          </a>
          <span v-else>None</span>
        </div>

        <!-- Email -->
        <div class="flex flex-col">
          <p class="font-semibold text-gray-900">Email</p>
          <a
            v-if="internship?.company?.notifications_email"
            :href="`mailto:${internship.company.notifications_email}`"
            class="text-blue-600 hover:underline"
          >
            {{ internship.company.notifications_email }}
          </a>
          <span v-else>None</span>
        </div>

        <!-- Phone
        <div class="flex flex-col">
          <p class="font-semibold text-gray-900">Phone</p>
          <p>{{ internship?.company?.phone || "None" }}</p>
        </div> -->

        <!-- Location -->
        <div class="flex flex-col">
          <p class="font-semibold text-gray-900">Location Address</p>
          <p>
            {{
              internship?.company?.place?.name
                ? internship.company.place.name + " ,"
                : ""
            }}
            {{ internship?.company?.place?.formatted_address || "None" }}
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="
        internship?.company?.place?.lat != null &&
        internship?.company?.place?.lon != null
      "
    >
      <Map
        :lat="internship.company.place.lat"
        :lon="internship.company.place.lon"
      />
    </div>

    <!-- <ActiveInternships class="mt-10" :internships="activeInternships" /> -->
  </div>
</template>

<script setup lang="ts">
import Map from "./Map.vue";
import type { Internship } from "~/core/types/internship";
import ActiveInternships from "./ActiveInternships.vue";

const { internship, activeInternships } = defineProps<{
  internship: Internship;
  activeInternships: Internship[];
}>();
</script>
