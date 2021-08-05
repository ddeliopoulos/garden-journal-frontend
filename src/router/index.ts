import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import AddPlantForm from "@/components/AddPlantForm.vue";
import PlantEditor from "@/components/PlantEditorDisplay.vue";
import Testin from "@/views/Testin.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plant/:id',
    name: 'PlantEditorDisplay',
    component: PlantEditor,
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
  routes
})

export default router
