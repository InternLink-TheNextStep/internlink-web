<template>
  <div>
    <div class="prose max-w-none" v-html="internship.description"></div>

    <div class="mt-8 flex gap-4">
      <!-- Apply Button -->
      <button
        v-if="userStore.isLoggedIn && !hasAlreadyApplied"
        @click="openApplyModal"
        :disabled="checkingStatus"
        class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="checkingStatus">Checking...</span>
        <span v-else>Apply Now</span>
      </button>

      <!-- Already Applied Badge -->
      <div
        v-else-if="userStore.isLoggedIn && hasAlreadyApplied"
        class="bg-green-100 text-green-700 px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2"
      >
        <Icon name="mdi:check-circle" class="w-5 h-5" />
        Already Applied
      </div>

      <!-- Login to Apply -->
      <NuxtLink
        v-else
        to="/login"
        class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block"
      >
        Login to Apply
      </NuxtLink>
    </div>

    <!-- Apply Modal -->
    <ApplyModal
      :is-open="isApplyModalOpen"
      :internship-id="internship.id"
      :internship-title="internship.title"
      :has-c-v="hasCV"
      @close="closeApplyModal"
      @success="handleApplicationSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import ApplyModal from "~/components/ApplyModal.vue";
import { checkAlreadyApplied, checkUserHasCV } from "~/services/application-service";

const props = defineProps({
  internship: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();

const isApplyModalOpen = ref(false);
const hasCV = ref(false);
const hasAlreadyApplied = ref(false);
const checkingStatus = ref(false);

// Check if user has CV and if already applied
const checkApplicationStatus = async () => {
  if (!userStore.isLoggedIn || !props.internship?.id) return;

  checkingStatus.value = true;

  try {
    const [cvStatus, appliedStatus] = await Promise.all([
      checkUserHasCV(),
      checkAlreadyApplied(props.internship.id),
    ]);

    hasCV.value = cvStatus.has_cv;
    hasAlreadyApplied.value = appliedStatus;
  } catch (error) {
    console.error("Failed to check application status:", error);
  } finally {
    checkingStatus.value = false;
  }
};

const openApplyModal = () => {
  isApplyModalOpen.value = true;
};

const closeApplyModal = () => {
  isApplyModalOpen.value = false;
};

const handleApplicationSuccess = () => {
  hasAlreadyApplied.value = true;
};

// Check status when component mounts or user logs in
watch(
  () => userStore.isLoggedIn,
  async (isLoggedIn) => {
    if (isLoggedIn) {
      await checkApplicationStatus();
    }
  },
  { immediate: true }
);

// Re-check when internship changes
watch(
  () => props.internship?.id,
  async () => {
    if (userStore.isLoggedIn) {
      await checkApplicationStatus();
    }
  }
);
</script>
