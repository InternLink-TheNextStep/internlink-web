<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Navbar />

    <div class="flex flex-col justify-center items-center flex-1 px-4 md:px-0">
      <div
        class="bg-white rounded-3xl w-full max-w-sm md:max-w-md lg:max-w-lg p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h1>

        <form @submit.prevent="handleSignUp" class="flex flex-col gap-5">
          <!-- Name fields -->
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 flex flex-col min-w-0">
              <label
                for="firstName"
                class="font-medium mb-2 text-gray-700 required"
              >
                First Name
              </label>
              <input
                v-model="formData.firstName"
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                required
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            <div class="flex-1 flex flex-col min-w-0">
              <label
                for="lastName"
                class="font-medium mb-2 text-gray-700 required"
              >
                Last Name
              </label>
              <input
                v-model="formData.lastName"
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                required
                class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="font-medium mb-2 text-gray-700 required">
              Email
            </label>
            <input
              v-model="formData.email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label
              for="password"
              class="font-medium mb-2 text-gray-700 required"
            >
              Password
            </label>
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
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
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

          <!-- Submit button -->
          <div class="flex justify-center mt-2">
            <button
              type="submit"
              class="btn btn-primary text-white w-48 py-3 rounded-lg flex justify-center items-center hover:shadow-lg transition-shadow"
              :disabled="userStore.loading"
            >
              <span v-if="userStore.loading" class="mr-2 animate-spin">⏳</span>
              Sign Up
            </button>
          </div>
        </form>

        <p class="text-sm text-center text-gray-500 mt-6">
          Already have an account?
          <a href="/login" class="text-primary hover:underline font-medium"
            >Log In</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/useUserStore";

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  rememberMe: false,
});

const showPassword = ref(false);
const userStore = useUserStore();

const handleSignUp = async () => {
  await userStore.signup(
    formData.value.firstName,
    formData.value.lastName,
    formData.value.email,
    formData.value.password
  );
};
</script>
