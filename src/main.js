import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './index.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-fPF_l0KpW0Cur6BPUkpTXDkV19J6xCs",
  authDomain: "vue-firebase-auth-f29bd.firebaseapp.com",
  projectId: "vue-firebase-auth-f29bd",
  storageBucket: "vue-firebase-auth-f29bd.appspot.com",
  messagingSenderId: "367903041224",
  appId: "1:367903041224:web:6d24f12c93b69a354627fd",
  measurementId: "G-C0SV1HSCZD"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const my_app = createApp(App)
my_app.use(router)
my_app.mount('#app')
