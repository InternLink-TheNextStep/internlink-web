<template>
  <nav
    class="flex justify-between items-center border-b border-gray-300 h-[60px] sticky"
  >
    <p class="font-bold text-[#1294D4] text-[24px] mr-[64px] ml-[40px]">
      InternLink
    </p>
    <div class="mr-auto">
      <NuxtLink to="/" class="text-[14px] mr-[30px]">Home</NuxtLink>
      <NuxtLink to="/" class="text-[14px] mr-[22px]">Explore</NuxtLink>
      <NuxtLink to="/" class="text-[14px] mr-[22px]">My applications</NuxtLink>
      <NuxtLink to="/" class="text-[14px] mr-[22px]">Saved</NuxtLink>
    </div>

    <div>
      <NuxtLink to="/" class="text-[14px] mr-[22px]">About us</NuxtLink>
      <button
        class="w-[85px] h-[40px] bg-[#617AFA] rounded-[8px] text-white text-[14px] font-bold mr-[8px]"
      >
        Sign in
      </button>
      <button
        class="w-[85px] h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold mr-[40px]"
      >
        Log in
      </button>
    </div>
  </nav>
</template>
