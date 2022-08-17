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
import { reactive, onMounted } from "vue";
const state = reactive({ count: 0 });

function increment() {
  state.count++;
}

onMounted(() => {
  console.log("hello world?");
});
</script>
