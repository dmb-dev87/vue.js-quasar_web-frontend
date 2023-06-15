<template>
  <q-page padding>
    <div class="q-pa-md row items-start" v-if="loaded">
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
      <q-card class="row q-mb-md" style="width: 100%;" bordered flat>
        <q-card-section class="bg-grey-12" style="width: 100%;">
          <div class="text-h6">{{ $t('message.dettagli_prenotazione') }}</div>
        </q-card-section>
        <q-card-section class="q-pa-lg" style="width: 100%;">
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.service_type')}: ` }}</span>
            <span>{{ service?.servicetype }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.passengers')}: ` }}</span>
            <span>{{ service?.passengers }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.vehicle')}: ` }}</span>
            <span>{{ service?.car_name }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.pickup_date')}: ` }}</span>
            <span>{{ service?.realstartdatetime }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.pickup')}: ` }}</span>
            <span>{{ service?.realstartplace }}</span>
          </div>
          <div class="text-body q-py-sm">
            <span class="text-weight-bolder">{{ `${$t('message.dropoff')}: ` }}</span>
            <span>{{ service?.realendplace }}</span>
          </div>
        </q-card-section>
        <q-card-actions class="justify-center" style="width: 100%; border-top: 1px solid #e0e0e0;">
          <q-btn color="amber-10" flat :href="`#/seedraft/${service?.id}`">
            See Draft
          </q-btn>
        </q-card-actions>
      </q-card>
      <q-card class="row q-mb-md" style="width: 100%;" bordered flat>
        <q-card-section class="bg-grey-12" style="width: 100%;">
          <div class="text-h6">{{ $t('message.pagamento_autista') }}</div>
        </q-card-section>
        <q-card-section class="q-pa-sm" style="width: 100%;">
          <div class="q-py-sm text-h4 text-weight-bolder text-center text-red-14">
            {{ service?.to_be_paid.toFixed(2) }}
          </div>
        </q-card-section>
      </q-card>
      <q-card class="row" style="width: 100%;" flat>
        <q-card-actions v-if="!accepted" class="q-py-lg" align="around" style="width: 100%;">
          <q-btn color="amber-10" flat @click="accept">
            Accept
          </q-btn>
          <q-btn color="red-10" flat @click="reject">
            Reject
          </q-btn>
        </q-card-actions>
        <q-card-actions v-else-if="started" class="q-py-lg" align="around" style="width: 100%;">
          <q-btn color="amber-10" flat @click="accept">
            <div>
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="fas fa-file-alt" />
              </div>
              <div class="row">
                Press
              </div>
            </div>
          </q-btn>
          <q-btn color="amber-10" flat @click="end">
            <div>
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="fas fa-stop" />
              </div>
              <div class="row">
                Ends
              </div>
            </div>
          </q-btn>
          <q-btn color="amber-10" flat @click="costed = true">
            <div>
              <div class="row justify-center items-center q-mb-sm">
                <q-icon name="fas fa-money-check-alt" />
              </div>
              <div class="row">
                Cost
              </div>
            </div>
          </q-btn>
        </q-card-actions>
        <q-card-actions v-else class="q-py-lg" align="around" style="width: 100%;">
          <q-btn color="amber-10" flat @click="start">
            Start
          </q-btn>
          <q-btn color="red-10" flat @click="costed=true">
            Cost
          </q-btn>
        </q-card-actions>
      </q-card>
      <q-dialog v-model="costed" title="Add Cost" position="bottom">
        <q-card class="row rounded-borders" style="width: 100%;" bordered flat>
          <q-card-section style="width: 100%;">
            <div class="text-h6">Add Cost</div>
          </q-card-section>
          <q-card-section class="q-pa-sm" style="width: 100%;">
            <q-list>
              <q-item
                clickable
                :href='`#/servicecost/${service?.id}`'
              >
                <q-item-section avatar>
                  <q-icon name="far fa-map"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>On the service</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="fas fa-car"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>On the vehicle</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="error">
        <q-card>
          <q-card-section>
            <div class="text-h6">Error</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            Minimu km {{ service?.start_kms }}. In case km are correct contact your manager!
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useQuasar, QSpinnerDots } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, onBeforeMount, ref } from 'vue'
import ServiceDetailInterface from 'src/models/Services';
import { getService, acceptService, startService } from 'src/services/ServicesDataService';

export default defineComponent({
  name: 'ServiceDetails',
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const service = ref<ServiceDetailInterface>()
    const loaded = ref(false)

    const id = router.currentRoute.value.params.id

    const accepted = ref(false)
    const started = ref(false)
    const error = ref(false)
    const costed = ref(false)

    const km = ref()

    onBeforeMount(async () => {
      $q.loading.show({
        spinner: QSpinnerDots,
        spinnerColor: 'amber-10',
        spinnerSize: 100
      })
      await getService(id)
        .then((response: any) => {
          service.value = response.data.results[0]
          console.log("+++++++++++++++", service.value)
          km.value = service.value?.start_kms
          loaded.value = service.value ? true : false
        }).catch((e: any) => {
          loaded.value = false
        })
      $q.loading.hide()
    })

    const acceptedService =async (id: any, accetped: string) => {
      await acceptService(id, accetped)
        .then((res: any) => {
          console.log("+++++++++++++++", res.data)
        }).catch((e: any) => {
          console.log(e)
        })
    }

    const startedService =async (id: any, kmdata: any) => {
      await startService(id, kmdata)
        .then((res: any) => {
          console.log("+++++++++++++++", res.data)
        }).catch((e: any) => {
          console.log(e)
        })
    }

    const accept = () => {
      $q.dialog({
        message: 'Are you sure you want to accept the services?',
        cancel: true,
      }).onOk(() => {
        acceptedService(id, 'accepted')
      }).onCancel(() => {
        accepted.value = false
      })
    }

    const reject = () => {
      $q.dialog({
        message: 'Are you sure you want to refuse the services?',
        cancel: true,
      }).onOk(() => {

      }).onCancel(() => {

      })
    }

    const start = () => {
      $q.dialog({
        title: 'Start Service',
        cancel: true,
        prompt: {
          model: '',
          placeholder: 'Enter the initial km',
          isValid: val => val.length > 0,
          type: 'number'
        }
      }).onOk(async (data) => {
        error.value = !(data >= km.value)
        started.value = (data >= km.value)

        if (data >= km.value) {
          startedService(id, data)
        }
      }).onCancel(() => {
        started.value = false
      })
    }

    const end = () => {
      $q.dialog({
        title: 'End Service',
        cancel: true,
        prompt: {
          model: '',
          placeholder: 'Enter the Final km',
          type: 'number'
        }
      }).onOk((data) => {
      }).onCancel(() => {
      })
    }

    return {
      service,
      loaded,
      accept,
      reject,
      accepted,
      start,
      error,
      started,
      end,
      costed,
      acceptedService
    }
  }
})
</script>
