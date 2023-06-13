<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-amber-10">
        <q-toolbar-title>
          {{ $t('message.welcome') }}
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

          <q-item
            clickable
            v-for="link in serviceLinks"
            tag="a"
            :href="link.link"
            :key="link.title"
            v-bind="link"
          >
            <q-item-section
              class="q-my-md"
            >
              <q-item-label class="text-h5 text-weight-medium text-amber-10">{{ `${$t('message.services')} ${link.title}` }}</q-item-label>
            </q-item-section>
          </q-item>

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
              <q-item-label class="text-h5 text-weight-medium">{{ $t('message.logout') }}</q-item-label>
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
import { logout } from 'src/services/AuthService';

const essentialLinks = [
  {
    title: 'Change Language',
    link: '#/changelanguage'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },



  setup () {
    const leftDrawerOpen = ref(false)
    const store = useStore()
    const router = useRouter()
    const loggedin = store.getters.loggedin

    return {
      store,
      router,
      leftDrawerOpen,
      loggedin,
      essentialLinks: essentialLinks,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
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
  methods: {
    logout () {
      // logout()
      //   .then((response: any) => {
      //   })
      //   .catch((e: any) => {
      //   })

      this.store.commit('authentication/setUrl', "")
      this.store.commit('authentication/setUsername', "")
      this.store.commit('authentication/setToken', "")
      this.store.commit('authentication/setLoggedin', false)

      this.router.push("/login")
    }
  }
});
</script>
