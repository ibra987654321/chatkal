<template>
  <div class="bg-blur">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-4xl font-bold text-center tracking-tight text-gray-900">Вакансии</h2>

      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" :class="product.color + ' shadow-2xl ' + product.shadow" class="group  relative rounded-xl p-4">
          <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
          </div>
          <div class="mt-4 flex justify-between">
            <div class="text-center">
              <h3 class="text-sm text-gray-700 text-2xl font-bold ">
                <a :href="product.href">
                  {{ product.name }}
                </a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'Менеджер',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'bg-blue-100',
    shadow: 'shadow-blue-300/50'
  },
  {
    id: 2,
    name: 'СММ специалист',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    color: 'bg-red-100',
    shadow: 'shadow-red-300/50'
  },
  {
    id: 3,
    name: 'Программист',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    color: 'bg-amber-100',
    shadow: 'shadow-amber-300/50'
  },
  {
    id: 4,
    name: 'Системный администратор',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    color: 'bg-emerald-100',
    shadow: 'shadow-emerald-300/50'
  },
]
</script>

<style scoped>

</style>
