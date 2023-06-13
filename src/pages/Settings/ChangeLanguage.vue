<template>
  <q-page padding>
    <div class="row q-pa-md justify-center">
      <div class="col-12 col-md-4">
        <q-list
          bordered
        >
          <q-item>
            <q-item-section>
              <q-item-label>{{ $t('message.change_lang_to') }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-for="lang in localeOptions"
            :key="lang.value"
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
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
  name: 'Setting Language',
  data() {
    return {
      locale: this.$i18n.locale,
      localeOptions: langs
    }
  },
  watch: {
    locale(locale) {
      this.$i18n.locale = locale
    }
  }
})
</script>
