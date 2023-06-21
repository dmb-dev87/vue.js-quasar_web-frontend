import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBYojEccNn_FCU1-A4EQ0NiuCrd_yB-vAw",
  authDomain: "notificationapp-ff61d.firebaseapp.com",
  projectId: "notificationapp-ff61d",
  storageBucket: "notificationapp-ff61d.appspot.com",
  messagingSenderId: "224406344527",
  appId: "1:224406344527:web:433203364fc0fc8ff4eb3a",
  measurementId: "G-S9NL5KKRM8"
}

const app = initializeApp(firebaseConfig)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
