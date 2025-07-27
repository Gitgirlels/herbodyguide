// ─── Wait until DOM is loaded ───
document.addEventListener('DOMContentLoaded', () => {
    handleCommentForms();
    handleSubscribeForm();
    initScrollReveal();
    initBackToTop();
    toggleSection();
  });

  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("mobile-open");
  }
  
  function toggleSection(button) {
    const content = button.nextElementSibling;
    const arrow = button.querySelector('.section-toggle');
  
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
    arrow.textContent = content.style.display === 'block' ? '▼' : '◀';
  
    document.querySelectorAll(".section-content").forEach(el => {
      if (el !== section) el.style.display = "none";
    });
  
    if (section) {
      section.style.display = section.style.display === "block" ? "none" : "block";
    }
  }
  

// ==========================
// Event Listeners
// ==========================

/**
 * Initialize search functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Search form submission
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const query = document.getElementById('searchInput').value;
      lastSearchQuery = query;
      performSearch(query, currentCategory);
      return false; // Extra prevention
    });
  }

  // Search button click
  const searchButton = document.getElementById('searchButton');
  if (searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      const query = document.getElementById('searchInput').value;
      lastSearchQuery = query;
      performSearch(query, currentCategory);
    });
  }

  // Real-time search as user types
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

    // Handle Enter key press
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = e.target.value;
        lastSearchQuery = query;
        performSearch(query, currentCategory);
      }
    });

    // Focus search input on page load
    searchInput.focus();
  }

  // Category filter buttons
  document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
      // Update active filter
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      currentCategory = this.dataset.category;
      
      // Re-run search with new category if there's a query
      if (lastSearchQuery) {
        performSearch(lastSearchQuery, currentCategory);
      }
    });
  });
});

// ==========================
// Utility Functions
// ==========================

/**
 * Add new content to search database
 * @param {Object} content - Content object with title, url, category, excerpt, date, keywords
 */
function addContentToSearch(content) {
  websiteContent.push(content);
}

/**
 * Update existing content in search database
 * @param {string} url - URL of content to update
 * @param {Object} updates - Object with properties to update
 */
function updateSearchContent(url, updates) {
  const index = websiteContent.findIndex(item => item.url === url);
  if (index !== -1) {
    websiteContent[index] = { ...websiteContent[index], ...updates };
  }
}

// ==========================
// Utility Functions
// ==========================

/**
 * Add new content to search database
 * @param {Object} content - Content object with title, url, category, excerpt, date, keywords
 */
function addContentToSearch(content) {
  websiteContent.push(content);
}

/**
 * Update existing content in search database
 * @param {string} url - URL of content to update
 * @param {Object} updates - Object with properties to update
 */
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
    // Select all forms with class "comment-form"
    document.querySelectorAll('.comment-form').forEach(form => {
      form.addEventListener('submit', event => {
        event.preventDefault();
        const authorInput = form.querySelector('.comment-author');
        const textInput   = form.querySelector('.comment-text');
        const author = authorInput.value.trim();
        const text   = textInput.value.trim();
        if (!author || !text) return; // don’t add empty comments
  
        // Create a new <li> with the comment
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
  
  // Utility to avoid raw HTML insertion
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
  
      // Show a temporary “thank you” message
      const msg = document.createElement('p');
      msg.textContent = `Thanks (${escapeHtml(email)})! We’ll keep you updated.`;
      msg.style.marginTop = '1rem';
      msg.style.color = 'var(--link-hover)';
      subscribeForm.replaceWith(msg);
  
      // (You could also eventually send a fetch/AJAX request here.)
    });
  }
  
  
  
  // ════════════════════════════════════
  // 3) Scroll-Reveal Animation
  // ════════════════════════════════════
  function initScrollReveal() {
    // Target elements that should fade in (post-cards + single post details)
    const targets = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      // If no IntersectionObserver support, just make them visible
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
  
    targets.forEach(el => {
      observer.observe(el);
    });
  }
  
  // ════════════════════════════════════
  // 4) Back-to-Top Button Logic
  // ════════════════════════════════════
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
  
    // Show button once we've scrolled down 300px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
  
    // Smooth scroll to top on click
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  
