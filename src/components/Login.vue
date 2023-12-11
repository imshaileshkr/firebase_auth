<template>
    <div class="h-full w-full flex justify-center m-auto mt-12 p-8 ">
      
      <div>
          <h1 class="text-3xl mb-4">Login</h1>
          <div class="flex flex-col gap-2">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Email" v-model="email" class="w-full bg-slate-100 px-2 py-1" > 
          </div>

          <div class="flex flex-col gap-2">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Password" v-model="password" class="w-96 bg-slate-100 px-2 py-1" autocomplete="off">
          </div>
          <div class="h-4">
              <small v-show="errMsg" class="text-red-500">{{ errMsg }}</small>
          </div>

          <button @click="login" class="w-full bg-cyan-800 text-white mt-3 px-2 py-1" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm">Login...</span>
            <span v-else>
                Login
            </span>
            </button>
          <button @click="signInWithGoogle" class="w-full bg-slate-400 shadow-md text-white mt-2 px-2 py-1">Sign in with Google</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {useRouter}  from "vue-router"

const email =  ref('')
const password =  ref('')
const loading = ref(false)
const errMsg  = ref(null)
const router = useRouter()

const login = () => {
    loading.value = true
    errMsg.value = null
    const auth  = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data)=> {
    loading.value = false

    }).catch((error)=> {
    loading.value = false
        switch(error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid email"
                break;
            case "auth/user-disabled":
                errMsg.value = "User disabled"
                break;
            case "auth/user-not-found":
                errMsg.value = "User not found"
                break;
            case "auth/invalid-password":
                errMsg.value = "Wrong password"
                break;
            default:
                errMsg.value = "Invalid email or password"
        }
        


    })
}
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then(()=> {
        router.push("/")
    }).catch((error)=> {
        alert(error.code)
    })

}
</script>

<style lang="scss" scoped>

</style>