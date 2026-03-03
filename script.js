// ─── Wait until DOM is loaded ───
document.addEventListener('DOMContentLoaded', () => {
  handleCommentForms();
  handleSubscribeForm();
  initScrollReveal();
  initBackToTop();
});

// ==========================
// Sidebar Toggle
// ==========================

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.classList.toggle("mobile-open");
}

function toggleSection(button) {
  const content = button.nextElementSibling;
  const arrow = button.querySelector('.section-toggle');

  // Close all other open sections
  document.querySelectorAll(".section-content").forEach(el => {
    if (el !== content) {
      el.style.display = "none";
      // Reset their arrows too
      const siblingBtn = el.previousElementSibling;
      if (siblingBtn) {
        const siblingArrow = siblingBtn.querySelector('.section-toggle');
        if (siblingArrow) siblingArrow.textContent = '◀';
      }
    }
  });

  // Toggle the clicked section
  const isOpen = content.style.display === 'block';
  content.style.display = isOpen ? 'none' : 'block';
  if (arrow) arrow.textContent = isOpen ? '◀' : '▼';
}


// ==========================
// Search Event Listeners
// ==========================

document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const query = document.getElementById('searchInput').value;
      lastSearchQuery = query;
      performSearch(query, currentCategory);
      return false;
    });
  }

  const searchButton = document.getElementById('searchButton');
  if (searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      const query = document.getElementById('searchInput').value;
      lastSearchQuery = query;
      performSearch(query, currentCategory);
    });
  }

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      lastSearchQuery = query;
      if (query.length >= 2) {
        performSearch(query, currentCategory);
      } else if (query.length === 0) {
        hideResults();
      }
    });

    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = e.target.value;
        lastSearchQuery = query;
        performSearch(query, currentCategory);
      }
    });

    searchInput.focus();
  }

  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      if (lastSearchQuery) {
        performSearch(lastSearchQuery, currentCategory);
      }
    });
  });
});


// ==========================
// Search Database Utilities
// ==========================

function addContentToSearch(content) {
  websiteContent.push(content);
}

function updateSearchContent(url, updates) {
  const index = websiteContent.findIndex(item => item.url === url);
  if (index !== -1) {
    websiteContent[index] = { ...websiteContent[index], ...updates };
  }
}


// ════════════════════════════════════
// 1) Dynamic Comment-Form Handling
// ════════════════════════════════════
function handleCommentForms() {
  document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const authorInput = form.querySelector('.comment-author');
      const textInput   = form.querySelector('.comment-text');
      const author = authorInput.value.trim();
      const text   = textInput.value.trim();
      if (!author || !text) return;

      const li = document.createElement('li');
      const timestamp = new Date().toLocaleString();
      li.innerHTML = `
        <strong>${escapeHtml(author)}</strong>
        <span class="comment-time">(${timestamp})</span>
        <p>${escapeHtml(text)}</p>
      `;
      const list = form.closest('.comments-section').querySelector('.comments-list');
      list.appendChild(li);
      form.reset();
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ════════════════════════════════════
// 2) Subscribe-Form Confirmation
// ════════════════════════════════════
function handleSubscribeForm() {
  const subscribeForm = document.querySelector('.subscribe-form');
  if (!subscribeForm) return;

  subscribeForm.addEventListener('submit', event => {
    event.preventDefault();
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    if (!email) return;

    const msg = document.createElement('p');
    msg.textContent = `Thanks (${escapeHtml(email)})! We'll keep you updated.`;
    msg.style.marginTop = '1rem';
    msg.style.color = 'var(--link-hover)';
    subscribeForm.replaceWith(msg);
  });
}


// ════════════════════════════════════
// 3) Scroll-Reveal Animation
// ════════════════════════════════════
function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(el => observer.observe(el));
}


// ════════════════════════════════════
// 4) Back-to-Top Button Logic
// ════════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
