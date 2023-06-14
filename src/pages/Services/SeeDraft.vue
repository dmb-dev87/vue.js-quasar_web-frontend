<template>
  <q-page padding>
    <div class="q-pa-md row items-start">
      <q-card class="row q-mb-md" style="width: 100%;" bordered flat>
        <q-card-section class="bg-grey-12" style="width: 100%;">
          <div class="text-h6">{{ service?.contact }}</div>
        </q-card-section>
        <q-card-section class="q-pa-lg" style="width: 100%;">
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.start_datetime')}: ` }}</span>
            <span>{{ service?.realstartdatetime }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.from')}: ` }}</span>
            <span>{{ service?.realstartplace }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.end_datetime')}: ` }}</span>
            <span>{{ service?.realenddatetime }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.to')}: ` }}</span>
            <span>{{ service?.realendplace }}</span>
          </div>
        </q-card-section>
        <q-card-actions class="justify-center" style="width: 100%; border-top: 1px solid #e0e0e0;">
          <q-btn color="amber-10" flat :href="`#/seedraft/${service?.id}`">
            Start Navigate
          </q-btn>
        </q-card-actions>
      </q-card>
      <q-card class="row q-mb-md" style="width: 100%;" bordered flat>
        <q-card-section class="bg-grey-12" style="width: 100%;">
          <div class="text-h6">{{ service?.contact }}</div>
        </q-card-section>
        <q-card-section class="q-pa-lg" style="width: 100%;">
          <div class="text-body q-py-sm">
            {{ `${$t('message.telefono')}: ` }}
            {{ service?.tel }}
          </div>
          <div class="text-body q-py-sm">
            {{ `${$t('message.email')}: ` }}
            {{ service?.email }}
          </div>
        </q-card-section>
        <q-card-actions style="width: 100%; border-top: 1px solid #e0e0e0; justify-content: space-evenly;">
          <q-btn flat :href="`tel:${service?.tel}`">
            <q-icon name="fas fa-phone-volume" color="amber-10" />
          </q-btn>

          <q-btn flat :href="`sms:${service?.tel}`">
            <q-icon name="fas fa-sms" color="amber-10" />
          </q-btn>

          <q-btn flat :href="`mailto:${service?.email}`">
            <q-icon name="fas fa-envelope-open-text" color="amber-10" />
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, onBeforeMount, ref } from 'vue'
import ServiceDetailInterface from 'src/models/Services';
import { getService } from 'src/services/ServicesDataService';

export default defineComponent({
  name: 'SeeDraft',
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const service = ref<ServiceDetailInterface>()
    const loaded = ref(true)

    const id = router.currentRoute.value.params.id

    onBeforeMount(async () => {
      $q.loading.show()
      await getService(id)
        .then((response: any) => {
          service.value = response.data.results[0]
          loaded.value = service.value ? true : false
        }).catch((e: any) => {
          loaded.value = false
        })
      $q.loading.hide()
    })

    return {
      service,
      loaded,
    }
  }
})
</script>
