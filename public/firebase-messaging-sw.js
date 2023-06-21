importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyBYojEccNn_FCU1-A4EQ0NiuCrd_yB-vAw",
  authDomain: "notificationapp-ff61d.firebaseapp.com",
  projectId: "notificationapp-ff61d",
  storageBucket: "notificationapp-ff61d.appspot.com",
  messagingSenderId: "224406344527",
  appId: "1:224406344527:web:433203364fc0fc8ff4eb3a",
  measurementId: "G-S9NL5KKRM8"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  var title = payload.data.title;
  var options = {
    body: payload.data.message,
    icon: 'favicon.ico',
  };

  return self.registration.showNotification(title, options);
});
