<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-amber-10">
        <q-btn
          v-if="$route.meta.backable"
          flat
          dense
          round
          icon="arrow_back_ios"
          aria-label="Menu"
          @click="gotoBack"
        />
        <q-toolbar-title>
          {{ $route.meta.title ? $t(`${$route.meta.title}`) : $t('message.welcome') }}
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <q-scroll-area class="fit">
        <q-list class="q-px-md">
          <q-item-label
            class="q-my-md"
            header
          >
            <p class="text-h2 text-weight-bolder text-center">
              LOGO
            </p>
          </q-item-label>

          <q-item
            clickable
            v-for="link in serviceLinks"
            tag="a"
            :href="link.link"
            :key="link.title"
            v-bind="link"
            class="q-my-md"
          >
            <q-item-section>
              <q-item-label class="text-h5 text-weight-medium text-amber-10">{{ `${$t('message.services')} ${link.title}` }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            tag="a"
            href="#/checkpostion"
            class="q-my-md"
          >
            <q-item-section>
              <q-item-label class="text-h5 text-weight-medium text-amber-10">{{ $t('message.check_position') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="dialog = true"
            class="q-my-md"
          >
            <q-item-section>
              <q-item-label class="text-h5 text-weight-medium text-amber-10">Change Language</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            @click="Logout"
            class="q-my-md"
          >
            <q-item-section avatar>
              <q-icon name="logout" color="amber-10" size="md" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5 text-weight-medium">{{ $t('message.logout') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
          >
            <q-toggle
              v-model="trackgps"
              color="amber-10"
              icon="gps_fixed"
              label="Tracking GPS"
              size="xl"
              @click="trackingGPS"
            />
          </q-item>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <SettingLanguage v-model="dialog" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import SettingLanguage from 'src/components/SettingLanguage.vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { logout } from 'src/services/AuthService'
import { savePostion } from 'src/services/PositionService'

export default defineComponent({
  name: 'MainLayout',
  components: {
    SettingLanguage
  },
  setup () {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const store = useStore()
    const router = useRouter()
    const loggedin = store.state.authentication.loggedin
    const trackgps = ref(store.state.authentication.trackgps)

    const Logout = () => {
      $q.dialog({
        title: 'Logout',
        message: 'Are you sure you want to log out?',
        cancel: true,
      }).onOk(() => {
        logout()
          .then((res: any) => {
            store.commit('authentication/setUrl', "")
            store.commit('authentication/setUsername', "")
            store.commit('authentication/setToken', "")
            store.commit('authentication/setLoggedin', false)
            router.push("/login")
          })
          .catch((e: any) => {
          })
      })
    }

    let polling: any = null

    const saveLocation = () => {
      polling = setInterval(() => {
        console.log("+++++++++++++++", trackgps.value)
        savePostion()
      }, 15000)
    }

    const trackingGPS = () => {
      store.commit('authentication/setTrackGps', trackgps.value)

      savePostion()

      if (trackgps.value) {
        if (polling == null) {
          saveLocation()
        }
      } else {
        clearInterval(polling)
        polling = null
      }
    }

    return {
      dialog: ref(false),
      store,
      router,
      leftDrawerOpen,
      loggedin,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      gotoBack () {
        router.back()
      },
      Logout,
      trackgps,
      trackingGPS,
      polling,
      saveLocation
    }
  },
  data () {
    return {

      serviceLinks: [
        {
          title: '1',
          link: '#/services1'
        },
        {
          title: '2',
          link: '#/services2'
        },
        {
          title: '3',
          link: '#/services3'
        },
        {
          title: '4',
          link: '#/services4'
        },
        {
          title: '5',
          link: '#/services5'
        },
      ],
    }
  },
  beforeDestroy() {
      clearInterval(this.polling)
  },
  created () {
    if (this.trackgps) {
      this.saveLocation()
    }
  }
});
</script>
