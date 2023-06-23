<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';

//
// import { TodoApi } from '@/apis';

onMounted(async () => {
  // const todos = await TodoApi.fetchAllAsync();
  // console.log(todos);
});

</script>
