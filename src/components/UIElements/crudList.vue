<template>
  <table class="table-fixed" style="width: 100%;">
    <thead>
    <tr>
      <th class="text-xs">Название</th>
      <th class="text-xs">Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, idx) in dataArr" :key="idx">
      <td>
        <input
            v-model="item.holdingName"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600">
      </td>
      <td>
        <template v-if="isEditing(item)">
          <button @click="saveChanges(item)" class="text-xs ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">Сохранить</button>
          <button @click="cancelEdit(item)" class="text-xs ml-2 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded-lg">Отмена</button>
        </template>
        <template v-else>
          <button @click="deleteItem(item.id)" class="text-xs ml-2 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded-lg">Удалить</button>
        </template> </td>
    </tr>
    </tbody>
    <button @click="addItem" class=" ml-2 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded-lg">+</button>
  </table>
</template>

<script>
import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/fetchPoint";
import {environment} from "@/environments/environment";

export default {
  props: {
    arr: Array,
    userId: Number
  },
  name: "crudList",
  data() {
    return {
      isEditModalOpen: false,
      dataArr: [],
      editedUser: {
        "id": 0,
        "holdingName": ""
      },
      defaultItem: {
          "id": 0,
          "holdingName": ""
      },
      editedIndex: 1
    };
  },
  mounted() {
    getAxios(`${environment.authAPI}/api/holding/findAllByPersonId/${this.$props.userId}`)
        .then(r => {
          this.dataArr = r
        })
  },
  methods: {
    saveChanges(item) {
      // Предположим, здесь у вас будет ваша логика сохранения изменений
      // После успешного сохранения изменений сбрасываем originalName до текущего значения holdingName
      item.originalName = item.holdingName;
      item.person_id = this.$props.userId
      putAxios(`${environment.authAPI}/api/holding/update`, item)
          .then(() => {
            this.$emit('arr-changed', {id: this.$props.userId, arr: this.$props.arr});
          })

    },
    cancelEdit(item) {
      // Восстанавливаем значение holdingName до исходного значения originalName
      item.holdingName = item.originalName;
      // Снова показываем кнопку "Удалить"
      item.originalName = null; // Сбрасываем originalName
    },
    addItem() {
      const newItem = { ...this.defaultItem };
      newItem.person_id = this.$props.userId
      postAxios(`${environment.authAPI}/api/holding/save`, newItem)
          .then((r) => {
            this.dataArr.push(r)
            this.$emit('arr-changed', {id: this.$props.userId, arr: this.$props.arr});
          })

    },
    deleteItem(id) {
      deleteAxios(`${environment.authAPI}/api/holding/delete/${id}`)
      .then(() => {
        const index = this.dataArr.findIndex(item => item.id === id);
        if (index !== -1) {
          this.dataArr.splice(index, 1);
          this.$emit('arr-changed', {id: this.$props.userId, arr: this.$props.arr});
        }
      })

    },
    isEditing(item) {
      // Проверяем, есть ли у элемента свойство originalName (в котором сохранено исходное значение holdingName)
      if (!item.hasOwnProperty('originalName')) {
        // Если свойства originalName нет, сохраняем текущее значение holdingName в нем
        item.originalName = item.holdingName;
        // По умолчанию элемент редактируется, так как его значение изменилось
        return true;
      } else {
        // Если свойство originalName уже существует, сравниваем текущее значение holdingName с исходным
        if (item.holdingName !== item.originalName) {
          // Если значения отличаются, элемент редактируется
          return true;
        } else {
          // Если значения совпадают, элемент не редактируется
          return false;
        }
      }
    }
  }
}
</script>

<style scoped>

</style>