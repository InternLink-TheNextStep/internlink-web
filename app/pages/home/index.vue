<template>
  <div
    class="px-4 md:px-24 lg:px-[160px] mx-auto mt-8 flex flex-col min-h-screen "
  >
    <div class="w-full mx-auto">
      <h1 class="text-3xl md:text-[34px] font-black mb-[25px]">
        Welcome back,
        {{ userStore.user?.first_name + userStore.user?.last_name }}!
      </h1>
      <p class="font-bold text-lg md:text-[22px] mb-[15px]">
        Recommended for you
      </p>
      <div
        class="flex justify-start gap-4 md:gap-[20px] mb-[20px] pb-2 overflow-x-auto scrollbar-hide"
      >
        <RecommendCard
          v-for="job in jobs"
          :key="job.title"
          :title="job.title"
          :company="job.company"
        />
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
import { useUserStore } from "~/stores/useUserStore";

const activeTab = ref("applied");
const appliedTab = ref(null);
const interviewingTab = ref(null);
const offerTab = ref(null);
const indicatorWidth = ref(0);
const indicatorLeft = ref(0);

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
  middleware: ["auth-user"],
});

const jobs = [
  {
    title: "Web developer",
    company: "Book me plus",
  },
  {
    title: " Backend developer",
    company: "Code Clan",
  },
  {
    title: "Mobile developer",
    company: "Wing bank",
  },
  {
    title: "C# developer",
    company: "InternLink",
  },
  {
    title: "Project manager",
    company: "Jobify",
  },
];
watch(activeTab, () => {
  nextTick(() => {
    updateIndicator();
  });
});

onMounted(() => {
  updateIndicator();
});

const userStore = useUserStore();

console.log(userStore.user.first_name);
</script>
