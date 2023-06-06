<template>

  <q-page
    class="row justify-center items-center"
  >
      <div class="col-10 col-md-8 col-lg-6">
        <div class="row">
          <div class="col">
            <q-card square class="shadow-24">
              <q-card-section>
                <q-form class="q-px-lg q-pt-xl">
                  <q-input class="q-mb-lg" square clearable v-model="url" label="Url" hint="Enter the url of your installation">
                    <template v-slot:prepend>
                      <q-icon name="link" />
                    </template>
                  </q-input>
                  <q-input class="q-mb-lg" square clearable v-model="username" label="Username" hint="Enter your username">
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input class="q-mb-lg" square clearable v-model="password" type="password" label="Password" hint="Enter your password">
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-py-xl q-my-lg justify-center">
                <div class="col-4">
                  <q-btn unelevated size="lg" color="amber-10" class="text-white full-width" label="LOGIN" />
                </div>
              </q-card-actions>
            </q-card>
          </div>
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
