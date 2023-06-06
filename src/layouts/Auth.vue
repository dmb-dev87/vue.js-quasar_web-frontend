<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar class="bg-amber-10">
        <q-toolbar-title>
          Login
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
      </q-toolbar>
    </q-header>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <div class="row justify-center q-my-lg">
          <p class="text-h2 text-weight-bolder">
            LOGO
          </p>
        </div>
        <div class="row q-pl-md q-my-lg">
          <p class="text-h5 text-weight-mdeium text-amber-10">
            Services
          </p>
        </div>
        <div class="row q-pl-md q-my-lg">
          <p class="text-weight-mdeium" style="font-size:18px;">
            <q-icon name="logout" color="amber-10"/>
            <span class="q-ml-lg">Logout</span>
          </p>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  // name: 'LayoutName',

  setup() {
    const leftDrawer = ref(false)
    return { leftDrawer }
  }
})
</script>
