// ============================================================
// ShetiBook Authentication Handling (Login & Register)
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginAlert = document.getElementById('login-alert');
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const fillDemoBtn = document.getElementById('fill-demo-btn');
  const alreadyLoggedInBox = document.getElementById('already-logged-in-box');
  const loginFormArea = document.getElementById('login-form-area');
  const switchAccountBtn = document.getElementById('switch-account-btn');

  // Helper to show inline alerts
  function showAuthAlert(msg, type = 'error') {
    if (!loginAlert) return;
    loginAlert.className = `auth-alert ${type} active`;
    const icon = type === 'success' ? '✅' : '⚠️';
    loginAlert.innerHTML = `<span>${icon} ${msg}</span>`;
  }

  function hideAuthAlert() {
    if (!loginAlert) return;
    loginAlert.className = 'auth-alert';
    loginAlert.innerHTML = '';
  }

  // 1. Password Visibility Toggle
  if (togglePassBtn) {
    const passInput = document.getElementById('login-password');
    togglePassBtn.addEventListener('click', () => {
      if (!passInput) return;
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      togglePassBtn.textContent = isPassword ? '🙈' : '👁️';
      togglePassBtn.title = isPassword ? 'Hide Password' : 'Show Password';
    });
  }

  // 2. Demo Account 1-Click Auto Fill
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput && passInput) {
        emailInput.value = 'test@example.com';
        passInput.value = 'password123';
        hideAuthAlert();
        showAuthAlert('Demo credentials filled! Click "Login" below to continue.', 'success');
      }
    });
  }

  // 3. Check if already logged in on login page
  if (loginForm && alreadyLoggedInBox && loginFormArea) {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data && data.user) {
          const loggedName = document.getElementById('logged-user-name');
          if (loggedName) loggedName.textContent = data.user.name || 'Farmer';
          alreadyLoggedInBox.style.display = 'block';
          loginFormArea.style.display = 'none';
        }
      }
    } catch (_) {
      // Offline or network error; allow regular login form
    }
  }

  // 4. Switch Account button
  if (switchAccountBtn) {
    switchAccountBtn.addEventListener('click', async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (_) {}
      if (alreadyLoggedInBox) alreadyLoggedInBox.style.display = 'none';
      if (loginFormArea) loginFormArea.style.display = 'block';
      hideAuthAlert();
    });
  }

  // 5. Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAuthAlert();

      const emailInput = loginForm.email;
      const passwordInput = loginForm.password;
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email) {
        showAuthAlert('Please enter your email address');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!password) {
        showAuthAlert('Please enter your password');
        if (passwordInput) passwordInput.focus();
        return;
      }

      const submitBtn = document.getElementById('login-submit-btn') || loginForm.querySelector('button[type="submit"]');
      const btnText = document.getElementById('btn-text');
      const originalText = btnText ? btnText.textContent : 'Login';

      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Logging in...';

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          showAuthAlert('Login successful! Redirecting to your dashboard...', 'success');
          if (typeof showToast === 'function') showToast('Login successful!');
          
          // Smooth redirect
          setTimeout(() => {
            window.location.href = '/dashboard.html';
          }, 350);
        } else {
          const errorMsg = data.error || 'Invalid email or password. Please try again.';
          showAuthAlert(errorMsg, 'error');
          if (typeof showToast === 'function') showToast(errorMsg, 'error');
          if (submitBtn) submitBtn.disabled = false;
          if (btnText) btnText.textContent = originalText;
        }
      } catch (err) {
        const errorMsg = 'Network error: Unable to connect to server. Please check your internet connection.';
        showAuthAlert(errorMsg, 'error');
        if (typeof showToast === 'function') showToast(errorMsg, 'error');
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = originalText;
      }
    });
  }

  // 6. Registration Form Submission
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = registerForm.fullname ? registerForm.fullname.value.trim() : '';
      const email = registerForm.email ? registerForm.email.value.trim() : '';
      const phone = registerForm.phone ? registerForm.phone.value.trim() : '';
      const state = registerForm.state ? registerForm.state.value.trim() : '';
      const district = registerForm.district ? registerForm.district.value.trim() : '';
      const password = registerForm.password ? registerForm.password.value : '';
      const confirmPassword = registerForm.confirm_password ? registerForm.confirm_password.value : '';

      if (!name || !email || !password) {
        if (typeof showToast === 'function') showToast('Please fill all required fields', 'error');
        return;
      }

      if (password.length < 6) {
        if (typeof showToast === 'function') showToast('Password must be at least 6 characters', 'error');
        return;
      }

      if (password !== confirmPassword) {
        if (typeof showToast === 'function') showToast('Passwords do not match', 'error');
        return;
      }

      const submitBtn = registerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Create Account';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';
      }

      try {
        const langPref = typeof getLang === 'function' ? getLang() : 'en';
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            state,
            district,
            language_pref: langPref
          })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          if (typeof showToast === 'function') showToast('Account created successfully!');
          setTimeout(() => {
            window.location.href = '/dashboard.html';
          }, 350);
        } else {
          const errorMsg = data.error || 'Registration failed. Please try again.';
          if (typeof showToast === 'function') showToast(errorMsg, 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      } catch (err) {
        if (typeof showToast === 'function') showToast('Network error during registration', 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  }
});
