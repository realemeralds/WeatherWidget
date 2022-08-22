<template>
  <div
    class="relative flex h-screen w-screen flex-col items-center justify-center"
  >
    <a href="#" class="mb-6 text-3xl font-light text-white">WeatherWidget</a>
    <SearchBar sizing="expanded" />
    <Socials />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('hello world?');
});
</script>
