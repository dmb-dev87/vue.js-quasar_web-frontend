<template>
  <q-page class="row justify-evenly q-pa-lg" style="display: list-item;">
    <q-list>
      <q-item
        class="q-py-md"
        clickable
        v-for="service in services"
        style="border-bottom: 2px solid grey;"
        :href="`#/services/${service.id}`"
      >
        <div class="row">
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.contact')}}: </span>
            <span class="text-body1 text-weight-medium">{{ service.contact }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.passengers') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.passengers }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.vehicle') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.car_name }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.pickup_date') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.realstartdatetime }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.pickup') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.realstartplace }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.dropoff') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.realendplace }}</span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.pagamento_autista') }}: </span>
            <span v-if="service.pay_to_driver" class="text-body1 text-weight-bolder text-red-14">
              <q-icon name="euro" />
              {{ service.to_be_paid.toFixed(2) }}
            </span>
            <span v-else class="text-body1 text-weight-medium text-positive">
              {{ "NO" }}
            </span>
          </div>
          <div
            class="col-12 q-mb-xs"
          >
            <span class="text-body1 text-weight-bolder">{{ $t('message.service_type') }}: </span>
            <span class="text-body1 text-weight-medium">{{ service.servicetype }}</span>
          </div>
        </div>
      </q-item>
    </q-list>
    <div
      v-if="!loaded"
      class="row justify-center"
    >
      <p class="text-h5 text-negative">{{ $t('message.no_available_services') }}</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import ServiceInterface from 'src/models/Services'
import { getServices } from 'src/services/ServicesDataService'

export default defineComponent({
  name: 'ServiceOne',
  setup () {
    const $q = useQuasar()

    const services = ref<ServiceInterface[]>([])
    const loaded = ref(true)

    const router = useRouter()

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
      loaded,
      router
    }
  },
  methods: {
    gotoDetails (id: string) {
      this.router.push(`/services/${id}`)
    }
  }
});
</script>
