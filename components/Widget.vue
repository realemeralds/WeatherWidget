<template>
  <div class="mt-16 flex flex-col justify-center">
    <!-- <TimeSelector /> -->
    <p class="mb-3 text-center text-3xl font-bold text-white">Singapore</p>
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
              <p class="relative right-[2px] font-pro text-xs font-thin">80%</p>
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
</template>
