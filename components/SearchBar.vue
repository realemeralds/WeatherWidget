<template>
  <div>
    <div class="flex w-[800px] items-center justify-center">
      <input
        v-model="userInput"
        class="w-full rounded-l-2xl py-4 pl-7 pr-7 font-pro text-xl placeholder:text-slate-400 active:border-none"
        type="text"
        id="userInput"
        placeholder="weather at a country, city or location..."
      />
      <button class="h-max rounded-r-2xl bg-[#E84855] p-3 pl-2">
        <nuxt-img src="/search.svg" width="32" objectFit="contain" />
      </button>
    </div>
    <div class="mt-3">
      <div
        v-for="(result, index) in results"
        class="flex flex-row items-center justify-between bg-slate-100 px-8 py-2"
        :class="resultsClassList.index"
        :key="index"
      >
        <p class="text-xl font-light">{{ result.name }}</p>
        <div class="flex flex-col items-center justify-center">
          <p class="text-center text-lg font-medium">NOW</p>
          <div class="flex w-full flex-row items-center justify-between">
            <nuxt-img src="/partly_sunny.svg" width="20" />
            <p class="text-md font-light">{{ result.temperature }} °C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      results: [
        { name: "Perth, Australia", temperature: "33" },
        { name: "Perth, USA", temperature: "33" },
        { name: "Perth, Britain", temperature: "33" },
      ],
      resultsClassList: [
        "bg-firstResult rounded-t-4xl",
        "bg-secondResult relative bottom-4",
        "bg-thirdResult relative bottom-8",
      ],
    };
  },
};
</script>
