<template>
  <div class="landing-container">
    <div class="landing-card">
      <h1 class="landing-title">Task Manager</h1>
      <p class="landing-subtitle">Organize your life, one task at a time</p>
      
      <div class="landing-content">
        <p class="landing-description">
          A simple and elegant solution to manage your daily tasks efficiently. 
          Focus on what matters most without distractions.
        </p>
        
        <div class="landing-buttons">
          <NuxtLink to="/login" class="login-link">Login</NuxtLink>
          <NuxtLink to="/register" class="register-link">Register</NuxtLink>
        </div>
      </div>
      
      <div class="landing-features">
        <div class="feature">
          <h3 class="feature-title">Simple</h3>
          <p class="feature-description">Clean interface designed for productivity</p>
        </div>
        <div class="feature">
          <h3 class="feature-title">Real-time</h3>
          <p class="feature-description">Updates across all devices instantly</p>
        </div>
        <div class="feature">
          <h3 class="feature-title">Secure</h3>
          <p class="feature-description">Your data is protected with industry standards</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #ffffff;
}

.landing-card {
  width: 100%;
  max-width: 600px;
  padding: 50px;
  border: 1px solid #000000;
  border-radius: 4px;
  background-color: #ffffff;
  text-align: center;
}

.landing-title {
  color: #000000;
  font-weight: 400;
  font-size: 3rem;
  margin-bottom: 10px;
}

.landing-subtitle {
  color: #000000;
  font-weight: 300;
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.8;
}

.landing-description {
  color: #000000;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.landing-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

.login-link,
.register-link {
  display: inline-block;
  padding: 12px 30px;
  background-color: #000000;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid #000000;
  border-radius: 0;
  font-size: 16px;
  transition: all 0.2s ease;
}

.login-link:hover,
.register-link:hover {
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
}

/* Focus styles for accessibility */
.login-link:focus,
.register-link:focus {
  outline: 2px solid #000000;
  outline-offset: 2px;
}

.landing-features {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #000000;
}

.feature {
  flex: 1;
  min-width: 150px;
}

.feature-title {
  color: #000000;
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.feature-description {
  color: #000000;
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Responsive design */
@media (max-width: 600px) {
  .landing-card {
    padding: 30px 20px;
  }
  
  .landing-buttons {
    flex-direction: column;
    gap: 10px;
  }
  
  .landing-features {
    flex-direction: column;
    gap: 30px;
  }
  
  .landing-title {
    font-size: 2rem;
  }
}
</style>
