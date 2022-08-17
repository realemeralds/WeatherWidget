<template>
  <div
    class="relative flex h-screen w-screen flex-col items-center justify-center"
  >
    <p class="mb-8 text-3xl font-light text-white">WeatherWidget</p>
    <SearchBar />
    <Socials />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('hello world?');
});
</script>
