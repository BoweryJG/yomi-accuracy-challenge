/**
 * Authentication module for Neocis Yomi® Accuracy Challenge
 * Handles user login with the specified credentials
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const appContainer = document.getElementById('app-container');
    const loginScreen = document.getElementById('login-screen');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    // Check if user is already authenticated
    if (localStorage.getItem('yomi_authenticated') === 'true') {
        showApp();
    }

    // Focus on email field when page loads
    emailField.focus();

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailField.value.trim();
        const password = passwordField.value;
        
        // Validate credentials
        if (email === 'jasonwilliamgolden@gmail.com' && password === 'yomigame') {
            // Store authentication state
            localStorage.setItem('yomi_authenticated', 'true');
            
            // Add login timestamp
            localStorage.setItem('yomi_login_time', new Date().toISOString());
            
            // Show success animation
            showLoginSuccess();
            
            // Show app after brief delay for animation
            setTimeout(showApp, 1000);
        } else {
            // Show error message with shake animation
            loginError.style.display = 'block';
            loginForm.classList.add('shake');
            
            // Remove shake class after animation completes
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
            
            // Clear password field
            passwordField.value = '';
            passwordField.focus();
        }
    });

    // Function to show login success animation
    function showLoginSuccess() {
        // Create success overlay
        const successOverlay = document.createElement('div');
        successOverlay.className = 'login-success-overlay';
        successOverlay.innerHTML = '<div class="success-icon">✓</div>';
        document.body.appendChild(successOverlay);
        
        // Add styles
        successOverlay.style.position = 'fixed';
        successOverlay.style.top = '0';
        successOverlay.style.left = '0';
        successOverlay.style.width = '100%';
        successOverlay.style.height = '100%';
        successOverlay.style.backgroundColor = 'rgba(242, 140, 56, 0.9)';
        successOverlay.style.display = 'flex';
        successOverlay.style.justifyContent = 'center';
        successOverlay.style.alignItems = 'center';
        successOverlay.style.zIndex = '9999';
        successOverlay.style.opacity = '0';
        successOverlay.style.transition = 'opacity 0.3s ease';
        
        const successIcon = successOverlay.querySelector('.success-icon');
        successIcon.style.color = 'white';
        successIcon.style.fontSize = '80px';
        successIcon.style.fontWeight = 'bold';
        successIcon.style.transform = 'scale(0)';
        successIcon.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Trigger animations
        setTimeout(() => {
            successOverlay.style.opacity = '1';
            successIcon.style.transform = 'scale(1)';
        }, 10);
        
        // Remove overlay after delay
        setTimeout(() => {
            successOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(successOverlay);
            }, 300);
        }, 1500);
    }

    // Function to show the main application
    function showApp() {
        loginScreen.classList.add('hidden');
        appContainer.classList.remove('hidden');
    }

    // Function to log out (for development purposes)
    window.logOut = function() {
        localStorage.removeItem('yomi_authenticated');
        localStorage.removeItem('yomi_login_time');
        appContainer.classList.add('hidden');
        loginScreen.classList.remove('hidden');
        loginError.style.display = 'none';
        emailField.value = '';
        passwordField.value = '';
        emailField.focus();
    };
    
    // Add password visibility toggle
    const togglePassword = document.createElement('button');
    togglePassword.type = 'button';
    togglePassword.className = 'password-toggle';
    togglePassword.innerHTML = '👁️';
    togglePassword.style.position = 'absolute';
    togglePassword.style.right = '10px';
    togglePassword.style.top = '50%';
    togglePassword.style.transform = 'translateY(-50%)';
    togglePassword.style.background = 'none';
    togglePassword.style.border = 'none';
    togglePassword.style.cursor = 'pointer';
    togglePassword.style.fontSize = '16px';
    togglePassword.style.color = '#4A4A4A';
    
    // Add toggle button to password field container
    const passwordContainer = passwordField.parentElement;
    passwordContainer.style.position = 'relative';
    passwordContainer.appendChild(togglePassword);
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            togglePassword.innerHTML = '🔒';
        } else {
            passwordField.type = 'password';
            togglePassword.innerHTML = '👁️';
        }
        passwordField.focus();
    });
});
