import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import AddPlantForm from "@/components/AddPlantForm.vue";
import PlantDetails from "@/views/PlantDetails.vue";
import Testin from "@/views/Testin.vue";
import Privacy from "@/views/Privacy.vue";
import About from "@/views/About.vue";



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
    name: 'Testin',
    component: Testin,
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes
})

router.beforeEach((to : any, from : any, next : any)=> {
  console.log(to, from, next)
  next();
})

export default router
