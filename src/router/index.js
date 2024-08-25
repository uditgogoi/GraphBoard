import { createWebHistory, createRouter } from "vue-router";
import { auth, onAuthStateChanged } from "../auth/firebase";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      unsubscribe(); // Stop listening after the user is found
      resolve(user);
    });
  });
  
  if (requiresAuth && !user) {
    next("/auth");
  } else {
     next();
  }
});

export default router;
