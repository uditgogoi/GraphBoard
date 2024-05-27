import Dashboard from '../views/Dashboard.vue'
export const routes= [
    {
        path: '',
        redirect:'/dashboard' 
    },
    {
         path: '/dashboard', 
         name:'Dashboard',
         component: Dashboard,
         children:[
            {
                path:'',
                redirect:'/dashboard/home'
            },
            {
                path:'home',
                name:'Home',
                component:()=> import('../views/Home.vue'),
            },
            {
                path:'create',
                name:'CreateDashboard',
                component:()=> import('../views/CreateDashboard.vue'), 
            }
         ]
    },
]