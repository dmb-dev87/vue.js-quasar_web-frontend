<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-amber-10">
        <q-toolbar-title>
          Quasar Web App
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
      <q-scroll-area class="fit q-qa-sm">
        <q-list>
          <q-item-label
            class="q-my-lg"
            header
          >
            <p class="text-h2 text-weight-bolder text-center">
              LOGO
            </p>
          </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />

          <q-item
            clickable
            tag="a"
            @click="logout"
          >
            <q-item-section
              avatar
            >
              <q-icon name="logout" color="amber-10" size="md" />
            </q-item-section>

            <q-item-section
              class="q-my-md"
            >
              <q-item-label class="text-h5 text-weight-medium">Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router'
import axios from 'axios'
import { getBaseUrl } from 'src/boot/axios';

const linksList = [
  {
    title: 'Services 1',
    link: '#/services1'
  },
  {
    title: 'Services 2',
    link: '#/services2'
  },
  {
    title: 'Services 3',
    link: '#/services3'
  },
  {
    title: 'Services 4',
    link: '#/services4'
  },
  {
    title: 'Services 5',
    link: '#/services5'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const store = useStore()
    const token = store.getters.token
    const url = store.getters.url
    const username = store.getters.username

    const router = useRouter()

    const loggedin = token.length === 0 ? false : true

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loggedin,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout: async () => {
        let headers = {
          'Content-Type': 'application/json',
        }

        const api = axios.create({
          baseURL: getBaseUrl(url),
          headers: headers
        })

        await api.get(
          `/api/logout?userid=${username}&token=${token}`,
        )
          .then((response: any) => {
            console.log(response.data)
          })
          .catch((e: any) => {
            console.log(e.message)
          })

        store.commit('setUrl', "")
        store.commit('setUsername', "")
        store.commit('setToken', "")
        store.commit('setLoggedin', false)

        router.push("/login")
      }
    }
  },
});
</script>
