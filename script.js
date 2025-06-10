// ─── Wait until DOM is loaded ───
document.addEventListener('DOMContentLoaded', () => {
    handleCommentForms();
    handleSubscribeForm();
    initScrollReveal();
    initBackToTop();
  });

// ==========================
// Quick Article Menu Functions
// ==========================

/**
 * Toggle the quick article menu visibility
 */
function toggleMenu() {
  console.log('toggleMenu() called');
  
  const menuContent = document.getElementById('menuContent');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (!menuContent) {
    console.error('menuContent element not found');
    return;
  }
  
  const isHidden = !menuContent.classList.contains('show');
  
  if (isHidden) {
    menuContent.style.display = 'block';
    setTimeout(() => {
      menuContent.classList.add('show');
    }, 10);
    menuToggle.textContent = 'Hide Articles';
  } else {
    menuContent.classList.remove('show');
    setTimeout(() => {
      menuContent.style.display = 'none';
    }, 300);
    menuToggle.textContent = 'Browse All Articles by Category';
  }
}
window.toggleMenu = toggleMenu;
window.searchArticles = searchArticles;

    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Subscribe form functionality
    const subscribeForm = document.querySelector('.subscribe-form');
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with email: ${email}`);
      e.target.reset();
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const menuBar = document.querySelector('.menu-bar');
      const menuNav = document.getElementById('menuNav');
      const toggleButton = document.querySelector('.mobile-menu-toggle');
      
      if (!menuBar.contains(e.target) && menuNav.classList.contains('active')) {
        menuNav.classList.remove('active');
      }
    });

// ==========================
// Core Search Functions
// ==========================

/**
 * Performs search across website content
 * @param {string} query - Search query
 * @param {string} category - Category filter
 */
function performSearch(query, category = 'all') {
  const searchTerm = query.toLowerCase().trim();
  
  if (searchTerm === '') {
    hideResults();
    return;
  }

  let results = websiteContent.filter(item => {
    // Category filter
    const categoryMatch = category === 'all' || item.category === category;
    
    // Search in title, excerpt, and keywords
    const titleMatch = item.title.toLowerCase().includes(searchTerm);
    const excerptMatch = item.excerpt.toLowerCase().includes(searchTerm);
    const keywordMatch = item.keywords.some(keyword => 
      keyword.toLowerCase().includes(searchTerm)
    );
    
    return categoryMatch && (titleMatch || excerptMatch || keywordMatch);
  });

  // Sort results by relevance
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(searchTerm) ? 2 : 0;
    const bTitle = b.title.toLowerCase().includes(searchTerm) ? 2 : 0;
    const aKeyword = a.keywords.some(k => k.toLowerCase().includes(searchTerm)) ? 1 : 0;
    const bKeyword = b.keywords.some(k => k.toLowerCase().includes(searchTerm)) ? 1 : 0;
    
    return (bTitle + bKeyword) - (aTitle + aKeyword);
  });

  displayResults(results, searchTerm, category);
}

/**
 * Displays search results in the DOM
 * @param {Array} results - Search results array
 * @param {string} query - Search query for highlighting
 * @param {string} category - Current category filter
 */
function displayResults(results, query, category) {
  const resultsContainer = document.getElementById('resultsContainer');
  const resultsHeader = document.getElementById('resultsHeader');
  const searchResults = document.getElementById('searchResults');
  
  searchResults.style.display = 'block';
  
  const categoryText = category === 'all' ? 'all topics' : category;
  resultsHeader.innerHTML = `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}" in ${categoryText}`;
  
  if (results.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results">
        <h3>No results found</h3>
        <p>Try different keywords or browse all topics using the category filters above.</p>
      </div>
    `;
    return;
  }
  
  resultsContainer.innerHTML = results.map(item => `
    <div class="result-item">
      <div class="result-category">${getCategoryDisplayName(item.category)}</div>
      <h3 class="result-title">
        <a href="${item.url}">${highlightText(item.title, query)}</a>
      </h3>
      <p class="result-excerpt">${highlightText(item.excerpt, query)}</p>
      <div class="result-date">${item.date}</div>
    </div>
  `).join('');
}

/**
 * Highlights search terms in text
 * @param {string} text - Text to highlight
 * @param {string} query - Search query to highlight
 * @returns {string} Text with highlighted terms
 */
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background-color: rgba(230, 163, 222, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

/**
 * Gets display name for category
 * @param {string} category - Category key
 * @returns {string} Display name
 */
function getCategoryDisplayName(category) {
  const categoryNames = {
    'conceiving': 'Conceiving Confidently',
    'contraception': 'Contraception',
    'anatomy': 'Female Anatomy',
    'menstruation': 'Menstruation',
    'pregnancy': 'Pregnancy',
    'legal': 'Legal Rights'
  };
  return categoryNames[category] || category;
}


// ==========================
// Event Listeners
// ==========================


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
  
