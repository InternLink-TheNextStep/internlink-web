<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="store.loading || !currentInternship" class="space-y-4">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-28 h-28 rounded-lg skeleton"></div>
        <div class="flex-1 space-y-2">
          <div class="h-5 w-32 rounded skeleton"></div>
          <div class="h-3 w-48 rounded skeleton"></div>
        </div>
      </div>
      <div class="space-y-2">
        <div class="h-5 w-24 rounded skeleton"></div>
        <div class="h-3 w-full rounded skeleton"></div>
        <div class="h-3 w-full rounded skeleton"></div>
      </div>
      <div class="h-64 rounded skeleton mt-4"></div>
    </div>

    <!-- Company info -->
    <div v-else>
      <div class="flex items-start gap-4 mb-6">
        <img
          v-if="currentInternship.company?.logo_path"
          :src="getSpaceFileUrl(currentInternship.company.logo_path)"
          alt="Company"
          class="w-28 h-28 rounded-lg object-cover"
        />
        <div v-else class="w-28 h-28 rounded-lg skeleton"></div>

        <div>
          <h2 class="text-lg font-semibold">
            {{ currentInternship.company?.name || "N/A" }}
          </h2>
          <p class="text-gray-600 text-sm mb-1">
            {{
              currentInternship.company?.description ||
              "No description available"
            }}
          </p>
        </div>
      </div>

      <!-- Contact Info -->
      <h3 class="text-lg font-semibold mb-3">Contact</h3>
      <div class="border-t border-gray-200 pt-4 mt-2">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700"
        >
          <!-- Website -->
          <div class="flex flex-col">
            <p class="font-semibold text-gray-900">Website</p>
            <a
              v-if="currentInternship.company?.website"
              :href="`https://${currentInternship.company.website}`"
              target="_blank"
              class="text-blue-600 hover:underline"
            >
              {{ currentInternship.company.website }}
            </a>
            <span v-else>None</span>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <p class="font-semibold text-gray-900">Email</p>
            <a
              v-if="currentInternship.company?.notification_email"
              :href="`mailto:${currentInternship.company.notification_email}`"
              class="text-blue-600 hover:underline"
            >
              {{ currentInternship.company.notification_email }}
            </a>
            <span v-else>None</span>
          </div>

          <!-- Location -->
          <div class="flex flex-col">
            <p class="font-semibold text-gray-900">Location Address</p>
            <p v-if="currentInternship.company?.place">
              {{
                currentInternship.company.place.name
                  ? currentInternship.company.place.name + ","
                  : ""
              }}
              {{ currentInternship.company.place.formatted_address || "None" }}
            </p>
            <span v-else>None</span>
          </div>
        </div>
      </div>

      <!-- Map -->
      <Map v-if="lat && lon" :lat="lat" :lon="lon" class="mt-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "./Map.vue";

const store = useInternshipStore();
const currentInternship = computed(() => store.currentInternship);


const lat = computed(() =>
  currentInternship.value?.company?.place?.lat != null
    ? Number(currentInternship.value.company.place.lat)
    : null
);
const lon = computed(() =>
  currentInternship.value?.company?.place?.lon != null
    ? Number(currentInternship.value.company.place.lon)
    : null
);
</script>
