<template>
  <q-page class="row items-center justify-evenly">
    <service-component
      :title="title"
      active
    ></service-component>
  </q-page>
</template>

<script lang="ts">
import ServiceComponent from 'components/ServiceComponent.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ServiceComponent },

  data () {
    return {
      title: `${this.$t('message.services')} Four`
    }
  }
});
</script>
