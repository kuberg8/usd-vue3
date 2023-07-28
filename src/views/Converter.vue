<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { sym, currencyFormat } from "@/utils/utils";

let toggleSelect = ref(false);
let currency = ref(null);
let switchCurrency = ref(false);
let inputValue = ref("");

const store = useStore();

let catalog = computed(function () {
  return store.state.catalog;
});

const getValue = () => {
  if (!currency.value || !inputValue.value) return null;

  const { Value, Nominal } = currency.value;

  const unit = Value / Nominal;
  return (switchCurrency.value ? unit * inputValue.value : inputValue.value / unit).toFixed(4);
};

const setCurrency = (item) => {
  currency.value = item;
  toggleSelect.value = false;
};
</script>

<template>
  <h1>Converter</h1>
  <div class="converter">
    <div>
      <div class="input-group">
        <span class="input-group-text">{{ sym(switchCurrency && currency ? currency.CharCode : "RUB") }}</span>
        <input type="number" v-model="inputValue" class="form-control" />
      </div>
    </div>

    <div class="converter__button">
      <button @click="currency && (switchCurrency = !switchCurrency)" type="button" class="btn btn-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
          ></path>
        </svg>
      </button>
    </div>

    <div>
      <div class="input-group">
        <input :value="currencyFormat.format(getValue())" type="text" class="form-control" disabled />
        <button
          @click="toggleSelect = !toggleSelect"
          class="btn btn-outline-secondary dropdown-toggle"
          :class="{ show: toggleSelect }"
        >
          {{ currency ? sym(switchCurrency ? "RUB" : currency.CharCode) : "?" }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end" :class="{ show: toggleSelect, pos: toggleSelect }">
          <li @click="setCurrency(item)" v-for="(item, i) in catalog" :key="i" class="dropdown-item">
            {{ item.CharCode }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.converter {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  gap: 20px;
  flex-wrap: wrap;
}

.converter__button {
  display: flex;
  justify-content: center;
}

.pos {
  position: absolute;
  inset: 0px 0px auto auto;
  margin: 0px;
  transform: translate3d(0px, 40px, 0px);
  overflow: auto;
  height: 300px;
}
</style>
