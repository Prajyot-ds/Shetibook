document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = '...';
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loginForm.email.value, password: loginForm.password.value })
        });
        const data = await res.json();
        if (res.ok) { showToast('Login successful!'); setTimeout(() => window.location.href = '/dashboard.html', 500); }
        else showToast(data.error || 'Login failed', 'error');
      } catch { showToast('Network error', 'error'); }
      btn.disabled = false; btn.textContent = t('login_btn');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (registerForm.password.value !== registerForm.confirm_password.value) {
        showToast('Passwords do not match', 'error'); return;
      }
      const btn = registerForm.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = '...';
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: registerForm.fullname.value, email: registerForm.email.value,
            phone: registerForm.phone.value, password: registerForm.password.value,
            state: registerForm.state.value, district: registerForm.district.value, language_pref: getLang()
          })
        });
        const data = await res.json();
        if (res.ok) { showToast('Account created!'); setTimeout(() => window.location.href = '/dashboard.html', 500); }
        else showToast(data.error || 'Registration failed', 'error');
      } catch { showToast('Network error', 'error'); }
      btn.disabled = false; btn.textContent = t('register_btn');
    });
  }
});
