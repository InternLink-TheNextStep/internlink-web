<template>
  <div class="px-4 md:px-24 lg:px-[160px] mx-auto mt-8 flex flex-col">
    <div class="w-full mx-auto">
      <h1 class="text-3xl md:text-[34px] font-black mb-[25px]">
        Welcome back, {{ userStore.user?.first_name }} {{ userStore.user?.last_name }}!
      </h1>
      <p class="font-bold text-lg md:text-[22px] mb-[15px]">
        Recommended for you
      </p>

      <!-- Loading state -->
      <div v-if="loadingRecommendations" class="flex justify-start gap-4 md:gap-[20px] mb-[20px] pb-2 overflow-x-auto scrollbar-hide">
        <div v-for="i in 5" :key="i" class="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] rounded-lg p-3 sm:p-4 bg-gray-100 animate-pulse">
          <div class="w-full h-24 sm:h-28 md:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3"></div>
          <div class="h-4 bg-gray-300 rounded mb-2"></div>
          <div class="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      <!-- No CV uploaded - prompt to upload -->
      <div v-else-if="!hasCV" class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-[20px]">
        <div class="flex items-start gap-4">
          <svg class="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div class="flex-1">
            <h3 class="font-bold text-lg mb-2">Get Personalized Recommendations</h3>
            <p class="text-gray-700 mb-4">Upload your CV to receive internship recommendations tailored to your skills and experience.</p>
            <label class="btn btn-primary cursor-pointer">
              <input type="file" accept=".pdf,.doc,.docx" class="hidden" @change="handleCVUpload" :disabled="uploadingCV" />
              <span v-if="!uploadingCV">Upload CV</span>
              <span v-else class="flex items-center gap-2">
                <span class="loading loading-spinner loading-sm"></span>
                Uploading...
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- No recommendations found -->
      <div v-else-if="recommendations.length === 0" class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-[20px]">
        <p class="text-gray-600">No recommendations found based on your skills. Try updating your CV or explore all internships.</p>
        <nuxt-link to="/internships" class="btn btn-primary mt-4">
          Browse All Internships
        </nuxt-link>
      </div>

      <!-- Recommendations list -->
      <div v-else class="flex justify-start gap-4 md:gap-[20px] mb-[20px] pb-2 overflow-x-auto scrollbar-hide">
        <nuxt-link 
          v-for="internship in recommendations"
          :key="internship.id"
          :to="`/internships/${internship.slug}`"
          class="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow border border-gray-200"
        >
          <div class="w-full h-24 sm:h-28 md:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md mb-2 sm:mb-3 flex items-center justify-center">
            <span class="text-3xl">💼</span>
          </div>
          <p class="text-[16px] font-medium line-clamp-2">{{ internship.title }}</p>
          <p class="text-[#4D8099] text-[14px]">{{ internship.company?.name || 'Company' }}</p>
          <div v-if="internship.match_count" class="mt-2 text-xs text-green-600 font-medium">
            ✓ {{ internship.match_count }} skill{{ internship.match_count > 1 ? 's' : '' }} match
          </div>
        </nuxt-link>
      </div>

      <div class="flex flex-col">
        <p class="font-bold text-lg md:text-[22px] leading-[28px] mb-[15px]">
          My Applications
        </p>
        <div
          class="flex justify-start items-center gap-4 sm:gap-6 md:gap-[32px] py-3 sm:py-4 md:py-[15px] pl-2 sm:pl-3 md:pl-[16px] border-b relative mb-3 sm:mb-4 md:mb-[15px]"
        >
          <div class="flex flex-col items-center relative" ref="appliedTab">
            <button
              @click="activeTab = 'applied'"
              :class="activeTab == 'applied' ? 'text-[#1294D4]' : 'text-black'"
            >
              Applied
            </button>
          </div>
          <div
            class="flex flex-col items-center relative"
            ref="interviewingTab"
          >
            <button
              @click="activeTab = 'interviewing'"
              :class="
                activeTab == 'interviewing' ? 'text-[#1294D4]' : 'text-black'
              "
            >
              Interviewing
            </button>
          </div>
          <div class="flex flex-col items-center relative" ref="offerTab">
            <button
              @click="activeTab = 'offer'"
              :class="activeTab == 'offer' ? 'text-[#1294D4]' : 'text-black'"
            >
              Offer
            </button>
          </div>
          <div
            class="absolute bottom-0 h-[3px] bg-[#1294D4] rounded-[3px] duration-300 ease-out"
            :style="{
              width: indicatorWidth + 'px',
              left: indicatorLeft + 'px',
            }"
          />
        </div>

        <ApplicationsAppliedTab v-if="activeTab == 'applied'" />
        <ApplicationsInterviewing v-if="activeTab == 'interviewing'" />
        <ApplicationsOffer v-if="activeTab == 'offer'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getRecommendedInternships } from "~/services/internship-service";
import { getUserProfileDetails, uploadCVWithSkills } from "~/services/user-service";
import { useUserStore } from "~/stores/useUserStore";

const activeTab = ref("applied");
const appliedTab = ref(null);
const interviewingTab = ref(null);
const offerTab = ref(null);
const indicatorWidth = ref(0);
const indicatorLeft = ref(0);

const recommendations = ref([]);
const loadingRecommendations = ref(true);
const hasCV = ref(false);
const uploadingCV = ref(false);

const updateIndicator = () => {
  let targetTab = null;
  if (activeTab.value === "applied") {
    targetTab = appliedTab.value;
  } else if (activeTab.value === "interviewing") {
    targetTab = interviewingTab.value;
  } else if (activeTab.value === "offer") {
    targetTab = offerTab.value;
  }

  if (targetTab) {
    indicatorWidth.value = targetTab.offsetWidth;
    indicatorLeft.value = targetTab.offsetLeft;
  }
};

definePageMeta({
  layout: "base",
  middleware: ['auth-user'],
});

// Fetch recommendations on mount
const fetchRecommendations = async () => {
  loadingRecommendations.value = true;
  try {
    // Check if user has CV
    const profile = await getUserProfileDetails();
    hasCV.value = !!profile.cv_url;

    if (hasCV.value) {
      // Fetch recommendations
      const data = await getRecommendedInternships();
      recommendations.value = data;
    }
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    hasCV.value = false;
  } finally {
    loadingRecommendations.value = false;
  }
};

// Handle CV upload
const handleCVUpload = async (event) => {
  const target = event.target;
  const file = target.files?.[0];
  
  if (!file) return;

  // Validate file type
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload a PDF or DOC file');
    return;
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB');
    return;
  }

  uploadingCV.value = true;
  try {
    await uploadCVWithSkills(file);
    // Refresh recommendations after successful upload
    await fetchRecommendations();
    alert('CV uploaded successfully! Your recommendations are ready.');
  } catch (error) {
    console.error("Failed to upload CV:", error);
    alert(error?.data?.message || 'Failed to upload CV. Please try again.');
  } finally {
    uploadingCV.value = false;
    // Reset file input
    target.value = '';
  }
};

watch(activeTab, () => {
  nextTick(() => {
    updateIndicator();
  });
});

onMounted(() => {
  updateIndicator();
  fetchRecommendations();
});

const userStore = useUserStore();
</script>
