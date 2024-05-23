<template>
  <div class="relative">

    <div v-if="$store.state.isOpen" @click="$store.commit('setOpen', false)" class="fixed inset-0 bg-black opacity-50 z-30"></div>

    <div :class="{ 'translate-x-full': !$store.state.isOpen, 'translate-x-0': $store.state.isOpen }"
         class="fixed inset-y-0 right-0 z-40 max-w-2xl  bg-gray-300 overflow-y-auto ease-in-out transition-all duration-300 transform">
<!--      <router-link-->
<!--          to="login"-->
<!--          class="ml-8 text-sm inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"-->
<!--      >Выйти</router-link>-->
      <div  v-if="admin" class="relative mx-auto bg-white shadow-md rounded-md overflow-hidden">

        <div v-if="!isEdit" class="px-6 pt-4 font-bold text-lg">Номер участка: {{location.location}}</div>
        <div v-if="isEdit" class="px-6 pt-4 font-bold text-lg">
          Номер участка:
          <input v-model="location.location"
                 class="w-10 px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <p v-if="!isEdit" class="px-6 text-gray-700 text-base" @click="isEdit = !isEdit">
          <span class="font-semibold">Улица: </span> {{location.name}} <br>
        </p>
        <div v-if="isEdit" class="px-6 py-4">
          <span class="font-semibold">Улица </span>
          <input v-model="location.name"
                 class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
        </div>
        <div>
          <div class="px-6 py-4" style="border: 3px solid red; border-radius: 10px; margin: 3px" v-for="(house, houseIndex) in location.house" :key="house.id">
            <div class="flex items-center mb-6">
              <p v-if="!house.isEdit" class="text-gray-700 text-base" @click="house.isEdit = !house.isEdit">
                <span class="font-semibold">Адрес: </span> {{house.address}}<br>
              </p>
              <div v-if="house.isEdit" class="flex  items-center">
                <span class="font-semibold">Адрес</span>
                <input v-model="house.address"
                       class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              <button @click="deleteHouse(house.id)" class="text-xs ml-2 mt-3 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Удалить дом</button>
              <button @click="changeHouse(house)" class="text-xs ml-2 mt-3 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Сохранить дом</button>
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
        <div class="mb-4">
          <button v-if="!isEdit" @click="isEdit = !isEdit" class="ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Изменить</button>
          <button v-if="isEdit" @click="saveChanges" class="ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Сохранить</button>
          <button v-if="isEdit" @click="cancelEdit" class="ml-2 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-lg">Отмена</button>
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
                  <p class="text-gray-700">Владелец</p>
                </div>
                <div  v-for="(house, houseIndex) in location.house">
                  <div class="flex p-4 border-t border-gray-300 text-gray-700">
                    <div class="flex-1 inline-flex items-center" >
                      <svg class="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"></path>
                      </svg>
                      <p><span class="text-gray-900 font-bold">{{location.house.length}}</span> Дом</p>
                    </div>
                    <div class="flex-1 inline-flex items-center">
                      <svg class="h-6 w-6 text-gray-600 fill-current mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"></path>
                      </svg>
                      <p><span class="text-gray-900 font-bold">{{house.families.length}}</span> Семья</p>
                    </div>
                  </div>
                  <div class="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100" v-for="family in house.families">
                    <div class="text-xs uppercase font-bold text-gray-600 tracking-wide">Состав семии: {{family.familyName}}</div>
                    <div class="flex items-center pt-2 mt-1" v-for="person in family.person">
                      <div class="bg-cover bg-center w-10 h-10 rounded-full mr-3" style="background-image: url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)">
                      </div>
                      <div>
                        <p class="font-bold text-gray-900">{{ person.name }} {{ person.surname }}</p>
                        <div class="flex">
                          <p class="text-sm text-gray-700">{{ person.status }}</p>
                          <p class="text-sm text-gray-700">{{ person.status }}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {getToken, parseJwt} from "@/helpers/helpers";
import { environment } from "@/environments/environment";
import useTable from "@/components/UIElements/useTable";
import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/fetchPoint";

export default {
  name: "SidebarForData",
  components: { useTable },
  data() {
    return {
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
      .then(() => {
        const newFamily = JSON.parse(JSON.stringify(this.defaultFamily));
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
    async saveChanges() {
      const updatedLocation = JSON.parse(JSON.stringify(this.location));

      // Отправляем скопированные данные на сервер
      await axios({
        method: 'PUT',
        url: environment.authAPI + '/api/sector/update',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        data: updatedLocation,
      }).then(() => {
        // Если запрос успешно отправлен, устанавливаем флаг isEdit в false
        this.isEdit = false;
      });
    },

    cancelEdit() {
      // Handle cancel edit logic
      this.isEdit = false;
    }
  },
  watch: {
    '$store.state.isOpen'(v) {

      if (v) {
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
