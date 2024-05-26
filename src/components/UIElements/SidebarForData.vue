<template>
  <div class="relative">

    <div v-if="$store.state.isOpen" @click="$store.commit('setOpen', false)" class="fixed inset-0 bg-black opacity-50 z-30"></div>

    <div :class="{ 'translate-x-full': !$store.state.isOpen, 'translate-x-0': $store.state.isOpen }"
         class="fixed inset-y-0 right-0 z-40 max-w-2xl  bg-gray-300 overflow-y-auto ease-in-out transition-all duration-300 transform">

      <div  v-if="admin" class="relative mx-auto bg-white shadow-md rounded-md overflow-hidden">

        <div v-if="!isEdit" class="px-6 pt-4 font-bold text-lg">Номер участка: {{location.location}}</div>
        <div v-if="isEdit" class="px-6 pt-4 font-bold text-lg">
          Номер участка:
          <input v-model="location.location"
                 class="w-20 px-3 py-2 leading-tight text-gray-700 border-4 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <p v-if="!isEdit" class="px-6 text-gray-700 text-base" @click="isEdit = !isEdit">
          <span class="font-semibold">Улица: </span> {{location.name}} <br>
        </p>
        <div v-if="isEdit" class="px-6 py-4">
          <span class="font-semibold">Улица </span>
          <input v-model="location.name"
                 class="w-full px-3 py-2 leading-tight text-gray-700 border-4 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <p v-if="!isEdit" class="px-6 text-gray-700 text-base" @click="isEdit = !isEdit">
          <span class="font-semibold">Хозяин: </span> {{location.status}} <br>
        </p>
        <div v-if="isEdit" class="px-6 py-4">
          <span class="font-semibold">Хозяин </span>
          <input v-model="location.status"
                 class="w-full px-3 py-2 leading-tight text-gray-700 border-4 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div class="ml-4">
          <button v-if="!isEdit" @click="isEdit = !isEdit" class="ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Изменить</button>
          <button v-if="isEdit" @click="saveChanges" class="ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Сохранить</button>
          <button v-if="isEdit" @click="cancelEdit" class="ml-2 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-lg">Отмена</button>
        </div>
        <div>
          <div class="px-6 py-4" style="border: 3px solid red; border-radius: 10px; margin: 3px" v-for="(house, houseIndex) in location.house" :key="house.id">
            <div class="flex items-center mb-6">
              <p v-if="!house.isEdit" class="text-gray-700 text-base" @click="house.isEdit = !house.isEdit">
                <span class="font-semibold">Номер дома: </span> {{house.address}}<br>
              </p>
              <div v-if="house.isEdit" class="flex  items-center">
                <span class="font-semibold">Номер дома</span>
                <input v-model="house.address"
                       class="w-full  px-3 py-2 leading-tight text-gray-700 border-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <button v-if="house.isEdit" @click="deleteHouse(house.id)" class="text-xs ml-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Удалить дом</button>
              <button v-if="house.isEdit" @click="changeHouse(house)" class="text-xs ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Сохранить дом</button>
              <button v-if="!house.isEdit" @click="house.isEdit = !house.isEdit" class="text-xs ml-2 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded-lg">Изменить дом</button>
            </div>


            <div v-for="(family, idx) in house.families" :key="idx" class="mt-4 px-4" style="border: 3px solid green;border-radius: 10px; margin: 3px">
              <div class="flex items-center justify-between">
                <div class="font-bold text-lg my-2">Состав семьи</div>
                <div>
                  <button @click="deleteFamily(houseIndex, family.id)" class="ml-2 text-xs text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Удалить семью</button>
                </div>
              </div>
              <ul class="text-gray-700 text-base">
                <useTable :data="family.person" :family-id="family.id"/>
              </ul>
            </div>
            <button @click="addFamily(houseIndex, house.id)" class="ml-2 my-4 text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Добавить семью</button>

          </div>
          <button @click="addHouse" class="ml-2 my-4 text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Добавить дом</button>
        </div>

      </div>
      <div v-else style="width: 500px;">
          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
                <div class="bg-cover bg-center h-56 p-4" style="background-image: url(https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)">
                  <div class="flex justify-end">
                    <svg class="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                    </svg>
                  </div>
                </div>
                <div class="p-4">
                  <p class="uppercase tracking-wide text-sm font-bold text-gray-700">Номер участка • {{location.location}}</p>
                  <p class="text-3xl text-gray-900">{{location.name}}</p>
                  <p class="text-gray-700">Владелец {{location.status}}</p>
                </div>
                <div  v-for="(house, houseIndex) in location.house">
                  <div class="flex p-4 border-t border-gray-300 text-gray-700">
                    <div class="flex-1 inline-flex items-center" >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="mr-3"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>

                      <p><span class="text-gray-900 font-bold">{{location.house.length}}</span> Дом</p>
                    </div>
                    <div class="flex-1 inline-flex items-center">
                      <svg fill="#000000"    width="24"
                           height="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                           viewBox="0 0 297 297" xml:space="preserve">
                        <g>
                          <polygon points="149.367,22.541 276.86,165 297,165 149.167,0 82.167,73.846 82.167,33 49.167,33 49.167,110.307 0,165 20.435,165
                              "/>
                          <path d="M149.134,46.459L41.167,165.568V297h213V165h1.222L149.134,46.459z M103.343,226.533c-1.989,2.591-3.695,5.421-5.139,8.467
                            H74.437c0-25,11.222-35.533,26.858-38.976c-7.738-4.54-12.938-13.063-12.938-22.683c0-14.439,11.705-26.206,26.144-26.206
                            c10.188,0,19.009,5.816,23.323,14.312c-18.084,4.739-31.467,21.219-31.467,40.77c0,6.025,1.309,11.895,3.72,17.247
                            C107.58,221.554,105.354,223.912,103.343,226.533z M135.295,225.024c-7.738-4.54-12.939-13.063-12.939-22.683
                            c0-14.439,11.705-26.269,26.144-26.269s26.144,11.704,26.144,26.144c0,9.623-5.204,18.274-12.947,22.814
                            c15.641,3.44,26.867,13.97,26.867,38.97h-80.127C108.437,239,119.658,228.467,135.295,225.024z M198.795,235
                            c-1.444-3.047-3.152-5.878-5.144-8.47c-2.012-2.619-4.251-4.975-6.744-7.062c2.411-5.354,3.729-11.225,3.729-17.252
                            c0-19.875-13.827-36.568-32.366-40.988c4.348-8.405,13.115-14.155,23.23-14.155c14.439,0,26.144,11.704,26.144,26.144
                            c0,9.623-5.204,18.274-12.947,22.814c15.641,3.44,26.867,13.97,26.867,38.97H198.795z"/>
                        </g>
                        </svg>
                      <p><span class="text-gray-900 font-bold">{{house.families.length}}</span> Семья</p>
                    </div>
                  </div>
                  <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100" v-for="family in house.families">
                    <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">Состав семии</div>
                    <div class="flex items-center pt-2 mt-1" v-for="person in family.person">
                      <div class="bg-cover bg-center w-10 h-10 rounded-full mr-3">
                        <img :src="require('../../assets/avatar.png')" alt="">
                      </div>
                      <div>


