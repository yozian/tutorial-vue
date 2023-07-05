<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';

import dayjs from 'dayjs';

//
import { TodoApi } from '@/apis';

onMounted(async () => {
  // const todos = await TodoApi.fetchAllAsync();
  // console.log(todos);
  
  TodoApi.fetchAllAsync()
  .then((todos) => {
    console.log(todos);
  })
  
  
  dayjs().format();

});

</script>
