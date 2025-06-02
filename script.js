// ─── Wait until DOM is loaded ───
document.addEventListener('DOMContentLoaded', () => {
    handleCommentForms();
    handleSubscribeForm();
    initScrollReveal();
    initBackToTop();
  });
  
  
  
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
  