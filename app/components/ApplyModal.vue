<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in"
    >
      <!-- Close button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <Icon name="mdi:close" class="w-6 h-6" />
      </button>

      <!-- No CV State -->
      <div v-if="!hasCV">
        <div class="text-center mb-6">
          <div
            class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="mdi:file-document-alert" class="w-8 h-8 text-orange-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">CV Required</h3>
          <p class="text-gray-600 text-sm">
            You need to upload your CV to your profile before applying to
            internships.
          </p>
        </div>

        <div class="space-y-3">
          <NuxtLink
            to="/profile"
            class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            @click="closeModal"
          >
            Go to Profile
          </NuxtLink>
          <button
            @click="closeModal"
            class="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Confirm Application State -->
      <div v-else-if="!isSubmitting && !isSuccess">
        <div class="text-center mb-6">
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Icon name="mdi:briefcase-check" class="w-8 h-8 text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">
            Apply to {{ internshipTitle }}
          </h3>
          <p class="text-gray-600 text-sm mb-4">
            You're about to apply with your existing CV from your profile.
          </p>

          <!-- CV Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="flex items-center justify-center gap-2 text-sm text-gray-700">
              <Icon name="mdi:file-document" class="w-5 h-5 text-blue-600" />
              <span class="font-medium">Your CV will be submitted</span>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <button
            @click="handleApply"
            class="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Confirm Application
          </button>
          <button
            @click="closeModal"
            class="block w-full bg-gray-100 text-gray-700 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="isSubmitting" class="text-center py-8">
        <div class="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
        <p class="text-gray-600">Submitting your application...</p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="text-center py-4">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="mdi:check-circle" class="w-10 h-10 text-green-600" />
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Application Submitted!
        </h3>
        <p class="text-gray-600 text-sm mb-6">
          Your application has been successfully submitted. Good luck!
        </p>
        <button
          @click="closeModal"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>

      <!-- Error State -->
      <div v-if="errorMessage" class="mt-4">
        <div class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-700 text-sm">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { applyToInternship } from "~/services/application-service";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  internshipId: {
    type: Number,
    required: true,
  },
  internshipTitle: {
    type: String,
    default: "this internship",
  },
  hasCV: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "success"]);

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref<string | null>(null);

const closeModal = () => {
  if (!isSubmitting.value) {
    emit("close");
    // Reset state after close animation
    setTimeout(() => {
      isSuccess.value = false;
      errorMessage.value = null;
    }, 300);
  }
};

const handleApply = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    await applyToInternship(props.internshipId);
    isSuccess.value = true;
    emit("success");
    
    // Auto close after 2 seconds
    setTimeout(() => {
      closeModal();
    }, 2000);
  } catch (error: any) {
    console.error("Failed to apply:", error);
    
    // Extract error message
    if (error?.data?.message) {
      errorMessage.value = error.data.message;
    } else if (error?.message) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Failed to submit application. Please try again.";
    }
  } finally {
    isSubmitting.value = false;
  }
};

// Close modal on Escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
