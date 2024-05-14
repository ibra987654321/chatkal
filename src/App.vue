<template>
  <div class="bg-gradient-to-r from-blue-100  via-white to-blue-100">
    <component :is="components[layout]">
      <router-view/>
    </component>
    <div v-if="$store.state.tooltip" class="absolute  bg-gray-300  p-2 rounded shadow-md " :style="{ top: $store.state.tooltipPosition.y + 'px', left: $store.state.tooltipPosition.x + 'px' }">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Участок №{{$store.state.text}}</div>
        <p class="text-gray-700 text-base">
          <span class="font-semibold">Улица:</span> Улица Пушкина, дом 12<br>
          <span class="font-semibold">Жители:</span> Иванов Иван, Петров Петр, Сидоров Сидор<br>
          <span class="font-semibold">Количество домов:</span> 3<br>
          <!-- Добавьте любые другие сведения о участке -->
        </p>
      </div>
    </div>
    <sidebar-for-data></sidebar-for-data>
  </div>
</template>

<script setup>
import MainLayout from "@/layout/MainLayout";
import SpecialLayout from "@/layout/SpecialLayout";
import SidebarForData from "@/components/UIElements/SidebarForData";
import {useRoute} from "vue-router/dist/vue-router";
import {computed, onMounted} from "vue";
const components = {
  main: MainLayout,
  special: SpecialLayout,
  SidebarForData
}
const route = useRoute()
const layout = computed(() => {
  return (route.meta.layout || 'special')
})

</script>

<style>
</style>
