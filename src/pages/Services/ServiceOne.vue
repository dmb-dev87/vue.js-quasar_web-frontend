<template>
  <q-page class="row items-center justify-evenly">
    <div class="text-center">
      <p class="text-h1 text-weight-bolder q-my-lg text-amber-10">Service One</p>
      <p class="text-h5 q-my-md">URL: {{ store.getters.url }}</p>
      <p class="text-h5 q-my-md">name: {{ store.getters.username }}</p>
      <p class="text-h5 q-my-md">token: {{ store.getters.token }}</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import ServiceComponent from 'components/ServiceComponent.vue';
import { defineComponent } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'IndexPage',
  components: { ServiceComponent },
  setup (props) {
    const store = useStore()
    return { store }
  },
});
</script>
