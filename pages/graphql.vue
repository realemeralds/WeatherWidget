<template>
  <div>
    <h2 class="text-white">Starlink Launches</h2>
    <p class="text-white">{{ data }}</p>
  </div>
</template>

<script setup>
const { data } = await useAsyncGql('getAllInfoByName', {
  name: 'Singapore',
});
</script>
