// ─── Wait until DOM is loaded ───
document.addEventListener('DOMContentLoaded', () => {
    handleCommentForms();
    handleSubscribeForm();
    initScrollReveal();
    initBackToTop();
  });
// sidebar-script.js

// All articles data for search functionality
const articles = [
  // Conceiving Confidently
  { title: "Factors Affecting Fertilization & Implantation", url: "post1.html", category: "Conceiving Confidently" },
  { title: "The Reproductive Anatomy: Key Players in Conception", url: "post2.html", category: "Conceiving Confidently" },
  { title: "Top 10 Prenatal Vitamins: Science and Chemistry", url: "post3.html", category: "Conceiving Confidently" },
  { title: "Miscarriage: The Science of Pregnancy Loss", url: "miscarriage.html", category: "Conceiving Confidently" },
  { title: "The Complete Guide to Reproductive Hormones", url: "hormones.html", category: "Conceiving Confidently" },
  { title: "The Science of Fertility: Understanding Women's Fertility and Aging", url: "what-is-fertility.html", category: "Conceiving Confidently" },
  { title: "PCOS: The Science Behind Polycystic Ovarian Syndrome", url: "pcos.html", category: "Conceiving Confidently" },
  
  // Contraception
  { title: "Birth Control Pills: The Science of Oral Contraception", url: "birthcontrolpills.html", category: "Contraception" },
  { title: "What is an IUD: The Complete Guide to Intrauterine Devices", url: "iud.html", category: "Contraception" },
  
  // Female Anatomy & Conditions
  { title: "Endometriosis: The Science Behind This Complex Condition", url: "endometriosis.html", category: "Female Anatomy & Conditions" },
  { title: "The Science of Endo Belly", url: "endobelly.html", category: "Female Anatomy & Conditions" },
  
  // Menstruation
  { title: "The Science of Menstruation: Understanding Periods", url: "period.html", category: "Menstruation" },
  { title: "The Science of Period Cramps", url: "cramps.html", category: "Menstruation" },
  { title: "Clue vs Flo: The Science Behind Period Tracking Apps", url: "cluevsflo.html", category: "Menstruation" },
  
  // Pregnancy
  { title: "Pregnancy: The Science of Morning Sickness", url: "morning-sickness.html", category: "Pregnancy" },
  { title: "Understanding Breastfeeding: The Science of Human Lactation", url: "breastfeeding.html", category: "Pregnancy" },
  { title: "The Science of Pregnancy Dating", url: "ultrasoundlmp.html", category: "Pregnancy" },
  { title: "The Science of Blood", url: "blood.html", category: "Pregnancy" },
  { title: "The Science Behind Pregnancy Dietary Restrictions", url: "pregfoods.html", category: "Pregnancy" },
  
  // Legal Rights
  { title: "What is Consent?", url: "what-is-consent.html", category: "Legal Rights" }
];

// DOM elements
let searchInput;
let searchResults;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSidebar();
});

// Main initialization function
function initializeSidebar() {
  // Get DOM elements
  searchInput = document.getElementById('searchInput');
  searchResults = document.getElementById('searchResults');
  
  // Set up event listeners
  setupSearchFunctionality();
  setupMobileHandlers();
  setActiveLink();
  
  console.log('Sidebar navigation initialized successfully');
}

// Search functionality
function setupSearchFunctionality() {
  if (!searchInput || !searchResults) {
    console.error('Search elements not found');
    return;
  }

  // Search input event listener
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (query.length === 0) {
      searchResults.classList.remove('active');
      return;
    }

    const filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.category.toLowerCase().includes(query)
    );

    displaySearchResults(filteredArticles);
  });

  // Hide search results when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
      searchResults.classList.remove('active');
    }
  });

  // Handle keyboard navigation in search results
  searchInput.addEventListener('keydown', function(e) {
    const activeResults = searchResults.querySelectorAll('li');
    const currentActive = searchResults.querySelector('li.keyboard-active');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateSearchResults(activeResults, currentActive, 'down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateSearchResults(activeResults, currentActive, 'up');
    } else if (e.key === 'Enter' && currentActive) {
      e.preventDefault();
      const link = currentActive.querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    }
  });
}

// Display search results
function displaySearchResults(results) {
  if (!searchResults) return;
  
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<li style="padding: 12px; color: rgba(255,255,255,0.7); font-style: italic;">No articles found</li>';
  } else {
    results.slice(0, 8).forEach((article, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${article.url}">${article.title}</a>`;
      
      // Add click tracking
      li.addEventListener('click', () => {
        trackSearchClick(article.title);
      });
      
      searchResults.appendChild(li);
    });
  }
  
  searchResults.classList.add('active');
}

