<template>
  <div class="mt-6">
    <a
      :href="`https://www.google.com/maps?q=${latValue},${lonValue}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        :src="staticMapUrl"
        :width="width"
        :height="height"
        class="rounded-lg w-full cursor-pointer hover:opacity-90 transition"
      />
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  lat: {
    type: Number,
    required: true, // no default
  },
  lon: {
    type: Number,
    required: true, // no default
  },
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 120,
  },
});

const apiKey = useRuntimeConfig().public.googleMapsApiKey;

const latValue = computed(() => props.lat);
const lonValue = computed(() => props.lon);

const staticMapUrl = computed(() => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${latValue.value},${lonValue.value}&zoom=18&size=${props.width}x${props.height}&scale=2&markers=size:mid|color:red|${latValue.value},${lonValue.value}&key=${apiKey}`;
});
</script>
