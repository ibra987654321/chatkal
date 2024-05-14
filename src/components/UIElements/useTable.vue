<template>
  <div class="container mx-auto">
    <!-- Кнопка для открытия модального окна -->
    <button @click="showModal = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Создать
    </button>

    <!-- Модальное окно -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div class="bg-white p-6 rounded-md">
        <h2 class="text-lg font-semibold mb-4">Создать новый объект</h2>
        <!-- Форма для создания нового объекта -->
        <form @submit.prevent="saveData">
          <div class="mb-4">
            <label for="title" class="block text-sm font-semibold mb-1">Название:</label>
            <input type="text" id="title" v-model="newItem.title" class="w-full border-gray-300 rounded-md px-3 py-2">
          </div>
          <!-- Добавьте другие поля формы по мере необходимости -->
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Сохранить</button>
            <button @click="showModal = false" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Отмена</button>
          </div>
        </form>
      </div>
    </div>


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>
          <th scope="col" class="px-6 py-3">
            Название
          </th>
          <th scope="col" class="px-6 py-3">
            Действия
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in items" :key="item.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ item.id }}
          </th>
          <td class="px-6 py-4">
            {{ item.title }}
          </td>
          <td class="px-6 py-4">
            <button @click="editedItem(item)" type="button" class=" text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              Изменить
            </button>
            <button @click="deleteData(item)" type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
              Удалить
            </button>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // Массив для хранения данных
      newItem: { title: '' }, // Новый объект
      showModal: false,
      editedIndex: -1,
    }
  },
  mounted() {
    for (let i = 0; i < 9; i++) {
      this.items.push({id: i, title: 'center' + i})
    }
  },
  methods: {
    // Функция для загрузки данных из API
    loadData() {
      // Ваш запрос для загрузки данных из API
    },
    // Функция для добавления новых данных
    saveData() {
      try {
        if (this.editedIndex > -1) {
          this.items = this.items.map(i => {
            if (i.id === this.newItem.id) {
              return this.newItem
            }
            return i
          })
          this.showModal = false;
          return
        }
        this.showModal = false;
        this.items.push({id: Date.now(), title: this.newItem.title })
      } catch (e) {
        console.log(e)
      } finally {
        this.showModal = false;
        this.newItem = {title: null}
      }
    },
    editedItem(item) {
      this.showModal = true
      this.editedIndex = this.items.indexOf(item)
      this.newItem = {...item}
    },
    // Функция для обновления данных
    updateData(id) {
      // Ваш запрос для обновления данных через API
      // После успешного обновления, загрузите обновленные данные
      this.loadData();
    },
    // Функция для удаления данных
    deleteData(id) {
      // Ваш запрос для удаления данных через API
      // После успешного удаления, загрузите обновленные данные
      this.loadData();
    }
  }
}
</script>
