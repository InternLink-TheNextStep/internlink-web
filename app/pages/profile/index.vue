<template>
  <section class="min-h-screen bg-gray-50 pb-16">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
      <p class="text-gray-500 mb-8">Manage your profile information and CV</p>

      <div class="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
        
        <div v-if="userStore.user" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              :value="userStore.user.first_name"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              :value="userStore.user.last_name"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              :value="userStore.user.email"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">CV / Resume</h2>
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-sm text-blue-700">
            <Icon name="mdi:information" class="inline w-4 h-4 mr-1" />
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>

        <!-- Current CV -->
        <div v-if="cvUrl && !isUploading" class="mb-6">
          <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Icon name="mdi:file-document-check" class="w-8 h-8 text-green-600" />
            <div class="flex-1">
              <p class="font-medium text-gray-800">Your CV</p>
              <p class="text-sm text-gray-500">Uploaded successfully</p>
            </div>
            <div class="flex gap-2">
              <a
                :href="cvUrl"
                target="_blank"
                class="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                View
              </a>
              <button
                @click="triggerFileInput"
                class="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Replace
              </button>
            </div>
          </div>
        </div>

        <!-- Upload Area -->
        <div v-else-if="!isUploading">
          <div
            @click="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition',
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            ]"
          >
            <Icon name="mdi:cloud-upload" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-700 font-medium mb-2">
              Click to upload or drag and drop
            </p>
            <p class="text-sm text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
          </div>
          
          <input
            ref="fileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            @change="handleFileSelect"
            class="hidden"
          />
        </div>

        <!-- Uploading State -->
        <div v-if="isUploading" class="text-center py-12">
          <div class="loading loading-spinner loading-lg text-blue-600 mb-4"></div>
          <p class="text-gray-600 font-medium">Uploading your CV...</p>
          <p class="text-sm text-gray-500 mt-2">{{ uploadProgress }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="uploadError" class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-start gap-2">
            <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-red-700 font-medium text-sm">Upload Failed</p>
              <p class="text-red-600 text-sm mt-1">{{ uploadError }}</p>
            </div>
            <button
              @click="uploadError = null"
              class="text-red-400 hover:text-red-600"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="uploadSuccess" class="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-2">
            <Icon name="mdi:check-circle" class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-green-700 font-medium text-sm">CV Uploaded Successfully!</p>
              <p class="text-green-600 text-sm mt-1">Your CV is ready to use for applications.</p>
            </div>
            <button
              @click="uploadSuccess = false"
              class="text-green-400 hover:text-green-600"
            >
              <Icon name="mdi:close" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getUserProfileDetails, uploadCVWithSkills } from "~/services/user-service";

const userStore = useUserStore();
const cvUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref(false);
const isDragging = ref(false);
const uploadError = ref<string | null>(null);
const uploadSuccess = ref(false);
const uploadProgress = ref("");

definePageMeta({
  layout: "base",
  middleware: ["auth-user"],
});

// Fetch user profile details
const fetchProfileDetails = async () => {
  try {
    const profile = await getUserProfileDetails();
    cvUrl.value = profile.cv_url;
  } catch (error) {
    console.error("Failed to load profile details:", error);
  }
};

// Validate file
const validateFile = (file: File): string | null => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Please upload PDF, DOC, or DOCX file.";
  }

  if (file.size > maxSize) {
    return "File size exceeds 5MB. Please upload a smaller file.";
  }

  return null;
};

// Handle file upload
const handleFileUpload = async (file: File) => {
  uploadError.value = null;
  uploadSuccess.value = false;

  const validationError = validateFile(file);
  if (validationError) {
    uploadError.value = validationError;
    return;
  }

  isUploading.value = true;
  uploadProgress.value = `Uploading ${file.name}...`;

  try {
    const response = await uploadCVWithSkills(file);
    cvUrl.value = response.data.user.cv_url;
    uploadSuccess.value = true;
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      uploadSuccess.value = false;
    }, 5000);
  } catch (error: any) {
    console.error("Upload failed:", error);
    
    if (error?.data?.message) {
      uploadError.value = error.data.message;
    } else if (error?.data?.errors?.cv) {
      uploadError.value = error.data.errors.cv[0];
    } else {
      uploadError.value = "Failed to upload CV. Please try again.";
    }
  } finally {
    isUploading.value = false;
    uploadProgress.value = "";
  }
};

// Trigger file input click
const triggerFileInput = () => {
  fileInput.value?.click();
};

// Handle file selection
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file) {
    handleFileUpload(file);
  }
  
  // Reset input
  target.value = "";
};

// Handle drag and drop
const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const file = event.dataTransfer?.files[0];
  
  if (file) {
    handleFileUpload(file);
  }
};

onMounted(async () => {
  await fetchProfileDetails();
});
</script>
