<template>
  <q-page class="justify-center" padding>
    <div class="row q-pa-lg">
      <div class="text-h4 text-center text-weight-bold">
        Enter a date and time to see the position you were in and any service you were carrying out
      </div>
    </div>
    <div class="row q-pa-lg justify-center" style="display: flex;">
      <div class="col-6 col-md-3">
        <q-input v-model="dateVal" label="Enter a date" readonly class="readonly_no_style" @click="showDatePicker=true">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" @click="showDatePicker=true">
              <q-dialog v-model="showDatePicker" style="min-width: auto;" @before-show="updateProxyDate" transition-show="scale" transition-hide="scale">
                <q-date v-model="proxyDate" color="amber-10" :mask="dateFormat" format24h>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn :label="$t('message.cancel')" color="primary" flat v-close-popup/>
                    <q-btn :label="$t('message.set')" color="primary" flat @click="saveDate" v-close-popup/>
                  </div>
                </q-date>
              </q-dialog>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-6 col-md-3">
        <q-input v-model="timeVal" label="Enter a time" readonly class="readonly_no_style" @click="showTimePicker=true">
          <template v-slot:prepend>
            <q-icon name="access_time" class="cursor-pointer" @click="showTimePicker=true">
              <q-dialog v-model="showTimePicker" style="min-width:auto;" @before-show="updateProxyTime" transition-show="scale" transition-hide="scale">
                <q-time v-model="proxyTime" color="amber-10" :mask="timeFormat" format24h>
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn :label="$t('message.cancel')" color="primary" flat v-close-popup/>
                    <q-btn :label="$t('message.set')" color="primary" flat @click="saveTime" v-close-popup/>
                  </div>
                </q-time>
              </q-dialog>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mt-md justify-center">
      <div id="currpositionmap" style="width: 100%; height: 300px;"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css'
import { defineComponent, onMounted } from 'vue'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import { checkLocations } from 'src/services/PositionService'

export default defineComponent({
  name: 'CheckPosition',
  components: {
    LMap,
    LTileLayer
  },
  mounted () {
    this.mymap = L.map('currpositionmap').setView([0, 0], 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.mymap)
  },
  data () {
    return {
      mymap: null,
      dateVal: null,
      timeVal: null,
      proxyDate: null,
      proxyTime: null,
      dateFormat: 'DD/MM/YYYY',
      timeFormat: 'HH:mm',
      showDatePicker: false,
      showTimePicker: false,
      currentMarker: null,
    }
  },
  methods: {
    getPopupContent (data: any) {
      let service = ''

      if (data.service) {

      } else {
        service = this.$t('message.no_service_available_in_date')
      }

      return service
    },
    async retrievePosition () {
      await checkLocations(this.dateVal, this.timeVal)
        .then((res: any) => {
          console.log("+++++++++++++", res.data)
          const data = res.data
          if (data.position == null) {

          } else {
            const pos = data.position
            const popupContent = this.getPopupContent(data)
            console.log("+++++++++++++++++++", [pos.latitude, pos.longitude])
            console.log("++++++++++++++++++", this.mymap)
            this.mymap.setView([pos.latitude, pos.longitude], 15)
            if (this.currentMarker == null) {
              this.currentMarker = L.marker([pos.latitude, pos.longitude]).addTo(this.mymap)
              this.currentMarker.bindPopup(popupContent).openPopup()
            } else {
              const latlng = L.latLng(pos.latitude, pos.longitude)
              this.currentMarker.setLatLng(latlng)
              this.currentMarker.setPopupContent(popupContent).openPopup()
            }
          }
        }).catch((e: any) => {

        })
    },
    updateProxyDate () {
      this.proxyDate = this.dateVal
    },
    updateProxyTime () {
      this.proxyTime = this.timeVal
    },
    saveDate () {
      this.dateVal = this.proxyDate
      this.retrievePosition()
    },
    saveTime () {
      this.timeVal = this.proxyTime
      this.retrievePosition()
    }
  },
})
</script>
