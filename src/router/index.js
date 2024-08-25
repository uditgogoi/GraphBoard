import { createWebHistory, createRouter } from "vue-router";
import { auth,onAuthStateChanged } from "../auth/firebase";
import { routes } from "./routes";


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next("/auth");
      }
    });
  } else {
    next(); // Proceed to the route
  }
});

export default router;
