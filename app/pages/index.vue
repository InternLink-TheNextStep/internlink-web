<template>
  <div class="container mx-auto flex flex-col">

    <div
      class="bg-[url(/assets/images/cambridge.jpeg)] w-full md:w-[90%] lg:w-[80%] h-[300px] md:h-[400px] lg:h-[480px] rounded-[8px] bg-cover relative mt-[20px] mx-auto flex flex-col justify-start items-center">
      <div class="w-[90%] md:w-[700px] lg:w-[896px] h-auto text-center top-[70px] md:top-[90px] lg:top-[116px] absolute tracking-[-2px] leading-[40px] md:leading-[50px] lg:leading-[60px] mb-[8px]">
        <p class="text-[28px] md:text-[38px] lg:text-[48px] font-black text-white">Connect with Top Talent and Exciting Opportunities</p>
      </div>
      <div class="w-[90%] md:w-[700px] lg:w-[896px] h-auto leading-[20px] md:leading-[22px] lg:leading-[24px] top-[170px] md:top-[210px] lg:top-[270px] absolute text-center">
        <p class="text-white  ">InternLink bridges the gap between Cambodian university students and
          companies, offering a seamless platform for internships and talent acquisition.</p>
      </div>
    
    </div>

    <div class="w-full md:w-[90%] lg:w-[80%] h-[448px] flex-col items-start mx-auto mt-[40px] mb-[0]">
      <p class="text-[24px] md:text-[36px] font-black tracking-[-1px] md:tracking-[-2px] md:leading-[45px]">For Students</p>
      <p class="text-[14px] md:text-[16px] leading-[24px] font-light mb-[40px]">Unlock your potential with InternLink. Find the perfect
        internship, track your applications, and gain valuable experience.</p>
      <div class="flex justify-start flex-wrap gap-[40px]">

        <FeatureCard v-for="feature in studentFeatures" :key="feature.title" :icon="feature.icon"
          :description="feature.description" :title="feature.title" />
      </div>

    </div>
   
  </div>
</template>

<script setup>
definePageMeta({
  layout: "base",
});

const studentFeatures = [
  {
    icon: 'mdi:magnify',
    title: 'Find Your Ideal Internship',
    description: 'Browse a wide range of verified internship opportunities across various industries in Cambodia.'
  },
  {
    icon: 'mdi:file-document-outline',
    title: 'Streamline Your Applications',
    description: 'Easily manage and track your internship applications in one convenient place.'
  },
  {
    icon: 'mdi:account-group',
    title: 'Connect with Leading Companies',
    description: 'Network with top companies and professionals in your field of interest.'
  },
  {
    icon: 'mdi:clock',
    title: 'Gain Real-World Experience',
    description: 'Gain practical skills and knowledge through hands-on experience in a professional setting.'
  }
];



</script>
