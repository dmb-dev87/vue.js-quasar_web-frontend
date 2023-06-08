<template>

  <q-page
    class="row justify-center items-center" :style-fn="myTweak"
  >
    <div class="col-10 col-md-8 col-lg-6">
      <div class="row">
        <div class="col">
          <q-card square class="shadow-24">
            <q-card-section>
              <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-px-lg q-pt-xl">
                <q-input
                  class="q-mb-lg"
                  ref="urlRef"
                  v-model="urlVal"
                  label="URL *"
                  hint="Enter the url of your installation"
                  lazy-rules
                  :rules="urlRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="link" />
                  </template>
                </q-input>
                <q-input
                  class="q-mb-lg"
                  ref="nameRef"
                  v-model="nameVal"
                  label="User Name *"
                  hint="Enter your username"
                  lazy-rules
                  :rules="nameRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  class="q-mb-lg"
                  ref="pwdRef"
                  v-model="pwdVal"
                  type="password"
                  label="Password"
                  hint="Enter your password"
                  lazy-rules
                  :rules="pwdRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <div class="row q-py-lg justify-center">
                  <div class="col-6 col-md-4">
                    <q-btn size="lg" color="amber-10" class="text-white full-width" label="LOGIN" type="submit"/>
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()

    const urlVal = ref(null)
    const urlRef = ref(null)

    const nameVal = ref(null)
    const nameRef = ref(null)

    const pwdVal = ref(null)
    const pwdRef = ref(null)

    const router = useRouter()

    return {
      store,

      urlVal,
      urlRef,
      urlRules: [
        (val: string) => (val && val.length > 0) || 'URL is required',
        (val: string) => (val && val.search("http") == -1) || 'Please double check the fields',
      ],

      nameVal,
      nameRef,
      nameRules: [
        (val: string) => (val && val.length > 0) || 'Name is required'
      ],

      pwdVal,
      pwdRef,
      pwdRules: [
        (val: string) => (val && val.length > 0) || 'Password is required'
      ],

      onSubmit () {
        const valid = () => {
          urlRef.value.validate()
          nameRef.value.validate()
          pwdRef.value.validate()

          if (urlRef.value.hasError || nameRef.value.hasError || pwdRef.value.hasError) {
            return false
          } else {
            return true
          }
        }

        if (valid) {
          store.commit('setUrl', urlVal.value)
          store.commit('setUsername', nameVal.value)

          let headers = {
            'Content-Type': 'application/json',
          }

          const api = axios.create({
            baseURL: `https://${urlVal.value}.demoserver.pro`,
            headers: headers
          })

          api.get(
            `/api/?email=${nameVal.value}&password=${pwdVal.value}`,
          )
            .then((response: any) => {
              store.commit('setToken', response.data.token)
              router.push("/services1")
            })
            .catch((e: any) => {
              console.log("++++++++++++++++++++ Failed", e)
            })
        }
      },

      onReset () {
        urlVal.value = null
        nameVal.value = null
        pwdVal.value = null

        urlRef.value.resetValidation()
        nameRef.value.resetValidation()
        pwdRef.value.resetValidation()
      }
    }
  },
  methods: {
    myTweak (offset: number) {
      var width = window.innerWidth
      if (width > 1024) {
        return { minHeight: offset? `calc(100vh - ${offset}px)` : `100vh` }
      } else {
        return { minHeight: `0px` }
      }
    }
  }
})
</script>
