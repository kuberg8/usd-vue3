<script setup>
import { computed, provide, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import CurrencyList from '@/components/CurrencyList.vue'
import IndexDB from '@/utils/indexDB.js'

const LIST_KEY = 'favorites'
const store = useStore()
const db = IndexDB

let favorites = ref([])
let catalog = computed(function () {
  return store.state.catalog.filter(({ ID }) => !favorites.value.some((item) => item.ID == ID))
})

const getAll = () => {
  db.getAll(LIST_KEY).then((res) => (favorites.value = res))
}

const addItem = async (item) => {
  await db.add(item, LIST_KEY)
  getAll()
}

const deleteItem = async (index) => {
  await db.delete(LIST_KEY, index)
  getAll()
}

provide('addItem', addItem)
provide('deleteItem', deleteItem)

onMounted(async () => {
  await db.open('myDB', 1, (db) => {
    if (!db.objectStoreNames.contains(LIST_KEY)) {
      db.createObjectStore(LIST_KEY, { keyPath: 'index', autoIncrement: true })
    }
  })
  getAll()
})
</script>

<template>
  <h1>Catalog</h1>
  <p v-if="favorites.length">
    <CurrencyList :list="favorites" isFavorited />
  </p>
  <CurrencyList :list="catalog" />
</template>
