<template>
  <div class="relative flex justify-center overflow-hidden">
    <div
      class="absolute top-4 flex h-min w-full flex-row justify-between pl-12 pr-8"
    >
      <NuxtLink to="../" class="text-4xl font-light text-white"
        >WeatherWidget</NuxtLink
      >
      <SearchBar sizing="compact" results-disabled="True" class="mt-[2px]" />
    </div>
    <div
      class="align-start flex h-full w-full flex-grow flex-row justify-start"
    >
      <div
        class="relative flex h-screen w-[430px] translate-y-[72px] flex-col items-start rounded-tr-[50px] bg-optionsBG px-11 pt-6 text-white"
      >
        <button class="absolute top-9 right-10" @click="hideSettings">
          <font-awesome-icon icon="fa-solid fa-chevron-left" class="text-2xl" />
        </button>
        <p class="mb-3 self-center text-4xl">Settings</p>
        <div
          class="mb-4 w-[400px] self-center rounded-full border-b-2 border-b-optionsSeparator"
        ></div>
        <p class="mb-1 text-2xl font-light">Units</p>
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          class="inline-flex w-full items-center justify-between rounded-lg bg-optionsNormalBG py-2.5 pr-2 pl-4 text-center text-xl font-light text-black hover:bg-optionsFocusBG focus:outline-none focus:ring-2 focus:ring-[#F9A1EA]"
          type="button"
          @click="tempDropdown = true"
          @blur="
            tempDropdown
              ? () => {
                  nextTick(() => {
                    tempDropdown = false;
                  });
                }
              : ''
          "
        >
          {{ selectedTemperatureList[selectedTemperatureIndex] }}
          <svg
            class="ml-4 h-6 w-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          class="absolute top-48 z-10 mt-2 w-[412px] overflow-hidden rounded-md"
          :class="{ hidden: !tempDropdown }"
        >
          <button
            class="relative z-20 flex w-full items-center bg-optionsNormalBG py-2 px-3 hover:bg-optionsFocusBG"
            @click="updateSelectedTemp(index)"
            v-for="(value, index) in selectedTemperatureList"
            :key="index"
          >
            <p class="text-xl font-light text-black">
              {{ value }}
            </p>
          </button>
        </div>
        <div class="mt-4 flex w-full items-center justify-between">
          <p class="text-2xl font-light">Set custom colours</p>
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              class="peer sr-only relative z-20"
              @click="changeColorInputDisabled"
            />
            <div
              class="relative z-0 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
            ></div>
          </label>
        </div>
        <div
          class="flex w-full flex-col space-y-3 border-l-2 border-l-optionsSeparator pt-2 pb-1 pl-4"
        >
          <div
            class="relative inline-flex w-full flex-row items-center justify-between"
            v-for="(item, index) in colorState.fieldNames"
            :key="index"
          >
            <p class="text-xl font-light text-white">{{ item }}</p>
            <input
              class="mr-[66px] w-32 rounded-xl py-2 pl-8 text-xl font-light text-black focus:outline-none disabled:bg-stone-300"
              type="text"
              id="backgroundUserInput"
              :disabled="colorState.inputDisabled"
              v-model="colorState.colorInputList[index]"
              maxlength="6"
            />
            <p class="absolute left-[141px] text-xl font-light text-slate-500">
              #
            </p>
            <div
              class="absolute right-[34px] top-1/2 h-0 w-0 -translate-y-1/2 border-8"
              :style="{
                backgroundColor: renderedColorList[index],
                borderColor: renderedColorList[index],
              }"
            ></div>
          </div>
        </div>
        <div class="mt-5 flex w-full items-center justify-between">
          <p class="text-2xl font-light">Set coordinates</p>
          <label class="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              class="peer sr-only relative z-20"
              @click="changeCoordInputDisabled"
            />
            <div
              class="relative z-10 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
            ></div>
          </label>
        </div>
        <div
          class="flex w-full flex-col space-y-3 border-l-2 border-l-optionsSeparator pt-2 pb-1 pl-4"
        >
          <div
            class="relative inline-flex w-full flex-row items-center justify-between"
          >
            <p class="text-xl font-light text-white">Latitude</p>
            <input
              class="mr-[50px] w-40 rounded-xl py-2 px-4 text-xl font-light text-black focus:outline-none disabled:bg-stone-300"
              type="text"
              maxlength="15"
              v-model="coordinateState.coordinates[0]"
              :disabled="coordinateState.inputDisabled"
            />
          </div>
          <div
            class="relative inline-flex w-full flex-row items-center justify-between"
          >
            <p class="text-xl font-light text-white">Longitude</p>
            <input
              class="mr-[50px] w-40 rounded-xl py-2 px-4 text-xl font-light text-black focus:outline-none disabled:bg-stone-300"
              type="text"
              maxlength="15"
              v-model="coordinateState.coordinates[1]"
              :disabled="coordinateState.inputDisabled"
            />
          </div>
        </div>
        <p class="mt-5 text-2xl font-light">Extra Info</p>
        <div
          class="flex w-full flex-col space-y-1 border-l-2 border-l-optionsSeparator pt-1 pb-1 pl-4"
        >
          <div
            class="inline-flex w-full items-center justify-between"
            v-for="(item, index) in extraInfoState.text"
            :key="index"
          >
            <p class="text-xl font-light text-white">{{ item }}</p>
            <label class="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                value=""
                class="peer sr-only relative z-20"
                @click="
                  extraInfoState.fieldState[index] =
                    !extraInfoState.fieldState[index]
                "
                :checked="extraInfoState.fieldState[index]"
                :disabled="
                  !extraInfoState.fieldState[index] &&
                  extraInfoState.restDisabled
                "
              />
              <div
                class="relative z-0 h-6 w-11 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"
              ></div>
            </label>
          </div>
        </div>
        <p class="w-full text-center text-sm font-light text-[#B98080]">
          you can only select up to 2 extra fields
        </p>
      </div>

      <div
        class="pointer-events-none absolute inset-0 left-32 flex h-full w-full flex-col justify-center"
      >
        <div class="mb-4 flex flex-row justify-center space-x-3">
          <div
            v-for="index in 3"
            :key="index"
            class="rounded-full bg-white px-3 py-1"
            :class="[index === selectedTimeIndex ? selectedTimeStyle : '']"
          >
            <p class="font-light">{{ index * 2 - 1 }}-day</p>
          </div>
        </div>
        <p class="mb-3 text-center text-3xl font-bold text-white">
          {{ qVariables?.name }}
        </p>
        <div class="flex flex-col items-center justify-center text-white">
          <p class="mr-1 text-xl">now</p>
          <div class="flex flex-row items-center space-x-4">
            <div class="flex flex-col justify-center">
              <div class="flex w-full justify-center">
                <nuxt-img
                  src="/partly_sunny_white.png"
                  class="max-w-[70px]"
                  fit="inside"
                  width="100"
                />
              </div>
              <p class="italic">partly sunny</p>
            </div>
            <div class="mt-2 flex flex-col">
              <p class="text-3xl leading-none">28°C</p>
              <p class="text-md relative mb-1 font-pro font-light leading-none">
                feels like: 33°C
              </p>
              <div class="flex w-full flex-row space-x-2">
                <div class="flex flex-row items-center space-x-[2px]">
                  <nuxt-img src="/rain_icon.svg" width="24" />
                  <p class="relative right-[2px] font-pro text-xs font-thin">
                    80%
                  </p>
                </div>
                <div class="relative flex flex-row items-center space-x-[2px]">
                  <nuxt-img src="/cardinal.svg" width="14" />
                  <p class="font-pro text-xs font-thin">2.1m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedTimeIndex = ref(1);