<!--                        <div class="flex">-->
<!--                          <p class="text-sm mr-3 text-gray-700">{{ person.criminal ? 'Соттолгон' : 'Соттолгон эмес' }}</p>-->
<!--                          <p class="text-sm text-gray-700">{{ person.migration ? 'Мигрант' : 'Мигрант эмес' }}</p>-->
<!--                        </div>-->
                        <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 " role="alert">
                          <div class="flex items-center">
                            <p class="font-bold text-gray-900">{{ person.name }} {{ person.surname }} </p>
                            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-2 py-1 ml-2 ">
                              {{ person.status }}</button>
                          </div>

                          <div class="mt-2 mb-4 text-sm">
                            {{ person.comments }}</div>
                          <div class="flex">
                            <button type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                              <svg class="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                              </svg>
                              {{ person.criminal ? 'Соттолгон' : 'Соттолгон эмес' }}
                            </button>
                            <button type="button" class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                              {{ person.migration ? 'Мигрант' : 'Мигрант эмес' }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
      </div>
      <router-link
          to="login"
          @click="exit"
          class="m-8 text-sm inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >Выйти</router-link>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {decodeJWT, getToken, parseJwt, removeToken} from "@/helpers/helpers";
import { environment } from "@/environments/environment";
import useTable from "@/components/UIElements/useTable";
import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/fetchPoint";

export default {
  name: "SidebarForData",
  components: { useTable },
  mounted() {
  },
  data() {
    return {
      img: `background-image: url('../assets/avatar.png')`,
      location: {
        house: []
      },
      isEdit: false,
      defaultHouseItem: {
        id: 0,
        address: "",
        families: [
          {
            "id": 0,
            familyName: "",
            person: [ ]
          }
        ],
        isEdit: false
      },
      defaultFamily:    {
        familyName: "",
        person: []
      }
    };
  },
  methods: {
    addHouse() {
      let newHouse = JSON.parse(JSON.stringify(this.defaultHouseItem));
      this.defaultHouseItem.sector_id = Number(this.$store.state.text)
      postAxios(`${environment.authAPI}/api/house/save`, {id: 0, sector_id: Number(this.$store.state.text), address: 'string'})
      .then( () => {
        this.location.house.push(newHouse);
        this.isEdit = true
      })

    },
    changeHouse(item) {
      putAxios(`${environment.authAPI}/api/house/update`, {id: item.id, sector_id: Number(this.$store.state.text), address: item.address})
      .then(() => item.isEdit = false)
    },
    deleteHouse(id) {
      deleteAxios(`${environment.authAPI}/api/house/delete/${id}`)
      .then(() => {
        const index = this.location.house.findIndex(item => item.id === id);
        if (index !== -1) {
          this.location.house.splice(index, 1);
        }
        this.isEdit = true
      })

    },
    addFamily(index, id) {
      postAxios(`${environment.authAPI}/api/family/save`, {id: 0, house_id: Number(id), familyName: ''})
      .then((newFamily) => {
        // const newFamily = JSON.parse(JSON.stringify(this.defaultFamily));
        this.location.house[index].families.push(newFamily);
      })

    },
    deleteFamily(idx, id) {
      deleteAxios(`${environment.authAPI}/api/family/delete/${id}`)
      .then(() => {
        const index = this.location.house[idx].families.findIndex(item => item.id === id);
        if (index !== -1) {
          this.location.house[idx].families.splice(index, 1);
        }
        this.location = { ...this.location };
      })

    },
    exit() {
      this.$store.commit('setOpen', false)
      removeToken()
    },
    async saveChanges() {
      const updatedLocation = JSON.parse(JSON.stringify(this.location));
      putAxios(environment.authAPI + '/api/sector/update',updatedLocation)
      .then(() => this.isEdit = false)
    },

    cancelEdit() {
      // Handle cancel edit logic
      this.isEdit = false;
    }
  },
  watch: {
    '$store.state.isOpen'(v) {
      if (v) {
        if (Date.now() > decodeJWT().exp * 1000) {
          this.$router.push({name: 'login'})
          this.$store.commit('setSnackBars', 'Сессия истекло')
          return
        }
        this.$store.commit('setLoading', true)
        axios({
          method: 'GET',
          url: `${environment.authAPI}/api/sector/findAllById/${this.$store.state.text}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
          },
        }).then(r => {
          this.location = r.data;
          getAxios(`${environment.authAPI}/api/house/findAllBySectorId/${r.data.id}`)
          .then(y => {
            this.location.house = y
            this.location.house.forEach(house => {
              getAxios(`${environment.authAPI}/api/family/findAllByHouseId/${house.id}`)
                  .then(u => {
                    house.families = u
                    house.families.forEach(family => {
                      getAxios(`${environment.authAPI}/api/person/findAllByFamilyId/${family.id}`)
                          .then(i => {
                            family.person = i
                            family.person.forEach(person => {
                              person.isEdit = false;
                            })
                          })
                      family.isEdit = false;
                    })
                  })
              house.isEdit = false;
            })
            this.$store.commit('setLoading', false)
          })
        });
      }
    },
  },
  computed: {
    admin() {
      return parseJwt(getToken()).roles[0] === 'admin'
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
