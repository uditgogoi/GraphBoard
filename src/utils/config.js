import {HomeFilled,PieChart} from '@element-plus/icons-vue';

export const LeftNavigationMenu=[
    {
        id:'home',
        title:"Home",
        route:'/dashboard/home',
        icon: HomeFilled
    },
    {
        id:'create',
        title:'Create 2D Dashboard',
        route:'/dashboard/create',
        icon: PieChart
    },
]