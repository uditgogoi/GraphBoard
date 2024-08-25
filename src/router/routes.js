import Dashboard from "../views/Dashboard.vue";
import Authentication from "../views/Auth/Authentication.vue";
export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        redirect: {
          name: "Dashboard",
        },
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        redirect: {
          name: "DashboardList",
        },
        children: [
          {
            path: "",
            redirect: {
              name: "DashboardList",
            },
          },
          {
            path: "list",
            name: "DashboardList",
            component: () => import("../views/DashboardList.vue"),
          },
          {
            path: "viewer/:id",
            name: "Dashboard-viewer",
            component: () => import("../views/DashboardViewer.vue"),
          },
          {
            path: "create",
            name: "CreateDashboard",
            component: () => import("../views/CreateDashboard.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: Authentication,
  },
];
