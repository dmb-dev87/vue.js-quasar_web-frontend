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
import { defineComponent, ref } from 'vue'

const items = [
  "Motorway toll",
  "Ovemight"
]

export default defineComponent({
  name: 'ServiceCost',
  setup () {
    const item = ref("")
    const amount = ref("")
    const quantity = ref(1)
    const total = ref("")
    const note = ref("")

    const loading = ref(false)

    const onSubmit = () => {
      loading.value = true
    }

    return {
      item,
      items: items,
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
