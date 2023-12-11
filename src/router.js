import {  createRouter, createWebHistory } from "vue-router";
import Registration from './components/Registration.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Feed from './components/Feed.vue'
import {getAuth, onAuthStateChanged} from "firebase/auth"


const routes = [
    { path: '/', component: Home, meta: {
        requiresAuth:false
    } },
    { path: '/login', component: Login, meta: {
        requiresAuth:false
    } },
    { path: '/registration', component: Registration, meta: {
        requiresAuth:false
    } },
    { path: '/feed', component: Feed , 
    meta: {
        requiresAuth:true
    }
},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener()
                console.log(user);
                resolve(user)
            },
            reject
        )
    })
}
router.beforeEach( async (to, from ,next)=> {
    if(to.matched.some((record)=> record.meta.requiresAuth)) {
        if(await getCurrentUser() ){
            next()
        }else {
            next("/")
        }
    }
    else {
   next()
    }
})
export default router