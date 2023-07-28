<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
  switchCurrency: {
    type: Boolean,
    default: false,
  },
});

const getValue = (item) => {
  if (item.Nominal > item.Value) {
    return item.Nominal * item.Value;
  } else {
    return (item.Nominal / item.Value).toFixed(4);
  }
};

const getDif = (item) => {
  return (item.Value - item.Previous).toFixed(4);
};
</script>

<template>
  <li class="list-group-item">
    <h6>{{ props.item.Name }}</h6>
    {{ props.item.Nominal }} {{ props.switchCurrency ? "RUB" : props.item.CharCode }} -
    {{ props.switchCurrency ? getValue(props.item) : props.item.Value }}
    {{ props.switchCurrency ? props.item.CharCode : "RUB" }}
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
    <!-- <pre>{{ JSON.stringify(props.item, null, 3) }}</pre> -->
  </li>
</template>
