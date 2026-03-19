(function () {
  const mainProducts = document.getElementById("mainProducts");
  const categoryButtons = document.querySelectorAll(".category-buttons .btn");
  const detailSections = document.querySelectorAll(".detail-section");
  const viewButtons = document.querySelectorAll(".view-btn");
  const backButtons = document.querySelectorAll(".back-btn");

  // Helper: show main grid and hide all detail sections
  function showMainGridAndScroll() {
    detailSections.forEach((section) => section.classList.remove("active"));
    if (mainProducts) mainProducts.style.display = "grid";
    document
      .querySelector(".category-buttons")
      .scrollIntoView({ behavior: "smooth" });
  }

  // Helper: show a specific detail section by ID, hide main grid
  function showDetailSection(sectionId) {
    if (mainProducts) mainProducts.style.display = "none";
    detailSections.forEach((section) => section.classList.remove("active"));
    const target = document.getElementById(sectionId);
    if (target) {
      target.classList.add("active");
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  // ---- View More buttons ----
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const targetId = this.getAttribute("data-target");
      if (targetId) showDetailSection(targetId);
    });
  });

  // ---- LIGHTBOX: click on any product image to open modal ----
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-btn");

  document.addEventListener("click", function (e) {
    const img = e.target.closest(".card img");
    if (img) {
      e.preventDefault();
      e.stopPropagation();
      modalImg.src = img.src;
      modal.classList.add("show");
    }
  });

  // Close modal when clicking on close button or outside the image
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      // click on background
      modal.classList.remove("show");
    }
  });

  // ---- Back buttons ----
  backButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      showMainGridAndScroll();
      categoryButtons.forEach((b) => b.classList.remove("active"));
      if (categoryButtons.length > 0)
        categoryButtons[0].classList.add("active");
    });
  });

  // ---- Category buttons ----
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      categoryButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      if (targetId === "main") {
        showMainGridAndScroll();
      } else {
        if (targetId) showDetailSection(targetId);
      }
    });
  });

  // ---- Initial state ----
  if (mainProducts) mainProducts.style.display = "grid";
  detailSections.forEach((section) => section.classList.remove("active"));
  categoryButtons.forEach((btn, index) => {
    if (index === 0) btn.classList.add("active");
    else btn.classList.remove("active");
  });
})();
