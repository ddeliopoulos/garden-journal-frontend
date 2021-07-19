import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import AddPlantForm from "@/components/AddPlantForm.vue";
import PlantEditor from "@/components/PlantEditorDisplay.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/plant',
    name: 'PlantEditorDisplay',
    component: PlantEditor,
  },
  {
    path: '/plant-list',
    name: 'PlantList',
    component: AddPlantForm

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
