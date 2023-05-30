// import {createRouter, createWebHashHistory} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/:pathMatch(.*)*', component: () => import('./components/NotfoundComponent.vue')},
        {path: '/', component: () => import('./components/Tolets.vue')},
        {path: '/house/:houseId', component: () => import('./components/HouseId.vue')},
        {path: '/empty_room', component: () => import('./components/EmptyRoom.vue')},
        
        


        // {path: '/Test', component: () => import('./pages/Test.vue')},
        // {path: '/tashur', component: () => import('./pages/tashur.vue')},
        // {path: '/egzon', component: () => import('./pages/Egzon.vue')},
        // {path: '/ilir', component: () => import('./pages/Ilir.vue')},
    ]
})
