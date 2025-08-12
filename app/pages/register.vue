<script setup>

const client = useSupabaseClient();

const email = ref("");
const password = ref("");
const Msg = ref("");

const signUp = async () => {
    
    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            : {      

: 'https://yourtaskmanagerr.netlify.app/login',    }
        });
        if(error) throw error;
        else {
            console.log(data);
            Msg.value = "Registration successful! Check your email for confirmation.";
        }
    } catch(error) {
        Msg.value = error.message;
        console.error(error);
    }
}

</script>

<template>

<div class="register-container">
    <form @submit.prevent="signUp" class="register-form">
        <h1 class="form-title">Register</h1>
        <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" v-model="email" required class="form-input">
        </div>
        <div class="form-group">
            <label for="password" class="form-label">Password:</label>
            <input type="password" id="password" v-model="password" required class="form-input">
        </div>
        <p class="message">{{ Msg }}</p>
        <button type="submit" class="submit-button">Sign Up</button>
        
        <div class="login-option">
            <p>Already have an account? <NuxtLink to="/login" class="login-link">Login</NuxtLink></p>
        </div>
    </form>
</div>

</template>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #ffffff;
}

.register-form {
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

.login-option {
    text-align: center;
    border-top: 1px solid #000000;
    padding-top: 20px;
}

.login-link {
    color: #000000;
    text-decoration: none;
    font-weight: 500;
}

.login-link:hover {
    text-decoration: underline;
}
</style>
