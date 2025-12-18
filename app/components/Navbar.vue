<template>
  <nav
    class="flex justify-between items-center border-b border-gray-300 h-[80px] sticky top-0 bg-white z-50 px-4 lg:px-0"
  >
    <!-- Logo -->
    <NuxtLink
      :to="isLoggedin ? '/home' : '/'"
      class="font-bold text-primary text-[24px] lg:ml-[10px]"
    >
      InternLink
    </NuxtLink>

    <!-- Desktop Menu -->
    <div class="hidden lg:flex mr-auto ml-[50px]">
      <NuxtLink
        :to="isLoggedin ? '/home' : '/'"
        class="text-[16px] mr-[20px]"
        :class="activeLinkClass(isLoggedin ? '/home' : '/')"
        >Home</NuxtLink
      >
      <NuxtLink
        to="/internships"
        class="text-[16px] mr-[20px]"
        :class="activeLinkClass('/internships')"
        >Explore</NuxtLink
      >
      <NuxtLink
        to="/applications"
        class="text-[16px] mr-[20px]"
        :class="activeLinkClass('/applications')"
        >My applications</NuxtLink
      >
      <NuxtLink
        to="/saved"
        class="text-[16px] mr-[20px]"
        :class="activeLinkClass('/saved')"
        >Saved</NuxtLink
      >
      <NuxtLink
        to="/matching"
        class="text-[16px]"
        :class="activeLinkClass('/matching')"
        >Internship Matching</NuxtLink
      >
    </div>

    <!-- Desktop Auth Buttons -->
    <div class="flex items-center lg:mr-[40px] ml-auto mr-[10px]">
      <NuxtLink to="/" class="hidden lg:flex text-[16px] mr-[22px]"
        >About us</NuxtLink
      >

      <!-- Show profile avatar if logged in -->
      <div v-if="isLoggedin" class="flex items-center">
        <div
          class="bg-gray-200 w-[40px] h-[40px] flex justify-center items-center mr-[16px] cursor-pointer rounded-[8px]"
        >
          <Icon name="mdi:bell-outline" class="w-[20px] h-[20px]" />
        </div>

        <!-- Profile Dropdown -->
        <div class="dropdown dropdown-bottom relative">
          <div tabindex="0" role="button" class="cursor-pointer">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/assets/images/profile.jpeg"
                alt="avatar"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <ul
            tabindex="-1"
            class="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm right-0 absolute"
          >
             <li>
              <NuxtLink to="/profile">
                Profile
              </NuxtLink>
            </li>

            <li><a @click="logout">Log Out</a></li>
          </ul>
        </div>
      </div>

      <!-- Show login/signup if not logged in -->
      <div v-else class="hidden lg:flex items-center">
        <NuxtLink to="/signup">
          <button
            class="w-[85px] h-[40px] bg-primary rounded-[8px] text-white text-[14px] font-bold mr-[8px] hover:bg-[#4C64E6]"
          >
            Sign up
          </button>
        </NuxtLink>
        <NuxtLink to="/login">
          <button
            class="w-[85px] h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold mr-[10px] hover:bg-[#D4D9ED]"
          >
            Log in
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Burger Menu -->
    <button
      @click="isMenuOpen = !isMenuOpen"
      class="lg:hidden p-2"
      aria-label="Toggle menu"
    >
      <Icon v-if="!isMenuOpen" name="mdi:menu" class="w-7 h-7" />
      <Icon v-else name="mdi:close" class="w-7 h-7" />
    </button>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="absolute top-[80px] left-0 w-full bg-white border-b border-gray-300 lg:hidden shadow-lg"
    >
      <div class="flex flex-col">
        <NuxtLink
          :to="isLoggedin ? '/home' : '/'"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/internships"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >Explore</NuxtLink
        >
        <NuxtLink
          to="/applications"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >My applications</NuxtLink
        >
        <NuxtLink
          to="/saved"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >Saved</NuxtLink
        >
        <NuxtLink
          to="/matching"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >Internship Matching</NuxtLink
        >
        <NuxtLink
          to="/"
          class="text-[16px] py-3 border-b border-gray-200 hover:bg-gray-200 px-4"
          >About us</NuxtLink
        >

        <div v-if="!isLoggedin" class="flex flex-col gap-3 mt-4 px-4 pb-4">
          <NuxtLink to="/signup">
            <button
              class="w-full h-[40px] bg-primary rounded-[8px] text-white text-[14px] font-bold hover:bg-[#4C64E6]"
            >
              Sign up
            </button>
          </NuxtLink>
          <NuxtLink to="/login">
            <button
              class="w-full h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold hover:bg-[#D4D9ED]"
            >
              Log in
            </button>
          </NuxtLink>
        </div>

        <div v-else class="flex flex-col gap-3 mt-4 px-4 pb-4">
          <button
            @click="logout"
            class="w-full h-[40px] bg-[#E5E8F5] rounded-[8px] text-black text-[14px] font-bold hover:bg-[#D4D9ED]"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/useUserStore";

const userStore = useUserStore();
const isLoggedin = computed(() => userStore.isLoggedIn);
const isMenuOpen = ref(false);
const isReady = ref(false);
const route = useRoute();

onMounted(async () => {
  await userStore.initUser();
  isReady.value = true;
});

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);

const logout = () => {
  userStore.logout();
};

const activeLinkClass = (path) => (route.path === path ? "text-primary" : "");
</script>
