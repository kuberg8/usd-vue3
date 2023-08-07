<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

let info = computed(() => store.getters['GET_BY_ID'](route.params.id))
</script>

<template>
  <div v-if="info">
    <router-link to="/catalog">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        />
      </svg>
      Назад
    </router-link>
    <h1>{{ info.Name }}</h1>
    <h2>{{ info.Nominal }} {{ info.CharCode }} - {{ info.Value }} RUB</h2>
    <pre>{{ JSON.stringify(info, null, 3) }}</pre>
  </div>
  <div v-else>404</div>
</template>
