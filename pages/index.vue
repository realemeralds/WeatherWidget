<template>
  <div>
    <h1>hello world! this video has {{ likes }}</h1>
    <button
      @click="
        () => {
          lol();
          likes++;
        }
      "
    >
      trolling
    </button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      likes: 0,
    };
  },

  methods: {
    lol() {
      alert("haiz");
    },
  },
};
</script>
