
  (function() {
    const mainProducts = document.getElementById('mainProducts');
    const categoryButtons = document.querySelectorAll('.category-buttons .btn');
    const detailSections = document.querySelectorAll('.detail-section');
    const viewButtons = document.querySelectorAll('.view-btn');
    const backButtons = document.querySelectorAll('.back-btn');

    // helper: show main grid (Office Chairs) and hide all detail sections
    function showMainGridAndScroll() {
      detailSections.forEach(section => section.classList.remove('active'));
      if (mainProducts) mainProducts.style.display = 'grid';
      document.querySelector('.category-buttons').scrollIntoView({ behavior: 'smooth' });
    }

    // helper: show a specific detail section by ID, hide main grid
    function showDetailSection(sectionId) {
      if (mainProducts) mainProducts.style.display = 'none';
      detailSections.forEach(section => section.classList.remove('active'));
      const target = document.getElementById(sectionId);
      if (target) {
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // ---- View More buttons (existing) ----
    viewButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const targetId = this.getAttribute('data-target');
        if (targetId) showDetailSection(targetId);
      });
    });

    // ---- NEW: Click on images inside main product cards ----
    const mainProductImages = document.querySelectorAll('#mainProducts .card img');
    mainProductImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        const card = this.closest('.card');
        const btn = card.querySelector('.view-btn');
        if (btn) {
          const targetId = btn.getAttribute('data-target');
          if (targetId) showDetailSection(targetId);
        }
      });
    });

    // ---- Back buttons ----
    backButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        showMainGridAndScroll();
        // set active class to first (Office Chairs) button
        categoryButtons.forEach(b => b.classList.remove('active'));
        if (categoryButtons.length > 0) categoryButtons[0].classList.add('active');
      });
    });

    // ---- Category buttons (orange) ----
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        categoryButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (targetId === 'main') {
          // Office Chairs – show main grid
          showMainGridAndScroll();
        } else {
          // any other category – show its detail section
          if (targetId) showDetailSection(targetId);
        }
      });
    });

    // ---- initial state: main grid visible, Office Chairs active ----
    if (mainProducts) mainProducts.style.display = 'grid';
    detailSections.forEach(section => section.classList.remove('active'));
    categoryButtons.forEach((btn, index) => {
      if (index === 0) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  })();
