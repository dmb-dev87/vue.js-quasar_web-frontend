<template>
  <q-page class="row justify-center" padding>
    <div class="col-12 col-md-6">
      <q-card square class="shadow-24">
        <q-card-section>
          <q-form @submit.prevent.stop="onSubmit" class="q-px-lg q-pt-xl q-gutter-y-lg">
            <q-select
              v-model="item"
              :options="items"
              behavior="dialog"
              label="Select an item"
            >
              <template v-slot:before>
                <q-icon name="fas fa-list" />
              </template>
            </q-select>
            <q-input
              v-model="amount"
              dense
              label="Amount"
              hint="Enter an amount"
            >
              <template v-slot:before>
                <q-icon name="fas fa-money-bill-wave" />
              </template>
            </q-input>
            <q-input
              v-model="quantity"
              dense
              label="Quantity"
              hint="Enter an amount"
            >
              <template v-slot:before>
                <q-icon name="fas fa-plus" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="quantity = 0" class="cursor-pointer" />
              </template>
            </q-input>
            <q-input
              v-model="total"
              dense
              label="Total"
              hint="Enter total"
            >
              <template v-slot:before>
                <q-icon name="fas fa-money-bill-wave" />
              </template>
            </q-input>
            <q-input
              v-model="note"
              dense
              label="Note"
              hint="Enter note"
            >
              <template v-slot:before>
                <q-icon name="far fa-sticky-note" />
              </template>
            </q-input>
            <div class="row q-py-lg justify-center">
              <div class="col-6 col-md-4">
                <q-btn size="lg" color="amber-10" class="text-white full-width" :label="$t('message.save')" type="submit" :loading="loading" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import { useQuasar, QSpinnerDots } from 'quasar'
import { useRouter } from 'vue-router';
import { getCostItems, addCost } from 'src/services/ServicesDataService'

export default defineComponent({
  name: 'ServiceCost',
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const id = router.currentRoute.value.params.id

    const item = ref("")
    const items = ref([])
    const amount = ref("")
    const quantity = ref(1)
    const total = ref("")
    const note = ref("")

    const loading = ref(false)

    onBeforeMount(async () => {
      $q.loading.show({
        spinner: QSpinnerDots,
        spinnerColor: 'amber-10',
        spinnerSize: 100
      })
      await getCostItems()
        .then((response: any) => {
          items.value = response.data.result
        }).catch((e: any) => {
          items.value = []
        })
      $q.loading.hide()
    })

    const onSubmit = async () => {
      $q.loading.show({
        spinner: QSpinnerDots,
        spinnerColor: 'amber-10',
        spinnerSize: 100
      })
      await addCost(id, item.value, amount.value, quantity.value, total.value, note.value)
        .then((response: any) => {
          console.log("+++++++++++++++", response)
        }).catch((e: any) => {
          console.log("+++++++++++++++", e.message)
        })
      $q.loading.hide()
    }

    return {
      item,
      items,
      amount,
      quantity,
      total,
      note,
      onSubmit,
      loading
    }
  }
})
</script>
