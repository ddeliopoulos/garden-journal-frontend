import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'
import AddPlantForm from "@/components/AddPlantForm.vue";
import PlantDetails from "@/views/PlantDetails.vue";
import Testing from "@/views/Testing.vue";
import Privacy from "@/views/Privacy.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue"


// @ts-ignore
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: Privacy
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },

    {
        path: '/plant-details/:id',
        name: 'PlantDetails',
        //@ts-ignore
        component: PlantDetails,
        props: true
    },
    {
        path: '/plant-list',
        name: 'PlantList',
        component: AddPlantForm

    },
    {
        path: '/test',
        name: 'Testing',
        component: Testing,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes
})

// router.beforeEach((to : any, from : any, next : any)=> {
//   console.log(to, from, next)
//   next();
// })

export default router
