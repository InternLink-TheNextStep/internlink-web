<template>
    <div class="px-4 md:px-24 lg:px-[160px] mx-auto mt-8 flex flex-col">
        <div class="w-full mx-auto">

            <h1 class="text-3xl md:text-[34px] font-black mb-[25px]">Welcome back, Lee sinh</h1>
            <p class="font-bold text-lg md:text-[22px] mb-[15px]">Recommended for you</p>
            <div class="flex justify-start gap-4 md:gap-[20px] mb-[20px] pb-2 overflow-x-auto scrollbar-hide">

                <RecommendCard v-for="job in jobs" :key="job.title" :title="job.title" :company="job.company"/>
               
            </div>
            <div class="flex flex-col ">
                <p class="font-bold text-lg md:text-[22px] leading-[28px] mb-[15px] ">My Applications</p>
                <div class="flex justify-start items-center gap-4 sm:gap-6 md:gap-[32px] py-3 sm:py-4 md:py-[15px] pl-2 sm:pl-3 md:pl-[16px] border-b relative mb-3 sm:mb-4 md:mb-[15px]">
                    <div class="flex flex-col items-center relative ">
                        <button @click="activeTab ='applied'" :class="activeTab =='applied'?'text-[#1294D4]':'text-black'">Applied</button>
                        <div class="absolute bottom-[-15px] w-full h-[3px] bg-gray-300 rounded-[3px] "></div>
                    </div>
                    <div class="flex flex-col items-center relative ">
                        <button @click="activeTab='interviewing'" :class="activeTab =='interviewing'?'text-[#1294D4]':'text-black'">Interviewing</button>
                        <div class="absolute bottom-[-15px] w-full h-[3px] bg-gray-300 rounded-[3px]"></div>
                    </div>
                    <div class="flex flex-col items-center relative ">
                        <button @click="activeTab='offer'" :class="activeTab =='offer'?'text-[#1294D4]':'text-black'">Offer</button>
                        <div class="absolute bottom-[-15px] w-full h-[3px] bg-gray-300 rounded-[3px]"></div>
                    </div>

                </div>

                <ApplicationsAppliedTab v-if="activeTab == 'applied'"/>
                <ApplicationsInterviewing v-if="activeTab == 'interviewing'"/>
                <ApplicationsOffer v-if="activeTab == 'offer'"/>
            </div>
        </div>

    </div>
</template>
<script setup>

const activeTab= ref('applied');

definePageMeta({
    layout: 'base',
})

const jobs = [
  {
    title: 'Web developer',
    company: 'Book me plus',
  },
  {
    title: ' Backend developer',
    company: 'Code Clan',
  },
  {
    title: 'Mobile developer',
    company: 'Wing bank',
  },
  {
    title: 'C# developer',
    company: 'InternLink',
  },
  {
    title: 'Project manager',
    company: 'Jobify',
  },


];
</script>