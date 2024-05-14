<template>
  <div class=" rounded-xl">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight  sm:text-4xl">
          <span class="block">Online recruiting</span>
          <span class="block ">Онлайн рекрутинг в Кыргызстане</span>
        </h2>
        <p class="text-gray-600 my-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dicta maiores placeat quia temporibus!
        </p>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="ml-3 inline-flex rounded-md shadow">
            <a href="#" class="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50">Смотреть вакансии</a>
          </div>
        </div>
      </div>
      <div class="">
        <img class="shadow-2xl shadow-purple-300 rounded-3xl" :src="images.smile" alt="">
<!--        <div class="w-50 h-20 bg-sky-500 rounded-br-3xl rounded-tr-3xl rounded-tl-3xl absolute bottom-0 z-10"></div>-->
      </div>
    </div>
  </div>
</template>

<script setup>
const images = {
  smile: require('../../assets/photo/SmilingMan.png')
}
</script>

<style scoped>

</style>
