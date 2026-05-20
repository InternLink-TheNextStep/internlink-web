<template>
  <Navbar />
  <div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const { public: { chatbotEnabled, chatbotApiKey } } = useRuntimeConfig();

onMounted(() => {
  if (import.meta.client && chatbotEnabled && chatbotApiKey) {
    const script = document.createElement("script");
    script.src = `https://aicserchatbot.live/widget.js?apiKey=${chatbotApiKey}`;
    script.defer = true;

    document.body.appendChild(script);
  }
});
</script>

