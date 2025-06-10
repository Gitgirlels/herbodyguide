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
/**
 * Search through articles in the quick menu
 * @param {string} query - Search query from input
 */
function searchArticles(query) {
  const searchResults = document.getElementById('searchResults');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  // Clear previous results
  searchResults.innerHTML = '';
  
  if (query.trim() === '') {
    // Show all categories when search is empty
    menuCategories.forEach(category => {
      category.style.display = 'block';
    });
    searchResults.style.display = 'none';
    return;
  }
  
  // Hide categories when searching
  menuCategories.forEach(category => {
    category.style.display = 'none';
  });
  
  // Search through all links
  const allLinks = document.querySelectorAll('.menu-links a');
  const matchingResults = [];
  
  allLinks.forEach(link => {
    const title = link.textContent.toLowerCase();
    const searchTerm = query.toLowerCase();
    
    if (title.includes(searchTerm)) {
      matchingResults.push({
        title: link.textContent,
        url: link.href,
        category: link.closest('.menu-category').querySelector('h3').textContent
      });
    }
  });
  
  // Display results
  if (matchingResults.length > 0) {
    searchResults.innerHTML = `
      <div class="search-results-header">Found ${matchingResults.length} result${matchingResults.length !== 1 ? 's' : ''}:</div>
      ${matchingResults.map(result => `
        <div class="search-result-item">
          <a href="${result.url}">${highlightSearchTerm(result.title, query)}</a>
          <span class="result-category">${result.category}</span>
        </div>
      `).join('')}
    `;
  } else {
    searchResults.innerHTML = `
      <div class="no-search-results">No articles found for "${query}"</div>
    `;
  }
  
  searchResults.style.display = 'block';
}

/**
 * Highlight search terms in article titles
 * @param {string} text - Text to highlight
 * @param {string} query - Search query to highlight
 * @returns {string} Text with highlighted terms
 */
