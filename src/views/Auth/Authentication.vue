<template>
  <div class="auth-container">
    <main class="auth-form">
      <img src="../../assets/logo-1.png" alt="Logo" class="logo" />
      <!-- <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>
      </form> -->
      <el-button type="primary" class="btn" @click="signInWithGoogle"
        >Sign in with Google</el-button
      >
    </main>
    <div v-if="error">
      <el-text class="mx-1" type="danger">{{ error }}</el-text>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref, computed } from "vue";
import { useFirebaseAuth } from "vuefire";
import { auth, googleAuthProvider } from "../../auth/firebase";
import {
  signInWithPopup,
} from 'firebase/auth'
// const email = ref("");
// const password = ref("");
const error= ref('');
// const { currentUser } = useFirebaseAuth();
// const user = computed(() => currentUser.value);

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleAuthProvider);
  } catch (error) {
    console.error("Google sign-in error:", error);
    error.value = error
  }
};
</script>
  
<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-header {
  margin-bottom: 20px;
}

.logo {
  width: 220px;
}

.auth-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
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
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>