<script setup>
import { defineProps, inject } from 'vue'

const addItem = inject('addItem')
const deleteItem = inject('deleteItem')

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  switchCurrency: {
    type: Boolean,
    default: false,
  },
  isFavorited: {
    type: Boolean,
    default: false,
  },
})

const getValue = (item) => {
  if (item.Nominal > item.Value) {
    return item.Nominal * item.Value
  } else {
    return (item.Nominal / item.Value).toFixed(4)
  }
}

const getDif = (item) => {
  return (item.Value - item.Previous).toFixed(4)
}
</script>

<template>
  <li class="list-group-item">
    <div class="d-flex align-items-center">
      <div>{{ props.item.Name }}</div>
      <svg
        v-if="isFavorited"
        @click="deleteItem(props.item.index)"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-heart-fill svg"
        viewBox="0 0 16 16"
      >
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
      <svg
        v-else
        @click="addItem({ ...props.item })"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-heart svg"
        viewBox="0 0 16 16"
      >
        <path
          d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
        />
      </svg>
    </div>
    {{ props.item.Nominal }} {{ props.switchCurrency ? 'RUB' : props.item.CharCode }} -
    {{ props.switchCurrency ? getValue(props.item) : props.item.Value }}
    {{ props.switchCurrency ? props.item.CharCode : 'RUB' }}
    <small :style="{ color: getDif(props.item) > 0 ? 'green' : 'red' }">
      (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-down"
        viewBox="0 0 16 16"
        :style="{
          transform: getDif(props.item) > 0 ? 'rotate(180deg)' : null,
        }"
      >
        <path
          fill-rule="evenodd"
          d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
        />
      </svg>
      {{ getDif(props.item) }})
    </small>
    <br />
    <router-link :to="`catalog/${props.item.ID}`"> Перейти </router-link>
  </li>
</template>

<style scoped>
.svg {
  margin-left: 10px;
  cursor: pointer;
}
</style>
