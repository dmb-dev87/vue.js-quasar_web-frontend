<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 300px;">
      <q-card-section class="row items-center">
        <span>Choose Language</span>
      </q-card-section>

      <q-card-section class="row items-center">
        <q-list style="width: 100%;">
          <q-item
            clickable
            v-for="lang in localeOptions"
            :key="lang.value"
            v-close-popup
            @click="locale = lang.value"
          >
            <q-item-section avatar>
              <img :src="lang.flag" width="30">
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ lang.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';
import { useQuasar } from 'quasar';

const langs = [
  {
    label: 'English',
    value: 'en-us',
    flag: 'icons/uk.png',
  },
  {
    label: 'Italiano',
    value: 'it',
    flag: 'icons/it.png',
  }
]

export default defineComponent({
  name: 'SettingLanguage',
  props: {
    modal: {
      type: Boolean,
    }
  },
  setup () {
    const $q = useQuasar()
    const store = useStore()

    return {
      $q,
      store
    }
  },
  data () {
    return {
      dialog: this.modal,
      locale: this.$i18n.locale,
      localeOptions: langs,
    }
  },
  watch: {
    locale(locale) {
      this.$i18n.locale = locale
      this.$q.localStorage.set('locale', locale)
    }
  },
});
</script>
