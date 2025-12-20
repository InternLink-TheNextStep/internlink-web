<template>
    <div
        class="flex justify-between items-center mb-[10px] py-[12px] cursor-pointer"
        @click="goToDetail"
    >
        <div class="flex">
            <img
                :src="image || '/images/No_img.png'"
                 alt="internship image"
                class="w-[70px] h-[70px] rounded-[8px] mr-[16px]"
            >
            <div class="flex flex-col">
                <p class="leading-[24px] text-base">{{ title }}</p>
                <p class="leading-[21px] text-[#4D8099] text-sm font-light">
                    {{ formattedDate }}
                </p>
                <p class="leading-[21px] text-[#4D8099] text-sm font-light">
                    {{ company }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter()

const props = defineProps({
    image: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    applied_date: {
        type: String,
        required: true
    },
    company: {
        type: String,
        requried: true
    },
    slug: {
        type: String,
        required: true
    }
})

const formattedDate = computed(() =>
    new Date(props.applied_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
)

const goToDetail = () => {
    if (!props.slug) return
    router.push(`/internships/${props.slug}`)
}
</script>
