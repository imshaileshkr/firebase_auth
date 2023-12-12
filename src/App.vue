<script setup>
import { onMounted, ref } from "vue"
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import { useRouter } from "vue-router";
const isLoggedIn =  ref(false)
const router = useRouter()
let auth;
let user_Details = ref({})
onMounted(()=> {
  auth = getAuth()
  onAuthStateChanged(auth, (user)=> {
    if(user) {
      user_Details = {...user}
      isLoggedIn.value = true
    }
    else {
      isLoggedIn.value = false
      user_Details = {}

    }
  })
})
const handleSignOut = () => {
 signOut(auth).then(()=> {
   router.push("/login")
 })
}
</script>

<template>
  <div>
   <nav class="navbar shadow-md">
    <router-link to="/" v-if="isLoggedIn">Home</router-link>
    <router-link to="/feed" v-if="isLoggedIn">Feed</router-link>
    <router-link to="/login" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/registration" v-if="!isLoggedIn">Registration</router-link>
    <p v-if="Object.keys(user_Details).length>0" class="mx-2 font-medium">{{user_Details.displayName}}</p>
    <button @click="handleSignOut" v-if="isLoggedIn" class="bg-red-500 text-white px-2 rounded">Logout</button>
   </nav>
   <div>
     <router-view  />
   </div>
  </div>
</template>

<style scoped>
.remove_border {
  border-right: none;
}
</style>
