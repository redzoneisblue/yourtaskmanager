<script setup>

const client = useSupabaseClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const Msg = ref("")

const signIn = async () => {
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        });
        if (error) throw error;
        else {
            console.log("user successfully logged in.");
            router.push("user/profile");
        }
    } catch (error) {
        Msg.value = error.message;
    }
}

</script>

<template>

<div class="login-container">
    <form @submit.prevent="signIn" class="login-form">
        <h1 class="form-title">Login</h1>
        <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="email" required class="form-input">
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" v-model="password" required class="form-input">
        </div>
        <p class="message">{{ Msg }}</p>
        <button type="submit" class="submit-button">Sign In</button>
        
        <div class="register-option">
            <p>Don't have an account? <NuxtLink to="/register" class="register-link">Register</NuxtLink></p>
        </div>
    </form>
</div>

</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #ffffff;
}

.login-form {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    border: 1px solid #000000;
    border-radius: 4px;
    background-color: #ffffff;
}

.form-title {
    text-align: center;
    margin-bottom: 30px;
    color: #000000;
    font-weight: 400;
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
}

.form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #000000;
    border-radius: 0;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    box-sizing: border-box;
}

.form-input:focus {
    outline: 2px solid #000000;
}

.message {
    min-height: 20px;
    color: #000000;
    font-size: 14px;
    text-align: center;
    margin: 20px 0;
}

.submit-button {
    width: 100%;
    padding: 12px;
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #000000;
    border-radius: 0;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 20px;
}

.submit-button:hover {
    background-color: #ffffff;
    color: #000000;
}

/* Focus styles for accessibility */
.submit-button:focus {
    outline: 2px solid #000000;
    outline-offset: 2px;
}

.register-option {
    text-align: center;
    border-top: 1px solid #000000;
    padding-top: 20px;
}

.register-link {
    color: #000000;
    text-decoration: none;
    font-weight: 500;
}

.register-link:hover {
    text-decoration: underline;
}
</style>
