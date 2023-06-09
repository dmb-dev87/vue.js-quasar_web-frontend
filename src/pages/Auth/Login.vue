<template>

  <q-page
    class="row justify-center items-center" :style-fn="myTweak"
  >
    <div class="col-10 col-md-8 col-lg-6">
      <div class="row">
        <div class="col">
          <q-card square class="shadow-24">
            <q-card-section>
              <q-form @submit.prevent.stop="onSubmit" class="q-px-lg q-pt-xl">
                <q-input
                  class="q-mb-lg"
                  ref="urlRef"
                  v-model="urlVal"
                  :label="$t('message.url')"
                  :hint="$t('message.insert_installation_url')"
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
                  :label="$t('message.username')"
                  :hint="$t('message.insert_username')"
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
                  :label="$t('message.password')"
                  :hint="$t('message.insert_password')"
                  lazy-rules
                  :rules="pwdRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
                <div class="row q-py-lg justify-center">
                  <div class="col-6 col-md-4">
                    <q-btn size="lg" color="amber-10" class="text-white full-width" :label="$t('message.login')" type="submit" :loading="loading" />
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
import { useQuasar } from 'quasar'
import { login } from 'src/services/AuthService'

export default defineComponent({
  name: 'Login',
  setup() {
    const $q = useQuasar()

    const store = useStore()

    const urlVal = ref("")
    const urlRef = ref()

    const nameVal = ref("")
    const nameRef = ref()

    const pwdVal = ref("")
    const pwdRef = ref()

    const router = useRouter()

    const loading = ref(false)

    return {
      store,
      loading,
      urlVal,
      urlRef,
      urlRules: [
        (val: string) => (val && val.length > 0) || 'URL is required',
        (val: string) => (val && val.search("http") == -1) || ('message.fields_error'),
      ],

      nameVal,
      nameRef,
      nameRules: [
        (val: string) => (val && val.length > 0) || 'Name is required'
      ],

      pwdVal,
      pwdRef,
      pwdRules: [
        (val: string) => (val && val.length > 0) || 'Password is required',
      ],

      onSubmit: async () => {
        loading.value = true

        urlRef.value.validate()
        nameRef.value.validate()
        pwdRef.value.validate()

        const valid = (urlRef.value.hasError || nameRef.value.hasError || pwdRef.value.hasError) ? false : true

        if (valid === true) {
          await login(urlVal.value, nameVal.value, pwdVal.value)
            .then((response: any) => {
              const res = response.data
              store.commit('authentication/setUrl', urlVal.value)
              store.commit('authentication/setUsername', nameVal.value)
              store.commit('authentication/setToken', response.data.token)
              store.commit('authentication/setUserid', res.userId)
              store.commit('authentication/setLoggedin', true)
              router.push("/services1")
            })
            .catch((e: any) => {
              store.commit('authentication/setLoggedin', false)
              $q.notify({
                message: 'Login Failed',
                color: 'negative',
                position: 'center',
                icon: 'error',
              })
            })
        }

        loading.value = false
      },
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