const selectedTimeStyle = ref('bg-primaryAccent text-white');

const tempDropdown = ref(false);
const selectedTemperatureIndex = ref(0);
const selectedTemperatureList = [
  'Metric (km/h, °C)',
  'Imperial (mph, °F)',
  'Standard (km/h, K)',
];

function updateSelectedTemp(index: number) {
  selectedTemperatureIndex.value = index;
  tempDropdown.value = false;
}

// colours stuff
const hexCodePattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g;

interface typeColorState {
  fieldNames: string[];
  defaultColorList: string[];
  colorInputList: Ref<string[]>;
  inputDisabled: boolean;
}
const colorState: typeColorState = reactive({
  fieldNames: ['Background', 'Text', 'Accent'],
  defaultColorList: ['0C120C', 'FFFFFF', 'FFFFFF'],
  colorInputList: ref(['0C120C', 'FFFFFF', 'FFFFFF']),
  inputDisabled: true,
});

const renderedColorList: string[] = computed(() =>
  colorState.colorInputList.map((element: string, index: number) =>
    hexCodePattern.test(element)
      ? `#${element}`
      : colorState.defaultColorList[index]
  )
);

function changeColorInputDisabled(): void {
  if (!colorState.inputDisabled)
    colorState.colorInputList = [...colorState.defaultColorList];
  colorState.inputDisabled = !colorState.inputDisabled;
}

interface coordState {
  coordinates: string[];
  inputDisabled: boolean;
}

const coordinateState: coordState = reactive({
  coordinates: ['', ''],
  inputDisabled: true,
});

function changeCoordInputDisabled(): void {
  coordinateState.inputDisabled = !coordinateState.inputDisabled;
}

const extraInfoState = reactive({
  text: [
    'Chance of Rain',
    'Wind Speed & Direction',
    'Humidity',
    'Atmospheric Pressure',
    'Cloud Cover',
  ],
  fieldState: [true, true, false, false, false],
  restDisabled: computed(() => {
    let sum = 0;
    extraInfoState.fieldState.forEach((element) => {
      sum += +element;
    });
    return sum >= 2;
  }),
});

const route = useRoute();
const qVariables = ref(route.query);

if (qVariables.value) {
  const { data } = await useAsyncGql({
    operation: 'getAllInfoByName',
    variables: { name: qVariables.value.name },
  });
  console.log(data.value);
}
</script>
