<template>
  <div>
    <div
      class="flex items-center justify-center"
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
    </div>
    <div
      v-if="props.resultsDisabled !== 'True'"
      class="mt-3 flex flex-col items-center"
    >
      <div
        v-for="(result, index) in results.slice(0, 2)"
        class="flex flex-row items-center justify-between self-stretch rounded-b-4xl bg-slate-100 px-8 pb-3"
        :class="resultsClassList[index]"
        :key="index"
      >
        <p class="mr-3 text-2xl font-light" :class="index === 0 ? 'mt-1' : ''">
          {{ result.name }}
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
            <p class="text-xl font-light">{{ result.temperature }} °C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  resultsDisabled?: 'True' | 'False';
  sizing: 'compact' | 'expanded';
}

const props = defineProps<Props>();

const userInput = ref('');
const results = reactive([
  { name: 'Perth, Australia', temperature: '33' },
  { name: 'Perth, USA', temperature: '33' },
  { name: 'Perth, Britain', temperature: '33' },
]);

const isExpanded = computed(() => props.sizing !== 'compact');
const searchBarStyles = ref({
  compact: 'py-2 pl-5 pr-3',
  expanded: 'py-4 pl-7 pr-4',
});

const resultsClassList = [
  'bg-firstResult relative rounded-t-4xl pt-2 z-20',
  'bg-secondResult relative bottom-8 pt-[46px] pb-4 z-10',
  'bg-thirdResult relative bottom-16 pt-11 pb-5 z-0',
];
</script>
