<template>
  <div>
    <div v-if="$store.state.isOpen" @click="$store.commit('setOpen', false)" class="fixed inset-0 bg-black opacity-50 z-40"></div>
    <div :class="{ 'translate-x-full': !$store.state.isOpen, 'translate-x-0': $store.state.isOpen }"
         class="fixed inset-y-0 right-0 z-50 w-70 bg-gray-300 overflow-y-auto ease-in-out transition-all duration-300 transform">
      <div class="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div class="px-6 pt-4 font-bold text-lg">{{location.number}}</div>
        <div>
          <div class="px-6 py-4" v-for="house in location.houses">
            <p class="text-gray-700 text-base">
              <span class="font-semibold">Улица:</span> {{house.name}}<br>
<!--              <span class="font-semibold">Количество домов:</span> 3<br>-->
              <!-- Добавьте любые другие сведения о участке -->
            </p>
            <div  v-for="family in house.families">
              <div class="font-bold text-lg my-2 ">Состав семьи: {{family.name}}</div>
              <ul class="text-gray-700 text-base" >
                <li v-for="person in family.persons">
                  <div @click="person.criminal = true" v-if="!person.criminal">
                    <span class="font-semibold">{{ person.name }}</span> - {{person.status}} ({{person.criminal}})
                  </div>
                  <div v-else class="relative py-2">
                    <input v-model="person.name" type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border border-gray-800 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Имя</label>
                  </div>
                </li>
                <!-- Добавьте любые другие члены семьи -->
              </ul>
            </div>
<!--            <div class="font-bold text-lg mb-2">Имущество</div>-->
<!--            <ul class="list-disc text-gray-700 pl-6">-->
<!--              <li>Дом с двумя этажами и пятью комнатами.</li>-->
<!--              <li>Двор с площадкой для отдыха и местом для барбекю.</li>-->
<!--              <li>Сад с фруктовыми деревьми и огородом.</li>-->
<!--              &lt;!&ndash; Добавьте любые другие элементы имущества &ndash;&gt;-->
<!--            </ul>-->
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import {getToken} from "@/helpers/fetchPoint";
import {environment} from "@/environments/environment";

export default {
  name: "SidebarForData",
  data:() => ({
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJBRE1JTiJdLCJpYXQiOjE3MTU2ODgzNjAsImV4cCI6MTcxNTcwMjc2MH0.KIBEIvYECFbaz_nnWQ_izNDS5JfJrzgL_SU5cw5bCe8',
      "location": {
        "number": "Номер участка",
        "id": "ID участка",
        "houses": [
          {
            "address": "Адрес дома 1",
            "name": "Название дома 1",
            "families": [
              {
                "name": " семьи 1",
                "persons": [
                  {
                    "name": "Имя члена семьи 1",
                    "status": "Статус члена семьи 1",
                    "criminal": false
                  },
                  {
                    "name": "Имя члена семьи 2",
                    "status": "Статус члена семьи 2",
                    "criminal": true
                  }
                ]
              },
              {
                "name": " семьи 2",
                "persons": [
                  {
                    "name": "Имя члена семьи 3",
                    "status": "Статус члена семьи 3",
                    "criminal": false
                  }
                ]
              }
            ]
          },
          {
            "address": "Адрес дома 2",
            "name": "Название дома 2",
            "families": [
              {
                "name": "Фамилия семьи 3",
                "persons": [
                  {
                    "name": "Имя члена семьи 4",
                    "status": "Статус члена семьи 4",
                    "criminal": false
                  },
                  {
                    "name": "Имя члена семьи 5",
                    "status": "Статус члена семьи 5",
                    "criminal": false
                  }
                ]
              }
            ]
          }
        ]
      }
  }),
  mounted() {
    axios({
      method: 'GET',
      url: environment.authAPI + '/api/sector/findAllById/1',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
    .then(r => {
      console.log(r.data)
    })
  }
}
</script>

<style scoped>

</style>