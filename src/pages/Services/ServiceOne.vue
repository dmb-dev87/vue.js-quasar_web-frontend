<template>
  <q-page class="row justify-evenly q-pa-lg" style="display: list-item;">
    <div
      v-if="!loaded"
      class="row justify-center"
    >
      <p class="text-h5 text-negative">No Services Available</p>
    </div>
    <div
      class="row q-py-xs"
      style="border-bottom: 2px solid grey;"
      v-for="service in services"
    >
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Contact: </span>
        <span class="text-body1 text-weight-medium">{{ service['contact'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Passengers: </span>
        <span class="text-body1 text-weight-medium">{{ service['passengers'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Vehicle: </span>
        <span class="text-body1 text-weight-medium">{{ service['car_name'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Pickup Date: </span>
        <span class="text-body1 text-weight-medium">{{ service['realstartdatetime'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Pickup: </span>
        <span class="text-body1 text-weight-medium">{{ service['realstartplace'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Dropoff: </span>
        <span class="text-body1 text-weight-medium">{{ service['realendplace'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Payment to driver: </span>
        <span class="text-body1 text-weight-medium text-positive">{{ service['pay_to_driver'] ? "YES" : "NO" }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">Service type: </span>
        <span class="text-body1 text-weight-medium">{{ service['servicetype'] }}</span>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import ServiceComponent from 'components/ServiceComponent.vue';
import { defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import axios from 'axios';
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { getBaseUrl } from 'src/boot/axios';

export default defineComponent({
  name: 'ServiceOne',
  components: { ServiceComponent },
  setup (props) {
    const $q = useQuasar()

    const store = useStore()

    const url = store.getters.url
    const username = store.getters.username
    const token = store.getters.token
    const services = ref([])
    const loaded = ref(true)

    const api = axios.create({
      baseURL: getBaseUrl(url),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    onBeforeMount(async () => {
      $q.loading.show()
      await api.get(
        `/api/services/?userId=${username}&token=${token}`
      ).then((response: any) => {
        services.value = response.data.results
        loaded.value = services.value.length > 0 ? true : false
      }).catch((e : any) => {
        services.value = []
        loaded.value = false
      })
      $q.loading.hide()
    })

    return {
      store,
      services,
      loaded
    }
  },
});
</script>
