<template>
  <div class="text-center">
    <p class="text-h1 text-weight-bolder q-my-lg text-amber-10">{{ title }}</p>
    <p class="text-h5 q-my-md">URL: {{ store.getters.url }}</p>
    <p class="text-h5 q-my-md">name: {{ store.getters.username }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  toRef,
  Ref,
} from 'vue';
import { useStore, loginModule } from 'src/store';

export default defineComponent({
  name: 'ServiceComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup (props) {
    const store = useStore()
    return { store }
  },
});
</script>
