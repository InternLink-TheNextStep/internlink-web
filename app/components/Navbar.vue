<template>
  <nav
    class="flex justify-between items-center border-b border-gray-300 h-[80px] sticky top-0 bg-white z-50 px-4 md:px-0">
    <!-- Logo -->
    <p class="font-bold text-[#1294D4] text-[24px] md:ml-[40px]">
      InternLink
    </p>

    <!-- Desktop Menu -->
    <div  class="hidden md:flex mr-auto ml-[64px]">
      <NuxtLink to="/" class="text-[16px] mr-[30px]" :class="activeLinkClass('/')">Home</NuxtLink>
      <NuxtLink to="/internships" class="text-[16px] mr-[22px] " :class="activeLinkClass('/internships')">Explore</NuxtLink>
      <NuxtLink to="/applications" class="text-[16px] mr-[22px]" :class="activeLinkClass('/applications')">My applications</NuxtLink>
      <NuxtLink to="/" class="text-[16px] mr-[22px] ">Saved</NuxtLink>
    </div>

    <!-- Desktop Auth Buttons -->
     <!-- if logged in  -->
     <div v-if="isLoggedin" class="flex items-center mr-[40px]">
       <NuxtLink to="/" class="text-[16px] mr-[22px]">About us</NuxtLink>
         <div class="bg-gray-200 w-[40px] h-[40px] flex justify-center items-center mr-[16px] cursor-pointer  rounded-[8px] ">
          <Icon name="mdi:bell-outline" class="w-[20px] h-[20px]"/>
         </div> 

        <div class="w-[40px] h-[40px] rounded-full cursor-pointer overflow-hidden">
  <img src="/assets/images/profile.jpeg" alt="avatar" class="w-full h-full object-cover" />
</div>



     </div>
     <!-- if not logged in -->
    <div v-else class="hidden md:flex items-center">
      <NuxtLink to="/" class="text-[16px] mr-[22px]">About us</NuxtLink>
      <NuxtLink to="/signup">

        <button
          class="w-[85px] h-[40px] bg-[#617AFA] rounded-[8px] text-white text-[14px] font-bold mr-[8px] hover:bg-[#4C64E6]">
          Sign up
        </button>
      </NuxtLink>
      <NuxtLink to="/login">

        <button
          class="w-[85px] h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold mr-[40px] hover:bg-[#D4D9ED]">
          Log in
        </button>
      </NuxtLink>
    </div>

    <!-- Mobile Burger Menu Button -->
    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2" aria-label="Toggle menu">
      <Icon v-if="!isMenuOpen" name="mdi:menu" class="w-6 h-6" />
      <Icon v-else name="mdi:close" class="w-6 h-6" />
    </button>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen"
      class="absolute top-[80px] left-0 w-full bg-white border-b border-gray-300 md:hidden shadow-lg">
      <div class="flex flex-col ml-1">
        <NuxtLink to="/" class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200">Home</NuxtLink>
        <NuxtLink to="/internships" class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200">Explore</NuxtLink>
        <NuxtLink to="/applications" class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200">My applications
        </NuxtLink>
        <NuxtLink to="/" class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200">Saved</NuxtLink>
        <NuxtLink to="/" class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200">About us</NuxtLink>

        <div class="flex flex-col gap-3 mt-4">
          <button
            class="w-full h-[40px] bg-[#617AFA] rounded-[8px] text-white text-[14px] font-bold hover:bg-[#4C64E6]">
            Sign up
          </button>
          <button
            class="w-full h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold hover:bg-[#D4D9ED]">
            Log in
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isMenuOpen = ref(false)
const currentPath = useRoute();
const isLoggedin = true;
// Close menu when route changes
watch(() => useRoute().path, () => {

  isMenuOpen.value = false;
})
const activeLinkClass = ((path) => {
  return currentPath.path === path ? 'text-[#1294D4]' : ''
})
</script>