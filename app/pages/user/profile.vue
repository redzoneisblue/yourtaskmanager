<template>
  <div class="profile-container">
    <div class="profile-card">
      <h1 class="welcome-title">Onboarding on development</h1>
      <NuxtLink to="/user/tasks" class="tasks-link">Tasks</NuxtLink>
      <button @click.prevent="logOut" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth'
})

const router = useRouter();
const client = useSupabaseClient();
const user = useSupabaseUser();

console.log(user.value)

async function logOut() {
    try {
        const { error } = await client.auth.signOut();
        if (error) throw error;
        router.push("/login")
    } catch (error) {
        console.log(error.message);
    }
}

</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #ffffff;
}

.profile-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border: 1px solid #000000;
  border-radius: 4px;
  background-color: #ffffff;
  text-align: center;
}

.welcome-title {
  color: #000000;
  font-weight: 400;
  margin-bottom: 30px;
}

.tasks-link {
  display: inline-block;
  padding: 12px 24px;
  background-color: #000000;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid #000000;
  border-radius: 0;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.2s ease;
}

.tasks-link:hover {
  background-color: #ffffff;
  color: #000000;
}

.logout-button {
  padding: 12px 24px;
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 0;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-button:hover {
  background-color: #000000;
  color: #ffffff;
}

/* Focus styles for accessibility */
.tasks-link:focus,
.logout-button:focus {
  outline: 2px solid #000000;
  outline-offset: 2px;
}
</style>
