<template>
  <div>
    <div
      class="relative flex items-center justify-center"
      :class="{ 'w-[550px] ': isExpanded, 'w-[400px]': !isExpanded }"
    >
      <input
        v-model="userInput"
        class="w-full rounded-l-2xl font-pro text-xl placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
        :class="searchBarStyles[props.sizing]"
        type="text"
        id="userInput"
        placeholder="weather at a country, city or location..."
      />
      <button
        class="flex items-center justify-center self-stretch rounded-r-2xl bg-[#E84855]"
        :class="{ 'h-[60px] w-16': isExpanded, 'h-[44px] w-14': !isExpanded }"
      >
        <div
          class="mr-[3px]"
          :class="{ 'h-8 w-8': isExpanded, 'h-6 w-6': !isExpanded }"
        >
          <nuxt-img
            src="/search.svg"
            :width="isExpanded ? '32' : '24'"
            objectFit="contain"
          />
        </div>
      </button>
      <div
        class="absolute left-0 right-0 top-14 mt-3 flex flex-col items-center"
      >
        <NuxtLink
          :to="`/result?name=${result.name}${
            result.state ? `&state=${result.state}` : ''
          }&lat=${result.lat}&lon=${result.lon}`"
          v-for="(result, index) in results?.slice(0, 3)"
          class="flex flex-row items-center justify-between self-stretch rounded-b-4xl px-8 pb-3"
          :class="resultsClassList[index]"
          :key="index"
        >
          <p
            class="mr-3 text-2xl font-light"
            :class="index === 0 ? 'mt-1' : ''"
          >
            {{
              `${result.name}${result.state ? `, ${result.state}` : ''}${
                result.country ? `, ${result.country}` : ''
              }`
            }}
          </p>
          <div class="flex flex-col items-center justify-center">
            <p
              v-if="index === 0"
              class="relative top-[2px] text-center text-sm font-bold"
            >
              NOW
            </p>
            <div
              class="flex w-full flex-row items-center justify-between space-x-4"
            >
              <nuxt-img src="/partly_sunny.svg" width="32" />
              <p class="whitespace-nowrap text-xl font-light">
                {{ result.temp }} °C
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div
        v-if="!noResult && !!userInput"
        class="absolute left-0 right-0 top-14 z-10 mt-3 flex flex-row items-center justify-center rounded-b-4xl rounded-t-4xl bg-firstResult px-8 py-5"
      >
        <p class="mr-3 text-2xl font-light">Loading...</p>
      </div>
      <div
        v-if="noResult && !!userInput"
        class="absolute left-0 right-0 top-14 mt-3 flex flex-row items-center justify-center self-stretch rounded-b-4xl rounded-t-4xl bg-firstResult px-8 py-5"
      >
        <p class="mr-3 text-2xl font-light">No results found :(</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GeolocateQuery } from './.nuxt/gql-sdk.ts';

interface Props {
  resultsDisabled?: 'True' | 'False';
  sizing: 'compact' | 'expanded';
}

const props = defineProps<Props>();

let store = '';
const userInput = ref('');
const results: GeolocateQuery['getLocationByName'] = ref([]);
const noResult: Ref<boolean> = ref<boolean>(false);

watch(userInput, async (newValue) => {
  store = newValue;
  noResult.value = false;
  results.value = null;
  if (!store) return;
  await new Promise((res) => {
    setTimeout(() => {
      res('Delay over!');
    }, 300);
  });
  if (store === newValue) {
    const { data } = await useAsyncGql('Geolocate', { name: newValue });
    if (
      !data?.value?.getLocationByName ||
      data?.value?.getLocationByName?.length === 0
    ) {
      noResult.value = true;
      return;
    }
    noResult.value = false;
    // console.log(data?.value?.getLocationByName?.length);
    results.value = data?.value?.getLocationByName?.map((element) => ({
      ...element,
      temp: element?.currentWeather?.main?.temp.toFixed(0),
    }));
  }
});

const isExpanded = computed(() => props.sizing !== 'compact');
const searchBarStyles = ref({
  compact: 'py-2 pl-5 pr-3',
  expanded: 'py-4 pl-7 pr-4',
});

const resultsClassList = [
  'bg-firstResult relative rounded-t-4xl pt-2 z-20',
  'bg-secondResult relative bottom-8 pt-[46px] pb-4 z-10',
  'bg-thirdResult relative bottom-16 pt-[46px] pb-4 z-0',
];
</script>
