<script setup>
import { defineProps, ref, computed } from 'vue'
import CurrencyItem from './CurrencyItem.vue'

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  isFavorited: {
    type: Boolean,
    default: false,
  },
})

const inputValue = ref('')

const trimList = computed(() => {
  const value = inputValue.value.toLocaleLowerCase()
  return props.list.filter(
    ({ CharCode, Name }) =>
      !inputValue.value || CharCode.toLowerCase().includes(value) || Name.toLocaleLowerCase().includes(value)
  )
})

const switchCurrency = ref(false)
</script>

<template>
  <div class="form-check form-switch">
    <input
      v-model="switchCurrency"
      class="form-check-input"
      type="checkbox"
      role="switch"
      :id="'switch' + isFavorited || ''"
    />
    <label class="form-check-label" :for="'switch' + isFavorited || ''">switch</label>
  </div>
  <p v-if="!isFavorited">
    <input type="text" v-model="inputValue" class="form-control" />
  </p>
  <ul class="list-group">
    <CurrencyItem
      v-for="(item, i) in trimList"
      :key="i"
      :item="item"
      :switch-currency="switchCurrency"
      :isFavorited="isFavorited"
    />
  </ul>
</template>
