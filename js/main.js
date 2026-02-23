(function () {
  'use strict';

  const STORAGE_KEY = 'burger-battle-vote';
  const messageEl = document.getElementById('vote-message');
  const form = document.getElementById('vote-form');
  const resultsList = document.getElementById('results-list');

  // Mobile nav
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  // Vote form
  if (form) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const radio = form.querySelector('input[value="' + saved + '"]');
      if (radio) radio.checked = true;
      showMessage('You already voted for this team. Thanks!', 'success');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const choice = form.querySelector('input[name="contestant"]:checked');
      if (!choice) return;
      const value = choice.value;
      localStorage.setItem(STORAGE_KEY, value);
      showMessage('Your vote has been recorded. Thank you!', 'success');
      updateResultsDisplay(value);
    });
  }

  function showMessage(text, type) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = 'vote-note ' + (type || '');
  }

  function updateResultsDisplay(votedId) {
    if (!resultsList) return;
    const rows = resultsList.querySelectorAll('.result-row');
    rows.forEach(function (row) {
      const id = row.getAttribute('data-id') || row.querySelector('.result-name')?.textContent;
      const votesEl = row.querySelector('.result-votes');
      if (!votesEl) return;
      // For demo: just show "1" for the one we voted for (real app would use server counts)
      const dataId = row.getAttribute('data-id');
      if (dataId === votedId) {
        const n = parseInt(votesEl.textContent, 10) || 0;
        votesEl.textContent = (n + 1).toString();
      }
    });
  }

  // Optional: load results from a backend later
  // fetch('/api/results').then(r => r.json()).then(data => { ... });
})();
