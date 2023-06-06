<template>

  <q-page
    class="window-height window-width row justify-center items-center"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24">
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input class="q-my-sm" square clearable v-model="url" label="Url" hint="Enter the url of your installation">
                <template v-slot:prepend>
                  <q-icon name="link" />
                </template>
              </q-input>
              <q-input class="q-my-sm" square clearable v-model="username" label="Username" hint="Enter your username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input class="q-my-sm" square clearable v-model="password" type="password" label="Password" hint="Enter your password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg q-my-sm justify-center">
            <q-btn unelevated size="lg" color="amber-10" class="text-white full-width" label="LOGIN" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Login',
  data () {
    return {
      url: '',
      username: '',
      password: ''
    }
  }
})
</script>
