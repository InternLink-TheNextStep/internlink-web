<template>

        <div
            class="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
            <img src="/assets/images/workplace.jpg" alt=""
                class="w-full h-24 sm:h-28 md:h-32 bg-gray-300 rounded-md mb-2 sm:mb-3">
            <p class="text-[16px] font-medium">{{ title }}</p>
            <p class="text-[#4D8099] text-[14px] ">{{ company }}</p>
        </div>
  
</template>
<script setup>

defineProps({
 title:({
    type:String,
    required:true
 }),

company:({
    type:String,
    required:true
 })
})
</script>
