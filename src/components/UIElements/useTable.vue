<template>
  <div>
    <button @click="addRecord" class="text-xs text-white bg-blue-500 border-0 py-2 px-6 mb-3 focus:outline-none hover:bg-blue-600 rounded-lg">Добавить человека к семье</button>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Имя</th>
          <th scope="col" class="px-6 py-3">Фамилия</th>
          <th scope="col" class="px-6 py-3">Статус</th>
          <th scope="col" class="px-6 py-3">Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in data" :key="index" :class="{ 'bg-white': index % 2 === 0, 'bg-gray-50': index % 2 !== 0, 'dark:bg-gray-800': index % 2 === 0, 'dark:bg-gray-700': index % 2 !== 0 }" class="hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="ps-3">
                <div class="text-base font-semibold">{{ user.name }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div class="ps-3">
                <div class="text-base font-semibold">{{ user.surname }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">{{ user.status }}</td>
<!--          <td class="w-4 p-4">-->
<!--            <div class="flex items-center">-->
<!--              <input :id="'checkbox-table-search-' + (index + 1)" v-model="user.criminal" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
<!--              <label :for="'checkbox-table-search-' + (index + 1)" class="sr-only">checkbox</label>-->
<!--            </div>-->
<!--          </td>-->
<!--          <td class="w-4 p-4">-->
<!--            <div class="flex items-center">-->
<!--              <input :id="'checkbox-table-search-' + (index + 1)" v-model="user.migration" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">-->
<!--              <label :for="'checkbox-table-search-' + (index + 1)" class="sr-only">checkbox</label>-->
<!--            </div>-->
<!--          </td>-->
          <td class="px-6 py-4">
            <a href="#" @click="openEditModal(user)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Изменить</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- Edit user modal -->
    <div v-if="isEditModalOpen" class="absolute inset-0 top-0 z-40 h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="relative w-full h-full max-w-1xl p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-700">
        <!-- Modal content -->
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Изменить данные</h3>
          <button type="button" @click="closeEditModal" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.5 3.5l7 7M3.5 10.5l7-7"/>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4">
          <!-- Form inputs -->
          <div class="flex">
            <div class="mb-4">
              <label for="editName" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Имя</label>
              <input v-model="editedUser.name" type="text" id="editName" name="editName" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
            <div class="mb-4 mx-4">
              <label for="editEmail" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Фамилия</label>
              <input v-model="editedUser.surname" id="editEmail" name="editEmail" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
            <div class="mb-4">
              <label for="middleName" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Отчество</label>
              <input v-model="editedUser.middleName" type="text" id="middleName" name="editPosition" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
          </div>
          <div class="flex">
            <div class="mb-4">
              <label for="editPosition" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Статус</label>
              <input v-model="editedUser.status" type="text" id="editPosition" name="editPosition" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
            <div class="mb-4">
              <label for="relation" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Вид родства</label>
              <input v-model="editedUser.relation" type="text" id="relation" name="editName" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
            <div class="mb-4 mx-4">
              <label for="birth" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Год рождения</label>
              <input v-model="editedUser.birth" id="birth" name="editEmail" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
            </div>
          </div>
          <div class="mb-4">
            <label for="comments" class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Комментарий</label>
            <textarea
                v-model="editedUser.comments"
                type="text"
                id="comments"
                name="comments"
                style="height: 150px"
                class="w-full  px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600"
            >
              </textarea>
          </div>
          <div class="flex">
            <div class="mb-4 flex items-center justify-center">
              <div class="flex items-center">
                <input id="criminal" v-model="editedUser.criminal" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="criminal" class="block ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Судимость</label>
              </div>
            </div>
            <div class="mb-4 mx-4 flex items-center justify-center">
              <div class="flex items-center">
                <input id="migration" v-model="editedUser.migration" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="migration" class="block ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Миграция</label>
              </div>
            </div>
   <div class="mb-4 mx-4 flex items-center justify-center">
              <div class="flex items-center">
                <input id="owner" v-model="editedUser.owner" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="owner" class="block ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">Владелец</label>
              </div>
            </div>

          </div>
          <div v-if="editedIndex === -1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Информация</h3>
            <crud-list @arr-changed="handleArrChanged" :userId="editedId" :arr="editedUser.holdingList"></crud-list>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-between p-4 border-t dark:border-gray-600">
          <button v-if="editedIndex === -1" @click="deleteItem(editedUser)" class="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Удалить</button>
          <button @click="closeEditModal" class="text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Отмена</button>
          <button @click="saveChanges" class="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import crudList from "@/components/UIElements/crudList";
import {deleteAxios, postAxios, putAxios} from "@/helpers/fetchPoint";
import {environment} from "@/environments/environment";
export default {
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    familyId: Number
  },
  components: {crudList},
  data() {
    return {
      isEditModalOpen: false,
      editedUser: {
        id: 0,
        name: "",
        surname: "",
        middleName: "",
        status: "",
        additionalIncome: "",
        migration: false,
        criminal: false,
        owner: false,
        comments: "",
        relation: "",
        birth: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        surname: "",
        middleName: "",
        status: "",
        additionalIncome: "",
        migration: false,
        criminal: false,
        owner: false,
        comments: "",
        relation: "",
        birth: "",
        holdingList: [],
        livestockList: []
      },
      editedIndex: 1,
      editedId: 0,
    };
  },
  methods: {
    openEditModal(user) {
      this.editedIndex = -1;
      this.editedId = user.id;
      this.isEditModalOpen = true;
      this.editedUser = { ...user };
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editedUser = {
        id: 0,
        name: "",
        surname: "",
        middleName: "",
        status: "",
        additionalIncome: "",
        migration: false,
        criminal: false,
        owner: false,
        comments: "",
        relation: "",
        birth: "",
      }
    },
    handleArrChanged(updatedObj) {
      const index = this.$props.data.findIndex(item => item.id === updatedObj.id);
      if (index !== -1) {
        this.$props.data.splice(index, 1, { ...this.editedUser, holdingList: updatedObj.arr });
      }
    },
    deleteItem(updatedObj) {
      deleteAxios(`${environment.authAPI}/api/person/delete/${updatedObj.id}`)
      .then(() => {
        const index = this.$props.data.findIndex(item => item.id === updatedObj.id);
          this.$props.data.splice(index, 1);
        this.closeEditModal();
      })

    },
    saveChanges() {
      if (this.editedIndex === -1) {
        this.editedUser.family_id = this.$props.familyId
        putAxios(`${environment.authAPI}/api/person/update`, this.editedUser)
        .then(() => {
          const index = this.$props.data.findIndex(item => item.id === this.editedUser.id);
          if (index !== -1) {
            this.$props.data.splice(index, 1, this.editedUser);
          }
          this.closeEditModal();

        })

      } else {
        this.editedUser.family_id = this.$props.familyId
        postAxios(`${environment.authAPI}/api/person/save`, this.editedUser)
            .then(r => {
              this.$props.data.push(r);
              this.closeEditModal();
            })
        .catch(e => {
          this.$store.commit('setSnackBars', e)
        })

      }

    },
    addRecord() {
      this.editedIndex = 1;
      this.isEditModalOpen = true;
      this.editedUser = this.defaultItem;
    }
  }
};
</script>
