<template>
  <div class="min-h-full ">
<!--    <Disclosure class="">-->
      <Popover class="relative backdrop-blur-2xl sticky top-0 z-30 bg-blu 2xl:block hidden" >
        <div class="mx-auto max-w-7xl px-4 sm:px-6">
          <div class="flex items-center justify-between border-b-2 border-gray-100 py-5 md:justify-start md:space-x-10">
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <img class="h-20 w-auto " :src="require('../assets/icon.png')" alt="" />
              </a>
            </div>
            <div class="-my-2 -mr-2 md:hidden">
              <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span class="sr-only">Open menu</span>
                <Bars3Icon class="h-6 w-6" aria-hidden="true" />
              </PopoverButton>
            </div>
            <PopoverGroup as="nav" class="text-3xl  ">
              Чаткал райондук мамлекеттик администрациясы
            </PopoverGroup>
            <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <img class="h-20 w-auto " :src="require('../assets/icon.png')" alt="" />

            </div>
          </div>
        </div>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
          <PopoverPanel focus class="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
            <div class="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="px-5 pt-5 pb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-6">
                  <nav class="grid gap-y-8">
                    <a v-for="item in solutions" :key="item.name" :href="item.href" class="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                      <component :is="item.icon" class="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                      <span class="ml-3 text-base font-medium text-gray-900">{{ item.name }}</span>
                    </a>
                  </nav>
                </div>
              </div>
              <div class="space-y-6 py-6 px-5">
                <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                  <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Pricing</a>

                  <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">Docs</a>
                  <a v-for="item in resources" :key="item.name" :href="item.href" class="text-base font-medium text-gray-900 hover:text-gray-700">{{ item.name }}</a>
                </div>
                <div>
                  <a href="#" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Sign up</a>
                  <p class="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?
                    {{ ' ' }}
                    <a href="#" class="text-indigo-600 hover:text-indigo-500">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
<!--      <DisclosurePanel class="md:hidden">-->
<!--        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">-->
<!--          <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>-->
<!--        </div>-->
<!--        <div class="border-t border-gray-700 pt-4 pb-3">-->
<!--          <div class="flex items-center px-5">-->
<!--            <div class="flex-shrink-0">-->
<!--              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />-->
<!--            </div>-->
<!--            <div class="ml-3">-->
<!--              <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>-->
<!--              <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>-->
<!--            </div>-->
<!--            <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">-->
<!--              <span class="sr-only">View notifications</span>-->
<!--              <BellIcon class="h-6 w-6" aria-hidden="true" />-->
<!--            </button>-->
<!--          </div>-->
<!--          <div class="mt-3 space-y-1 px-2">-->
<!--            <router-link v-for="item in userNavigation" :key="item.name" :to="item.href">-->
<!--              <DisclosureButton  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">{{ item.name }}</DisclosureButton>-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </div>-->
<!--      </DisclosurePanel>-->
<!--    </Disclosure>-->

    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon,   ArrowPathIcon,
  BookmarkSquareIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  LifebuoyIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  Squares2X2Icon, } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import {ref} from "vue";
const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const checked = ref(false)
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '/login' },
]

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorArrowRaysIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: Squares2X2Icon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: ArrowPathIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: LifebuoyIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkSquareIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

const visible = ref(false);
</script>

<style scoped>

</style>
