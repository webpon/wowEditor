<template>
  <OptionsBar/>
  <!-- <RouterView v-slot="{ Component }"> -->
    <!-- <KeepAlive> -->
      <!-- <component :is="Component" /> -->
    <!-- </KeepAlive> -->
  <!-- </RouterView> -->
  <Home/>
</template>

<script setup lang="ts">
import OptionsBar from '@/components/common/OptionsBar.vue'
// import { RouterView } from 'vue-router'
import Home from '@/pages/home/Home.vue'

</script>

<style lang="less">
</style>
