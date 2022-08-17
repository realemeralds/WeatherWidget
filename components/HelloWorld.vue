<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-center font-serif text-4xl underline">
      Hello {{ listOfVerbs[state.verbIndex] }} world!
    </p>
    <button
      @click="randomVerbIndex"
      class="rounded-3xl bg-primaryAccent px-4 py-2 font-serif text-3xl font-bold text-white"
    >
      Update verb!
    </button>
  </div>
</template>

<script setup lang="ts">
import Vue, { reactive, onMounted, ref } from "vue";

/*eslint-disable */
interface State {
  verbIndex: number;
}
/*eslint-enable */

const state: State = reactive({ verbIndex: 0 });
const listOfVerbs = ref([
  "brutal",
  "savage",
  "inhuman",
  "absurd",
  "barbaric",
  "barbarous",
  "cruel",
  "brutish",
  "bloodthirsty",
  "wicked",
]);

function randomVerbIndex() {
  state.verbIndex = Math.floor(Math.random() * listOfVerbs.value.length);
}

onMounted(() => {
  randomVerbIndex();
});
</script>
