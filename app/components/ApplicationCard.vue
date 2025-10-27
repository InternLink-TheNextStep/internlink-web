<template>
    <div class="flex justify-between items-center mb-[10px] py-[12px] px-[16px] ">

        <div class="flex ">
            <img src="/assets/images/cambridge.jpeg" alt="" class="w-[70px] h-[70px] rounded-[8px] mr-[16px]">
            <div class="flex flex-col ">
                <p class="leading-[24px] text-base">{{ title }} </p>
                <p class="leading-[21px] text-[#4D8099] text-sm font-light">{{ applied_date }}</p>
                <p class="leading-[21px] text-[#4D8099] text-sm font-light">{{ company }}</p>
            </div>

        </div>
        <div class="rounded-full bg-green-700 w-3 h-3 "></div>
    </div>

</template>
<script setup>
defineProps({
    title:({
        type:String,
        required:true
    }),
    applied_date:({
        type:String,
        required:true
    }),
    company:({
        type:String,
        requried:true
    })
})
</script>