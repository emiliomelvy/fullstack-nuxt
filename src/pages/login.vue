<script setup lang="ts"></script>

<template>
  <div
    class="bg-gray-200 lg:grid grid-cols-12 container xl:max-w-7xl rounded-xl"
  >
    <NuxtImg src="/login-image.png" class="col-span-8 rounded-xl" />
    <div class="text-black text-center col-span-4 bg-white m-3 p-16 rounded-xl">
      <UIcon name="akar-icons:planet" class="w-10 h-10" />
      <div class="text-4xl font-medium">Welcome Back!</div>
      <div class="text-gray-500 lg:pt-3">Please enter your details</div>
    </div>
  </div>
</template>
