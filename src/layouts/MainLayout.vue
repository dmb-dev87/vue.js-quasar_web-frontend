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
            v-if="loggedin"
            clickable
            tag="a"
            href="#/logout"
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
          <q-item
            v-else
            clickable
            tag="a"
            href="#/login"
          >
            <q-item-section
              avatar
            >
              <q-icon name="login" color="amber-10" size="md" />
            </q-item-section>

            <q-item-section
              class="q-my-md"
            >
              <q-item-label class="text-h5 text-weight-medium">Login</q-item-label>
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

    const loggedin = token.length === 0 ? false : true

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loggedin,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
