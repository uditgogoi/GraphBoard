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
        title:'Create Dashboard',
        route:'/dashboard/create',
        icon: PieChart
    },
]