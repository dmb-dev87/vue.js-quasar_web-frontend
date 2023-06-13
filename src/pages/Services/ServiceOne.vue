<template>
  <q-page class="row justify-evenly q-pa-lg" style="display: list-item;">
    <div
      v-if="!loaded"
      class="row justify-center"
    >
      <p class="text-h5 text-negative">{{ $t('message.no_available_services') }}</p>
    </div>
    <div
      class="row q-py-xs"
      style="border-bottom: 2px solid grey;"
      v-for="service in services"
    >
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.contact')}}: </span>
        <span class="text-body1 text-weight-medium">{{ service['contact'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.passengers') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['passengers'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.vehicle') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['car_name'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.pickup_date') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['realstartdatetime'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.pickup') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['realstartplace'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.dropoff') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['realendplace'] }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.pagamento_autista') }}: </span>
        <span class="text-body1 text-weight-medium text-positive">{{ service['pay_to_driver'] ? "YES" : "NO" }}</span>
      </div>
      <div
        class="col-12 q-mb-xs"
      >
        <span class="text-body1 text-weight-bolder">{{ $t('message.service_type') }}: </span>
        <span class="text-body1 text-weight-medium">{{ service['servicetype'] }}</span>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import ServiceComponent from 'components/ServiceComponent.vue';
import { defineComponent, onBeforeMount } from 'vue';
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { getServices } from 'src/services/ServicesDataService';

export default defineComponent({
  name: 'ServiceOne',
  components: { ServiceComponent },
  setup (props) {
    const $q = useQuasar()

    const services = ref([])
    const loaded = ref(true)

    onBeforeMount(async () => {
      $q.loading.show()
      await getServices()
        .then((response: any) => {
          services.value = response.data.results
          loaded.value = services.value.length > 0 ? true : false
        }).catch((e: any) => {
          services.value = []
          loaded.value = false
        })
      $q.loading.hide()
    })

    return {
      services,
      loaded
    }
  },
});
</script>
