<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-amber-10">
        <q-toolbar-title>
          Login
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
  {
    title: 'Login',
    icon: 'login',
    link: '#/login'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
