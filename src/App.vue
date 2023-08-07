<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

onMounted(async () => {
  const { Valute } = await fetch("https://www.cbr-xml-daily.ru/daily_json.js").then((res) => res.json());
  store.commit("SET_CATALOG", Object.values(Valute));
});
</script>

<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link class="nav-link" to="/catalog">Catalog</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/converter">Converter</router-link>
    </li>
  </ul>
  <router-view />
</template>

<style>
body {
  margin: 20px;
}

.router-link-active {
  color: grey;
}
</style>
