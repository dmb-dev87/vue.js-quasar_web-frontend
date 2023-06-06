<template>
  <q-item
    clickable
    tag="a"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" color="amber-10" size="md" />
    </q-item-section>

    <q-item-section
      v-if="icon"
      class="q-my-md"
    >
      <q-item-label class="text-h5 text-weight-medium">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
    <q-item-section
      v-else
      class="q-my-md"
    >
      <q-item-label class="text-h5 text-weight-medium text-amber-10">
        {{ title }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
});
</script>
