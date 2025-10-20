<template>


    <div class=" w-full md:w-[270px] lg:w-[270px] h-[160px] md:h-[230px] border border-[#CFD1E8] rounded-[8px] p-[16px] ">
      <Icon  :name="icon" class="w-[24px] h-[24px] mb-[12px] " />
      <p class="font-bold w-full md:w-[189px] text-[16px] leading-[20px] mb-[4px] text-wrap ">{{ title }}</p>

      <p class="text-[16px] w-full md:w-[189px] text-[#47579E] text-wrap">{{ description }}</p>
    </div>


</template>
<script setup>  
defineProps({
  icon:({
    type:String,
    required:true,
  }),
  title:({
    type:String,
    required:true,
  }),
  description: ({
    type:String,
    required:true,
  })
});



</script>