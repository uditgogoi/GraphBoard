import Dashboard from '../views/Dashboard.vue';
import Authentication from "../views/Auth/Authentication.vue";
export const routes= [
    {
        path: '',
        redirect:{
            name:'Dashboard'
        } 
    },
    {
         path: '/dashboard', 
         name:'Dashboard',
         component: Dashboard,
         redirect:{
            name:'Home'
         },
         children:[
            {
                path:'',
                redirect:{
                    name:'Home'
                }
            },
            {
                path:'home',
                name:'Home',
                component:()=> import('../views/Home.vue'),
            },
            {
                path:'viewer/:id',
                name:'Dashboard-viewer',
                component:()=> import('../views/DashboardViewer.vue')
            },
            {
                path:'create',
                name:'CreateDashboard',
                component:()=> import('../views/CreateDashboard.vue'), 
            },
            
         ],
         meta: { requiresAuth: true },
    },
    {
        path: '/auth',
        name:'Auth',
        component:Authentication
    }
]