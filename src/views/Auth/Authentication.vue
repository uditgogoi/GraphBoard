<template>
  <div class="landing">
    <div class="auth-container">
      <div class="landing-nav">
        <img src="../../assets/logo-1.png" alt="Logo" class="logo" />
        <a
          href="https://github.com/uditgogoi/GraphBoard"
          target="_blank"
          rel="noopener noreferrer"
          class="github-logo"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            width="35"
            height="35"
          />
        </a>
      </div>
      <h1 class="landing-header">Create dashboards using drag and drop</h1>
      <p class="landing-para">
        Using drag and drop, create charts, tables, stastics etc. and club them
        together to create dashboards. Create multiple dashboards which supports
        multiple data sources.
      </p>
      <main class="auth-form">
        <button class="gsi-material-button btn" @click="signInWithGoogle">
          <div class="gsi-material-button-state"></div>
          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="display: block"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span class="gsi-material-button-contents"
              >Sign in with Google</span
            >
            <span style="display: none">Sign in with Google</span>
          </div>
        </button>
      </main>
      <div v-if="error">
        <el-text class="mx-1" type="danger">{{ error }}</el-text>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from "vue";
import { auth, googleAuthProvider } from "../../auth/firebase";
import { useRouter } from "vue-router";
import { signInWithPopup } from "firebase/auth";
import { storeUserProfile } from "../../services/DbQueries";
import { useGraphStore } from "../../store";

const store = useGraphStore();
const router = useRouter();
const error = ref("");
// const { currentUser } = useFirebaseAuth();
// const user = computed(() => currentUser.value);

const signInWithGoogle = async () => {
  try {
    const userData = await signInWithPopup(auth, googleAuthProvider);
    const user = userData.user;
    const result = await storeUserProfile(user);
    console.log("result", result);
    const { success, ...newObj } = result;
    if (success) {
      store.setUserdata(newObj);
    }
    router.push("/");
  } catch (error) {
    console.error("Google sign-in error:", error);
    error.value = error;
  }
};
</script>
  
<style scoped>
.landing:before {
  content: " ";
  display: block;
  position: absolute;
  left: 0;
  top: 10vh;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(74,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%232F7FE0'/%3E%3Cstop offset='1' stop-color='%2349B74B'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(250,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23F8F806'/%3E%3Cstop offset='1' stop-color='%233E96FF'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23FFF' fill-opacity='0' stroke-miterlimit='10'%3E%3Cg stroke='url(%23a)' stroke-width='3.3'%3E%3Cpath transform='translate(-4.9 -2.8) rotate(-2.8 1409 581) scale(0.979)' d='M1409 581 1450.35 511 1490 581z'/%3E%3Ccircle stroke-width='1.1' transform='translate(-17.5 7) rotate(-1.4 800 450) scale(0.997)' cx='500' cy='100' r='40'/%3E%3Cpath transform='translate(-4.9 10.5) rotate(-17.5 401 736) scale(0.997)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/%3E%3C/g%3E%3Cg stroke='url(%23b)' stroke-width='1'%3E%3Cpath transform='translate(42 4.2) rotate(-1.05 150 345) scale(1.007)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/%3E%3Crect stroke-width='2.2' transform='translate(10.5 -21) rotate(-25.2 1089 759)' x='1039' y='709' width='100' height='100'/%3E%3Cpath transform='translate(-2.8 -2.8) rotate(-4.2 1400 132) scale(0.965)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: contain;
  opacity: 0.4;
  height: 90vh;
  width: 100vw;
  z-index: 0;
}
.landing-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.auth-container {
  width: 70%;
  margin: auto;
  padding: 1rem;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px; */
}

.auth-header {
  margin-bottom: 20px;
}

.logo {
  width: 180px;
}

.auth-form {
  /* background-color: white; */
  padding: 20px;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-top: 1rem;
  text-align: center;
  width: 50%;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}
.landing-header {
  font-weight: 700;
  color: #444444;
  text-align: center;
  width: 50%;
  margin: auto;
  margin-top: 10rem;
}
.landing-para {
  width: 50%;
  margin: auto;
  margin-top: 2rem;
  text-align: center;
  color: #6b6b6b;
  line-height: 2rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  /* width: 100%; */
  margin-top: 1rem;
  /* transition: background-color 0.3s ease; */
}
.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: "Roboto", arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color 0.218s, border-color 0.218s,
    box-shadow 0.218s;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 0;
  flex-grow: 0;
  font-family: "Roboto", arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity 0.218s;
  transition: opacity 0.218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}
.github-logo {
  cursor: pointer;
}

</style>