function highlightSearchTerm(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark style="background-color: rgba(230, 163, 222, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// ==========================
// Website Search Functionality
// ==========================

// Website content database - Add your actual content here
const websiteContent = [
  {
    title: "Factors Affecting Fertilization & Implantation",
    url: "post1.html",
    category: "conceiving",
    excerpt: "Understanding the biological factors that influence fertilization and implantation can help you optimize your chances of success. A complex process influenced by numerous factors that science is continuing to unravel.",
    date: "June 1, 2025",
    keywords: ["fertilization", "implantation", "conception", "pregnancy", "fertility", "ovulation", "embryo"]
  },
  {
    title: "The Reproductive Anatomy: Key Players in Conception",
    url: "post2.html",
    category: "anatomy",
    excerpt: "Understanding how your reproductive organs work is essential: ovaries, fallopian tubes, uterus, cervix, sperm—all must function in harmony for conception to occur.",
    date: "June 1, 2025",
    keywords: ["anatomy", "reproductive", "ovaries", "fallopian tubes", "uterus", "cervix", "conception"]
  },
  {
    title: "Top 10 Prenatal Vitamins: Science and Chemistry",
    url: "post3.html",
    category: "conceiving",
    excerpt: "Prenatal vitamins support a healthy pregnancy. Folic acid, iron, calcium, vitamin D, and omega-3 are crucial—here's why and how they work chemically.",
    date: "June 1, 2025",
    keywords: ["prenatal vitamins", "folic acid", "iron", "calcium", "vitamin D", "omega-3", "pregnancy", "supplements"]
  },
  {
    title: "Miscarriage: The Science of Pregnancy Loss",
    url: "miscarriage.html",
    category: "pregnancy",
    excerpt: "Miscarriage affects approximately 15-20% of recognized pregnancies. This comprehensive guide explores the biology, causes, treatment options, and emotional aspects of pregnancy loss.",
    date: "June 3, 2025",
    keywords: ["miscarriage", "pregnancy loss", "early pregnancy", "complications", "fertility"]
  },
  {
    title: "The Complete Guide to Reproductive Hormones",
    url: "hormones.html",
    category: "anatomy",
    excerpt: "Reproductive hormones work like a sophisticated communication network, preparing your body for conception, supporting pregnancy, and regulating fertility.",
    date: "June 1, 2025",
    keywords: ["hormones", "reproductive", "ovulation", "menstrual cycle", "fertility", "pregnancy", "estrogen", "progesterone"]
  },
  {
    title: "The Science of Fertility: Understanding Women's Fertility and Aging",
    url: "what-is-fertility.html",
    category: "conceiving",
    excerpt: "Female fertility follows a predictable biological timeline. Understanding fertility aging, ovarian reserve, and egg quality decline empowers informed reproductive decisions.",
    date: "June 3, 2025",
    keywords: ["fertility", "aging", "ovarian reserve", "egg quality", "biological clock", "reproduction"]
  },
  {
    title: "Birth Control Pills: The Science of Oral Contraception",
    url: "birthcontrolpills.html",
    category: "contraception",
    excerpt: "Birth control pills represent one of the most significant medical advances of the 20th century. Currently used by over 100 million women globally with 91-99% effectiveness.",
    date: "June 5, 2025",
    keywords: ["birth control", "contraception", "oral contraceptives", "hormones", "prevention", "family planning"]
  },
  {
    title: "What is an IUD: The Complete Guide to Intrauterine Devices",
    url: "iud.html",
    category: "contraception",
    excerpt: "IUDs represent one of the most effective forms of reversible contraception with failure rates as low as 0.02-0.08%. Long-acting birth control for 3-12 years.",
    date: "June 5, 2025",
    keywords: ["IUD", "intrauterine device", "contraception", "birth control", "long-acting", "reversible"]
  },
  {
    title: "The Science of Menstruation: Understanding Periods",
    url: "period.html",
    category: "menstruation",
    excerpt: "The average menstrual cycle lasts 28 days, with normal cycles ranging from 21 to 35 days. Understanding the biological processes behind menstruation.",
    date: "June 2, 2025",
    keywords: ["menstruation", "period", "menstrual cycle", "bleeding", "reproductive health", "hormones"]
  },
  {
    title: "The Science of Period Cramps: Understanding Menstrual Pain",
    url: "cramps.html",
    category: "menstruation",
    excerpt: "Period cramps affect up to 90% of menstruating women. This guide explores the molecular mechanisms of dysmenorrhea and scientifically-proven relief methods.",
    date: "June 1, 2025",
    keywords: ["period cramps", "menstrual pain", "dysmenorrhea", "pain relief", "menstruation"]
  },
  {
    title: "Pregnancy: The Science of Morning Sickness",
    url: "morning-sickness.html",
    category: "pregnancy",
    excerpt: "Morning sickness affects most pregnant women. Symptoms can occur at any time and typically begin between 4-6 weeks of pregnancy, peaking around 9-10 weeks.",
    date: "June 3, 2025",
    keywords: ["morning sickness", "pregnancy", "nausea", "vomiting", "first trimester", "symptoms"]
  },
  {
    title: "Understanding Breastfeeding: The Science of Human Lactation",
    url: "breastfeeding.html",
    category: "pregnancy",
    excerpt: "Breastfeeding involves complex anatomical, physiological, and hormonal mechanisms. This guide explores breast anatomy, milk production, and feeding techniques.",
    date: "June 3, 2025",
    keywords: ["breastfeeding", "lactation", "breast milk", "nursing", "infant feeding", "postpartum"]
  },
  {
    title: "What is Consent?",
    url: "what-is-consent.html",
    category: "legal",
    excerpt: "Understanding sexual consent from legal, historical, and scientific perspectives empowers women to recognize their rights and make informed decisions.",
    date: "June 1, 2025",
    keywords: ["consent", "sexual consent", "legal rights", "women's rights", "boundaries", "autonomy"]
  }
];

// Global variables
let currentCategory = 'all';
let lastSearchQuery = '';

// Mobile menu toggle function
    function toggleMobileMenu() {
      const menuNav = document.getElementById('menuNav');
      menuNav.classList.toggle('active');
    }

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

/**
 * Hides search results
 */
function hideResults() {
  document.getElementById('searchResults').style.display = 'none';
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
  
