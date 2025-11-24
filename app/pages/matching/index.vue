<template>
    <div class=" px-4 md:px-24 lg:px-[160px] mx-auto mt-8 flex flex-col">
        <p class="text-[32px] font-bold mb-[12px]">Upload CV</p>
        <p class="text-[#4D8099] text-sm mb-8">Submit your CV to enhance your internship matching opportunities.</p>

       <!-- Error Alert (DaisyUI) -->
        <div v-if="uploadError" role="alert" class="alert alert-error mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ uploadError }}</span>
            <button @click="uploadError = null" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <!-- Success Alert (DaisyUI) -->
        <div v-if="successMessage" role="alert" class="alert alert-success mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ successMessage }}</span>
            <button @click="successMessage = null" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <!-- Drop zone -->

        <input ref="fileInput" type="file" accept=".pdf,.docx" @change="handleFileSelect" class="hidden" />
        <div v-if="!file"
            class=" flex flex-col items-center justify-center  border-[2px] border-dashed border-[#CFDEE8] rounded-[8px] h-[280px] mb-7"
            :class="isDragging ? 'border-[#4D8099] bg-[#F5FAFC]' : 'border-[#CFDEE8]'" @dragover="handleDragover"
            @drop="handleDrop" @dragenter="dragEnter" @dragleave="dragLeave">

            <p class=" font-bold text-lg mb-3">Drag and Drop Your CV Here</p>
            <p class="w-[480px] text-center text-wrap text-sm mb-[24px]">Or, click the button below to browse files
                from
                your computer. Accepted formats: PDF, DOCX.</p>

            <button class="w-[121px] h-[40px] font-bold bg-[#E8F0F2] rounded-lg text-sm hover:bg-[#D7E4E7]"
                @click="fileInput.click()">Browse
                file</button>
        </div>

        <!-- Show this when file IS selected -->
        <div v-else class="flex flex-col items-center">
            <svg class="w-16 h-16 mb-4 text-[#4D8099]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="font-bold text-lg mb-2">{{ file.name }}</p>
            <p class="text-sm text-[#4D8099] mb-4">{{ formatFileSize(file.size) }}</p>

            <!-- Change file button -->
            <button @click="fileInput.click()"
                class="w-[121px] h-[40px] font-bold bg-[#E8F0F2] rounded-lg text-sm hover:bg-[#D7E4E7]">
                Change file
            </button>
        </div>


        <div class="flex flex-col mb-8">
            <p class="mb-3">Submit Progress</p>

            <div class="h-[8px] bg-[#D7E4E7] rounded-[4px] mb-3">
                <div class="h-full bg-[#4D8099] transition-all duration-300 rounded-[4px]"
                    :style="{ width: progress + '%' }"></div>
            </div>

            <p class="text-[#4D8099]">{{ progress }}%</p>

        </div>

        <p class="text-sm text-[#4D8099] text-center mb-7">By uploading your CV, you agree to our terms and conditions.
        </p>
        <button
            class="bg-primary font-bold text-white text-sm rounded-lg w-[105px] h-[40px] justify-center self-center hover:bg-[#5A91AC]"
            @click="submitCV">Submit
            CV</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout:'base',
    middleware:["auth-user"]
})

const file = ref(null);
const fileInput = ref(null);
const isDragging = ref(false);
const progress = ref(0);
const isUploading = ref(false);
const uploadError = ref(null);
const successMessage = ref(null);

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3VzZXIvbG9naW4iLCJpYXQiOjE3NjM4MDUzNjEsImV4cCI6MTc2MzgwODk2MSwibmJmIjoxNzYzODA1MzYxLCJqdGkiOiI4dkFBak9WOHZwaEs2RUlhIiwic3ViIjoiMiIsInBydiI6ImYyMDcyMGY1NGIxMTFkZGU5Y2VlZTc3ZTA3ZDA0MGQzMzMwYTk3NTYifQ.voKA7QoXb_sPhoB3pIZA09dNBTujUfbOgdjniT4nk_w";

function handleDragover(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    isDragging.value = false;

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    file.value = droppedFile;
}

function handleFileSelect(e) {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
        file.value = selectedFiles[0];
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';


    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function dragEnter(e) {
    e.preventDefault();
    isDragging.value = true;
}

function dragLeave(e) {
    e.preventDefault();
    isDragging.value = false;
}

async function submitCV() {
    if (!file.value) {
        uploadError.value = "Please select a file before submitting.";
        return;
    }

    progress.value = 0;
    isUploading.value = true;
    uploadError.value = null;
    successMessage.value = null;

    try {
        const formData = new FormData();
        formData.append("cv", file.value);

        const response = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            // Track upload progress
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    progress.value = Math.round((e.loaded / e.total) * 100);
                }
            });

            xhr.addEventListener('load', () => {
                console.log('Response status:', xhr.status);
                console.log('Response text:', xhr.responseText);
                
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(new Error('Invalid response from server'));
                    }
                } else {
                    let errorMessage = `Upload failed with status ${xhr.status}`;
                    try {
                        const errorData = JSON.parse(xhr.responseText);
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        errorMessage = xhr.responseText || errorMessage;
                    }
                    reject(new Error(errorMessage));
                }
            });

            xhr.addEventListener('error', () => reject(new Error('Upload failed')));
            xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

            xhr.open('POST', 'http://localhost:8000/api/v1/user/profile/cv');

          
            xhr.setRequestHeader('Authorization', `Bearer ${TOKEN}`);
            xhr.setRequestHeader('Accept', 'application/json');

            console.log("Uploading file:", file.value);
            xhr.send(formData);
        });

        // console.log('CV uploaded successfully!', response);
        successMessage.value = 'CV uploaded successfully!';
        
        // Reset file and progress after success
        setTimeout(() => {
            progress.value = 0;
            file.value = null;
        }, 2000);

    } catch (error) {
        console.error('Upload error:', error);
        uploadError.value = error.message || 'Failed to upload CV. Please try again.';
        progress.value = 0;

    } finally {
        isUploading.value = false;
    }
}
</script>