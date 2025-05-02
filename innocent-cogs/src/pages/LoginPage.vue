<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="logo">Innocent Cogs</h1>

      <div class="form-group">
  <input
    v-if="isRegistering"
    type="text"
    v-model="name"
    placeholder="Vārds"
  />
  <input
    type="email"
    v-model="email"
    placeholder="E-pasts"
  />
  <input
    type="password"
    v-model="password"
    placeholder="Parole"
  />
  <button @click="handleLogin">
    {{ isRegistering ? 'Reģistrēties' : 'Pieteikties' }}
  </button>
  <p class="switch" @click="toggleMode">
    {{ isRegistering ? 'Man jau ir konts' : 'Izveidot jaunu kontu' }}
  </p>
</div>


      <router-link to="/about" class="about-link">About</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { router } from '../router'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

export default {
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const isRegistering = ref(false)

    async function handleLogin() {
      try {
        if (isRegistering.value) {
          await createUserWithEmailAndPassword(auth, email.value, password.value)
        } else {
          await signInWithEmailAndPassword(auth, email.value, password.value)
        }
        router.push('/notes') // Seamless redirect on success
      } catch (err) {
        console.error('Authentication error:', err.message)
        // Optional: set an error message ref to show it under inputs later
      }
}


    function toggleMode() {
      isRegistering.value = !isRegistering.value
    }

    return {
      email,
      password,
      name,
      isRegistering,
      handleLogin,
      toggleMode
    }
  }
}
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-dark);
}

.login-card {
  background: var(--color-plum);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 320px;
  color: white;
}

.logo {
  font-family: 'Monoton', cursive;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-peach);
}

.form-group input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-rose);
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  color: var(--color-dark);
}

.form-group button {
  width: 100%;
  padding: 0.6rem;
  background-color: var(--color-rose);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.form-group button:hover {
  background-color: var(--color-peach);
  color: var(--color-dark);
}

.switch {
  font-size: 13px;
  color: var(--color-peach);
  cursor: pointer;
  margin-top: 1rem;
  text-decoration: underline;
}

.about-link {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  color: var(--color-peach);
  text-decoration: none;
  transition: color 0.2s;
}

.about-link:hover {
  color: var(--color-rose);
}

</style>
