<template>
    <div>
        <ApplicationCard v-for="company in companies" :key="title" :title="company.title" :applied_date="company.applied_date" :company="company.company_name"/>
       

    </div>
</template>
<script setup>

const companies = [
    {
        title: 'Marketing intern',
        applied_date: 'Applied on 10/10/2024',
        company_name: 'Book me plus'
    },
    {
        title: 'Full-stack engineering',
       applied_date: 'Applied on 10/12/2020',
        company_name: 'Netflix'
    },
    {
        title: 'Marketing intern',
        applied_date: 'Applied on 1/10/2022',
        company_name: 'Camob'
    },
]
</script>