// Navigate search results with keyboard
function navigateSearchResults(results, currentActive, direction) {
  if (results.length === 0) return;
  
  // Remove current active state
  if (currentActive) {
    currentActive.classList.remove('keyboard-active');
  }
  
  let newActiveIndex = 0;
  
  if (currentActive) {
    const currentIndex = Array.from(results).indexOf(currentActive);
    if (direction === 'down') {
      newActiveIndex = (currentIndex + 1) % results.length;
    } else {
      newActiveIndex = currentIndex === 0 ? results.length - 1 : currentIndex - 1;
    }
  }
  
  results[newActiveIndex].classList.add('keyboard-active');
}

// Section toggle functionality
function toggleSection(header) {
  if (!header) return;
  
  const content = header.nextElementSibling;
  const toggle = header.querySelector('.section-toggle');
  
  if (!content || !toggle) return;
  
  const isActive = content.classList.contains('active');
  
  // Toggle the section
  content.classList.toggle('active');
  
  // Update toggle icon rotation
  if (content.classList.contains('active')) {
    toggle.style.transform = 'rotate(180deg)';
  } else {
    toggle.style.transform = 'rotate(0deg)';
  }
  
  // Track section toggle
  const sectionName = header.querySelector('span').textContent;
  trackSectionToggle(sectionName, !isActive);
}

// Mobile sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.toggle('mobile-open');
    
    // Update mobile toggle button
    const toggleButton = document.querySelector('.mobile-toggle');
    if (toggleButton) {
      toggleButton.innerHTML = sidebar.classList.contains('mobile-open') ? '✕' : '☰';
    }
  }
}

// Setup mobile event handlers
function setupMobileHandlers() {
  // Close sidebar when clicking on main content on mobile
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          sidebar.classList.remove('mobile-open');
          const toggleButton = document.querySelector('.mobile-toggle');
          if (toggleButton) {
            toggleButton.innerHTML = '☰';
          }
        }
      }
    });
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.querySelector('.mobile-toggle');
    
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove('mobile-open');
      if (toggleButton) {
        toggleButton.innerHTML = '☰';
      }
    }
  });
}

// Set active link based on current page
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    // Remove any existing active class
    link.classList.remove('active');
    
    // Check if this link matches the current page
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      
      // Expand the parent section if it exists
      const section = link.closest('.section-content');
      if (section) {
        section.classList.add('active');
        const header = section.previousElementSibling;
        if (header) {
          const toggle = header.querySelector('.section-toggle');
          if (toggle) {
            toggle.style.transform = 'rotate(180deg)';
          }
        }
      }
    }
  });
}

// Utility Functions

// Track search clicks (for analytics)
function trackSearchClick(articleTitle) {
  // You can implement analytics tracking here
  console.log('Search click:', articleTitle);
  
  // Example: Google Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'search_click', {
      'search_term': searchInput.value,
      'article_title': articleTitle
    });
  }
}

// Track section toggles (for analytics)
function trackSectionToggle(sectionName, isOpened) {
  console.log('Section toggle:', sectionName, isOpened ? 'opened' : 'closed');
  
  // Example: Google Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'section_toggle', {
      'section_name': sectionName,
      'action': isOpened ? 'expand' : 'collapse'
    });
  }
}

// Clear search
function clearSearch() {
  if (searchInput) {
    searchInput.value = '';
    searchResults.classList.remove('active');
  }
}

// Get all articles (for external use)
function getAllArticles() {
  return articles;
}

// Search articles programmatically
function searchArticles(query) {
  return articles.filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) || 
    article.category.toLowerCase().includes(query.toLowerCase())
  );
}

// Expand all sections
function expandAllSections() {
  const sections = document.querySelectorAll('.section-content');
  const toggles = document.querySelectorAll('.section-toggle');
  
  sections.forEach(section => {
    section.classList.add('active');
  });
  
  toggles.forEach(toggle => {
    toggle.style.transform = 'rotate(180deg)';
  });
}

// Collapse all sections
function collapseAllSections() {
  const sections = document.querySelectorAll('.section-content');
  const toggles = document.querySelectorAll('.section-toggle');
  
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  toggles.forEach(toggle => {
    toggle.style.transform = 'rotate(0deg)';
  });
}

// Export functions for external use (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleSection,
    toggleSidebar,
    clearSearch,
    getAllArticles,
    searchArticles,
    expandAllSections,
    collapseAllSections
  };
}

// Global functions for HTML onclick handlers
window.toggleSection = toggleSection;
window.toggleSidebar = toggleSidebar;
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
  
