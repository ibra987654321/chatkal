<template>
  <full-screen-loader></full-screen-loader>
  <div class="bg-gradient-to-r from-blue-100  via-white to-blue-100">
    <component :is="components[layout]">
      <router-view/>
    </component>
    <div v-if="$store.state.tooltip" class="absolute  bg-gray-300  p-2 rounded shadow-md " :style="{ top: $store.state.tooltipPosition.y + 'px', left: $store.state.tooltipPosition.x + 'px' }">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Участок №{{$store.state.snacks.data.sector.location}}</div>
        <p class="text-gray-700 text-base">
          <span class="font-semibold">Улица:</span> {{$store.state.snacks.data.sector.name}} {{$store.state.snacks.data.house.length &&  $store.state.snacks.data.house[0].address}}<br>
          <span class="font-semibold">Жители:</span> <span v-for="item in $store.state.snacks.data.person">{{item.name}}</span><br>
          <span class="font-semibold">Количество домов:</span> {{$store.state.snacks.data.house.length}}<br>
        </p>
      </div>
    </div>
    <sidebar-for-data v-if="token"></sidebar-for-data>
  </div>
</template>


<script setup>
import MainLayout from "@/layout/MainLayout";
import SpecialLayout from "@/layout/SpecialLayout";
import SidebarForData from "@/components/UIElements/SidebarForData";
import {useRoute} from "vue-router/dist/vue-router";
import {computed, onMounted} from "vue";
import FullScreenLoader from "@/components/UIElements/FullScreenLoader";
import { getToken} from "@/helpers/helpers";

const components = {
  main: MainLayout,
  special: SpecialLayout,
  SidebarForData,
  FullScreenLoader
}
const route = useRoute()
const layout = computed(() => {
  return (route.meta.layout || 'special')
})
const token = getToken()

</script>

<style>
</style>
