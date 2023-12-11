<template>
    <div class="h-full w-full flex justify-center m-auto mt-12 p-8 ">
      
        <div>
            <h1 class="text-3xl mb-4">Create An Account</h1>
            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Email" v-model="email" class="w-full bg-slate-100 px-2 py-1" > 
            </div>

            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Password" v-model="password" class="w-96 bg-slate-100 px-2 py-1">
            </div>

            <button @click="register" class="w-full bg-cyan-800 text-white mt-2 px-2 py-1">Submit</button>
            <button @click="signInWithGoogle" class="w-full bg-slate-400 shadow-md text-black mt-2 px-2 py-1">Sign up with Google</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import {useRouter}  from "vue-router"

const email =  ref('')
const password =  ref('')

const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data)=> {
        console.log("Registration successfully", data);
        router.push("/feed")

    }).catch((error)=> {
        alert(error.code)

    })
}
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then(()=> {
        router.push("/feed")
    }).catch((error)=> {
        alert(error.code)
    })
}
</script>

<style lang="scss" scoped>

</style>