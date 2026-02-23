(function () {
  'use strict';

  // Change this to your own admin password (only people with this password can open the admin page).
  var ADMIN_PASSWORD = 'burgerbattle2026';

  var loginEl = document.getElementById('admin-login');
  var dashboardEl = document.getElementById('admin-dashboard');
  var loginForm = document.getElementById('login-form');
  var passwordInput = document.getElementById('admin-password');
  var loginError = document.getElementById('login-error');
  var logoutBtn = document.getElementById('admin-logout');

  var STORAGE_KEY = 'burger_battle_admin';
  var SHEET_KEYS = { pro: 'sheet_pro', ama: 'sheet_ama', spon: 'sheet_spon' };

  function isAuthenticated() {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  }

  function showDashboard() {
    loginEl.hidden = true;
    dashboardEl.hidden = false;
    loadSheetUrls();
    bindSheetInputs();
  }

  function showLogin() {
    dashboardEl.hidden = true;
    loginEl.hidden = false;
    passwordInput.value = '';
    loginError.textContent = '';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var pass = (passwordInput.value || '').trim();
      loginError.textContent = '';
      if (pass === ADMIN_PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, '1');
        showDashboard();
      } else {
        loginError.textContent = 'Incorrect password. Try again.';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      sessionStorage.removeItem(STORAGE_KEY);
      showLogin();
    });
  }

  function loadSheetUrls() {
    try {
      var saved = localStorage.getItem('burger_battle_sheet_urls');
      if (saved) {
        var urls = JSON.parse(saved);
        if (urls.pro) document.getElementById('sheet-pro').value = urls.pro;
        if (urls.ama) document.getElementById('sheet-ama').value = urls.ama;
        if (urls.spon) document.getElementById('sheet-spon').value = urls.spon;
      }
    } catch (_) {}
  }

  function saveSheetUrls() {
    var urls = {
      pro: document.getElementById('sheet-pro').value.trim() || null,
      ama: document.getElementById('sheet-ama').value.trim() || null,
      spon: document.getElementById('sheet-spon').value.trim() || null
    };
    localStorage.setItem('burger_battle_sheet_urls', JSON.stringify(urls));
  }

  function bindSheetInputs() {
    var inputs = ['sheet-pro', 'sheet-ama', 'sheet-spon'];
    var opens = { 'sheet-pro': 'open-pro', 'sheet-ama': 'open-ama', 'sheet-spon': 'open-spon' };
    inputs.forEach(function (id) {
      var input = document.getElementById(id);
      var link = document.getElementById(opens[id]);
      if (!input || !link) return;
      function update() {
        saveSheetUrls();
        var url = input.value.trim();
        link.href = url || '#';
        link.style.visibility = url ? 'visible' : 'hidden';
      }
      input.addEventListener('input', update);
      input.addEventListener('change', update);
      update();
    });
  }

  if (isAuthenticated()) {
    showDashboard();
  } else {
    showLogin();
  }
})();
