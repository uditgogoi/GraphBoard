import {HomeFilled,PieChart} from '@element-plus/icons-vue';

export const LeftNavigationMenu=[
    {
        id:'home',
        title:"Home",
        route:'/',
        icon: HomeFilled
    },
    {
        id:'create',
        title:'Create 2D Dashboard',
        route:'/dashboard/create',
        icon: PieChart
    },
    {
        id:'create',
        title:'Create 3D Dashboard',
        route:'/dashboard/3d/create',
        icon: PieChart,
        disable:true
    },
]