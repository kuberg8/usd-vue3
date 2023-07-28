<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import CurrencyList from "@/components/CurrencyList.vue";

const store = useStore();

let catalog = computed(function () {
  return store.state.catalog;
});
</script>

<template>
  <h1>Catalog</h1>
  <CurrencyList :list="catalog" />
</template>
