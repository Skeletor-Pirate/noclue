// noClue — Client Interactions & Event Handling
// Authentic WeAreDevelopers Layout & Behavior

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live World Clocks (Bengaluru, Delhi, Mumbai, SF, Berlin)
  function updateWorldClocks() {
    const now = new Date();
    const timeFormat = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    const blrElem = document.getElementById('clock-blr');
    const delElem = document.getElementById('clock-del');
    const bomElem = document.getElementById('clock-bom');
    const sfoElem = document.getElementById('clock-sfo');
    const berElem = document.getElementById('clock-ber');

    if (blrElem) blrElem.textContent = now.toLocaleTimeString('en-US', { ...timeFormat, timeZone: 'Asia/Kolkata' });
    if (delElem) delElem.textContent = now.toLocaleTimeString('en-US', { ...timeFormat, timeZone: 'Asia/Kolkata' });
    if (bomElem) bomElem.textContent = now.toLocaleTimeString('en-US', { ...timeFormat, timeZone: 'Asia/Kolkata' });
    if (sfoElem) sfoElem.textContent = now.toLocaleTimeString('en-US', { ...timeFormat, timeZone: 'America/Los_Angeles' });
    if (berElem) berElem.textContent = now.toLocaleTimeString('en-US', { ...timeFormat, timeZone: 'Europe/Berlin' });
  }
  updateWorldClocks();
  setInterval(updateWorldClocks, 1000);

  // 2. Theme Switcher (light, dark, terminal, halloween)
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-val');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
    });
  });

  // 3. Hero Headline Switcher Tabs
  const headlinePills = document.querySelectorAll('.headline-pill');
  const heroH1 = document.getElementById('hero-dynamic-h1');
  const heroSub = document.getElementById('hero-dynamic-sub');

  const heroOptions = [
    {
      title: "Where AI gets built for real.",
      sub: "noClue is a curated network of builders, founders, engineers, and domain experts working with AI as a core capability. We run high-density in-person events, provide infrastructure and distribution, and turn experiments into production software."
    },
    {
      title: "AI changed what's possible. Nobody agreed on who builds it.",
      sub: "Demos are multiplying exponentially, but production software requires hardened latency, token bounds, and verified reliability. We bring the real builders together."
    },
    {
      title: "The people building with AI are scattered. We're fixing that.",
      sub: "The best engineers are operating in silos. The best problems are trapped inside companies that don't know how to build with AI. noClue creates the physical room where they collide."
    },
    {
      title: "Less hype. More shipped.",
      sub: "No vendor sales pitches disguised as lightning talks. Only high-density architectural teardowns, peer code reviews, and production systems tested under real-world conditions."
    }
  ];

  headlinePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.getAttribute('data-idx') || '0', 10);
      headlinePills.forEach(p => {
        p.classList.remove('bg-primary', 'text-primary-content');
        p.classList.add('text-base-content/60');
      });
      pill.classList.add('bg-primary', 'text-primary-content');
      pill.classList.remove('text-base-content/60');

      if (heroH1 && heroSub && heroOptions[idx]) {
        heroH1.style.opacity = '0';
        heroSub.style.opacity = '0';
        setTimeout(() => {
          heroH1.textContent = heroOptions[idx].title;
          heroSub.textContent = heroOptions[idx].sub;
          heroH1.style.opacity = '1';
          heroSub.style.opacity = '1';
        }, 150);
      }
    });
  });

  if (heroH1 && heroSub) {
    heroH1.style.transition = 'opacity 0.2s ease-in-out';
    heroSub.style.transition = 'opacity 0.2s ease-in-out';
  }

  // 4. Moments Horizontal Reel Navigation
  const momentsReel = document.getElementById('moments-reel');
  const prevBtn = document.getElementById('reel-prev-btn');
  const nextBtn = document.getElementById('reel-next-btn');

  if (prevBtn && momentsReel) {
    prevBtn.addEventListener('click', () => {
      momentsReel.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }

  if (nextBtn && momentsReel) {
    nextBtn.addEventListener('click', () => {
      momentsReel.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  // 5. Modal Dialogs Handling
  const applyModal = document.getElementById('apply-modal');
  const partnerModal = document.getElementById('partner-modal');
  const cfpModal = document.getElementById('cfp-modal');
  const searchModal = document.getElementById('search-modal');

  // Apply Buttons
  document.querySelectorAll('.open-apply-modal-btn, #header-apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (applyModal) applyModal.showModal();
    });
  });

  // Partner Buttons
  document.querySelectorAll('.open-partner-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (partnerModal) partnerModal.showModal();
    });
  });

  // CFP Buttons
  document.querySelectorAll('.open-cfp-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const city = btn.getAttribute('data-city');
      const select = document.getElementById('cfp-city-select');
      if (select && city) {
        select.value = city;
      }
      if (cfpModal) cfpModal.showModal();
    });
  });

  // Global Search Dialog (Button & ⌘K)
  const searchTriggerBtn = document.getElementById('search-trigger-btn');
  if (searchTriggerBtn) {
    searchTriggerBtn.addEventListener('click', () => {
      if (searchModal) {
        searchModal.showModal();
        const input = document.getElementById('modal-search-input');
        if (input) setTimeout(() => input.focus(), 50);
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal) {
        if (searchModal.open) {
          searchModal.close();
        } else {
          searchModal.showModal();
          const input = document.getElementById('modal-search-input');
          if (input) setTimeout(() => input.focus(), 50);
        }
      }
    }
  });

  // Search Filter Handling in Modal
  const modalSearchInput = document.getElementById('modal-search-input');
  const searchResultsList = document.getElementById('search-results-list');
  if (modalSearchInput && searchResultsList) {
    modalSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = searchResultsList.querySelectorAll('div[onclick]');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Hero Search Form
  const heroSearchForm = document.getElementById('hero-search-form');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('hero-search-input');
      const query = input ? input.value.trim() : '';
      if (query && searchModal) {
        searchModal.showModal();
        const modalInput = document.getElementById('modal-search-input');
        if (modalInput) {
          modalInput.value = query;
          modalInput.dispatchEvent(new Event('input'));
        }
      }
    });
  }

  // Form Submissions with Toast Feedback
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 rounded-2xl bg-primary text-primary-content px-6 py-4 shadow-2xl font-semibold text-sm transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  const applyForm = document.getElementById('apply-form');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      applyModal.close();
      showToast('Application received! The noClue technical committee will review your repos and contact you within 48 hours.');
      applyForm.reset();
    });
  }

  const cfpForm = document.getElementById('cfp-form');
  if (cfpForm) {
    cfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      cfpModal.close();
      showToast('CFP submitted! Session proposals are reviewed on code depth and architectural honesty.');
      cfpForm.reset();
    });
  }

  const partnerForm = document.getElementById('partner-form');
  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      partnerModal.close();
      showToast('Partner deck request received! Raghav and the partnerships team will reach out with integration tiers.');
      partnerForm.reset();
    });
  }

  // 6. Video Play Button Toggle Simulation
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoTimeDisplay = document.getElementById('video-time-display');
  let isPlaying = false;
  if (videoPlayBtn && videoTimeDisplay) {
    videoPlayBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        videoPlayBtn.innerHTML = '<svg class="size-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        showToast('Playback initiated: Turning AI Experiments into Production Software (Audio Stream)');
      } else {
        videoPlayBtn.innerHTML = '<svg class="size-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      }
    });
  }

  console.log('noClue: Authentic WeAreDevelopers replica initialized successfully.');
});
