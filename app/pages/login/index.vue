<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <div class="flex flex-col justify-center items-center flex-1 px-4 md:px-0">
      <div
        class="bg-white rounded-3xl w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <h1 class="text-3xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h1>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
          <div class="flex flex-col">
            <label for="email" class="font-medium mb-2 text-gray-700"
              >Email</label
            >
            <input
              v-model="formData.email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              class="rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <div class="flex flex-col">
            <label for="password" class="font-medium mb-2 text-gray-700"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="formData.password"
                placeholder="Enter your password"
                required
                class="w-full rounded-lg border border-gray-300 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <Icon
                  :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <!-- Error message -->
          <p v-if="userStore.errorMessage" class="text-red-500 text-sm">
            {{ userStore.errorMessage }}
          </p>

          <div
            class="flex flex-col md:flex-row justify-between items-center text-sm"
          >
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                v-model="formData.rememberMe"
                class="w-4 h-4"
              />
              <label for="rememberMe" class="cursor-pointer">Remember me</label>
            </div>
            <a
              href="/forgot-password"
              class="text-primary hover:underline mt-2 md:mt-0"
            >
              Forgot Password?
            </a>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              class="btn btn-primary text-white w-48 py-3 rounded-lg flex justify-center items-center"
              :disabled="userStore.loading"
            >
              <span v-if="userStore.loading" class="mr-2 animate-spin">⏳</span>
              Sign In
            </button>
          </div>
        </form>

        <p class="text-sm text-center text-gray-500 mt-6">
          Don't have an account?
          <a href="/register" class="text-primary hover:underline font-medium"
            >Sign Up</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const formData = ref({ email: "", password: "", rememberMe: false });
const showPassword = ref(false);
const userStore = useUserStore();

const handleLogin = async () => {
  await userStore.login(
    formData.value.email,
    formData.value.password,
    formData.value.rememberMe
  );
};
</script>
