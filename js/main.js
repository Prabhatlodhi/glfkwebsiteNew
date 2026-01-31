/* GLEAFINK shared JS */

(function(){
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileDrawer = document.querySelector('[data-mobile-drawer]');

  // Sticky header effect
  const onScroll = () => {
    if(!header) return;
    header.classList.toggle('scrolled', window.scrollY > 6);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile nav
  if(mobileToggle && mobileDrawer){
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Modal (Request demo / Talk to expert)
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const openers = Array.from(document.querySelectorAll('[data-open-modal]'));
  const closers = Array.from(document.querySelectorAll('[data-close-modal]'));

  let lastActive = null;

  function openModal(preset){
    if(!modalBackdrop) return;
    lastActive = document.activeElement;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden','false');
    if(modalTitle) modalTitle.textContent = preset || 'Request a Demo';
    const first = modalBackdrop.querySelector('input,select,textarea,button');
    first && first.focus();
  }

  function closeModal(){
    if(!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden','true');
    if(lastActive) lastActive.focus();
  }

  openers.forEach(btn => btn.addEventListener('click', () => openModal(btn.getAttribute('data-open-modal'))));
  closers.forEach(btn => btn.addEventListener('click', closeModal));

  if(modalBackdrop){
    modalBackdrop.addEventListener('click', (e) => {
      if(e.target === modalBackdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modalBackdrop.classList.contains('open')) closeModal();
    });
  }

  // (Products infographic removed; now static cards on index.html)

  // Resources filter (resources.html)
  const filterRoot = document.querySelector('[data-resource-filter]');
  if(filterRoot){
    const chips = Array.from(filterRoot.querySelectorAll('.chip'));
    const cards = Array.from(document.querySelectorAll('[data-resource-card]'));
    const search = document.querySelector('[data-resource-search]');

    function applyFilters(){
      const active = chips.find(c => c.getAttribute('aria-pressed') === 'true');
      const type = active ? active.dataset.type : 'all';
      const q = (search?.value || '').trim().toLowerCase();

      cards.forEach(card => {
        const cardType = card.dataset.type;
        const hay = (card.textContent || '').toLowerCase();
        const matchType = (type === 'all') || (cardType === type);
        const matchQ = !q || hay.includes(q);
        card.style.display = (matchType && matchQ) ? '' : 'none';
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed','true');
        applyFilters();
      });
    });
    search?.addEventListener('input', applyFilters);
    applyFilters();
  }

  // Contact form validation (contact.html)
  const contactForm = document.querySelector('[data-contact-form]');
  if(contactForm){
    const status = document.querySelector('[data-form-status]');

    function setError(input, msg){
      const wrap = input.closest('.field');
      const err = wrap?.querySelector('.error');
      if(err) err.textContent = msg || '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    }

    function isEmail(v){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name="name"]');
      const email = contactForm.querySelector('input[name="email"]');
      const company = contactForm.querySelector('input[name="company"]');
      const message = contactForm.querySelector('textarea[name="message"]');

      let ok = true;
      [name,email,company,message].forEach(i => i && setError(i,''));

      if(!name.value.trim()){ setError(name,'Please enter your full name.'); ok=false; }
      if(!email.value.trim() || !isEmail(email.value.trim())){ setError(email,'Please enter a valid email.'); ok=false; }
      if(!company.value.trim()){ setError(company,'Please enter your company name.'); ok=false; }
      if(!message.value.trim() || message.value.trim().length < 20){ setError(message,'Please share a bit more detail (at least 20 characters).'); ok=false; }

      if(!ok){
        status.innerHTML = '<div class="error">Please fix the highlighted fields and try again.</div>';
        return;
      }

      status.innerHTML = '<div class="success">Thanks — we\'ve received your message. Our team will reach out shortly.</div>';
      contactForm.reset();
    });
  }

  // Footer year
  const yearEl = document.querySelector('[data-year]');
  if(yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Product Tabs
  const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  const tabContents = Array.from(document.querySelectorAll('.tab-content'));

  if(tabButtons.length > 0 && tabContents.length > 0){
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        
        // Show corresponding content
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if(targetContent){
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Features Section Navigation (metaInsights.html)
  const featureNavItems = Array.from(document.querySelectorAll('.feature-nav-item'));
  const featurePanels = Array.from(document.querySelectorAll('.feature-panel'));

  if(featureNavItems.length > 0 && featurePanels.length > 0){
    featureNavItems.forEach(navItem => {
      navItem.addEventListener('click', () => {
        const targetFeature = navItem.getAttribute('data-feature');
        
        // Remove active class from all nav items and panels
        featureNavItems.forEach(item => item.classList.remove('active'));
        featurePanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked nav item
        navItem.classList.add('active');
        
        // Show corresponding panel
        const targetPanel = document.querySelector(`[data-feature-panel="${targetFeature}"]`);
        if(targetPanel){
          targetPanel.classList.add('active');
        }
      });
    });
  }
})();
