// ========== CATEGORY SWITCHING ==========
const mainProducts = document.getElementById("mainProducts");
const categoryButtons = document.querySelectorAll(".category-buttons .btn");
const detailSections = document.querySelectorAll(".detail-section");
const viewButtons = document.querySelectorAll(".view-btn");
const backButtons = document.querySelectorAll(".back-btn");

function showMainGrid() {
  detailSections.forEach((section) => section.classList.remove("active"));
  if (mainProducts) mainProducts.style.display = "grid";
  document
    .querySelector(".category-buttons")
    .scrollIntoView({ behavior: "smooth" });
}

function showDetailSection(sectionId) {
  if (mainProducts) mainProducts.style.display = "none";
  detailSections.forEach((section) => section.classList.remove("active"));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// View More buttons
viewButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    const targetId = this.getAttribute("data-target");
    if (targetId) showDetailSection(targetId);
    // update active category button (optional – just visual)
    categoryButtons.forEach((b) => b.classList.remove("active"));
    const matchingCat = Array.from(categoryButtons).find(
      (b) => b.getAttribute("data-target") === targetId,
    );
    if (matchingCat) matchingCat.classList.add("active");
  });
});

// Back buttons
backButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    showMainGrid();
    categoryButtons.forEach((b) => b.classList.remove("active"));
    const officeChairBtn = Array.from(categoryButtons).find(
      (b) => b.getAttribute("data-target") === "main",
    );
    if (officeChairBtn) officeChairBtn.classList.add("active");
  });
});

// Category buttons
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    categoryButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    if (targetId === "main") {
      showMainGrid();
    } else if (targetId) {
      showDetailSection(targetId);
    }
  });
});

// INITIAL STATE: nothing active, main grid hidden
if (mainProducts) mainProducts.style.display = "none";
detailSections.forEach((section) => section.classList.remove("active"));
categoryButtons.forEach((btn) => btn.classList.remove("active"));

// ========== LIGHTBOX (single image) ==========
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");

document.addEventListener("click", function (e) {
  const img = e.target.closest(".card img");
  if (img && !img.closest("[onclick]")) {
    // avoid conflict with multi‑image cards
    e.preventDefault();
    e.stopPropagation();
    modalImg.src = img.src;
    modal.classList.add("show");
  }
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("show");
});
modal.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.remove("show");
});

// ========== MULTI‑IMAGE PREVIEW ==========
const multiModal = document.getElementById("multiImageModal");
const multiMain = document.getElementById("multiMainImg");
const thumbContainer = document.getElementById("multiThumbContainer");

window.showMultiImagePreview = function (imageArray) {
  if (!imageArray || imageArray.length === 0) return;
  multiMain.src = imageArray[0];
  thumbContainer.innerHTML = "";
  imageArray.forEach((src, idx) => {
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = "thumbnail";
    thumb.addEventListener("click", () => {
      multiMain.src = src;
    });
    thumbContainer.appendChild(thumb);
  });
  multiModal.style.display = "flex";
};

window.closeMultiImagePreview = function () {
  multiModal.style.display = "none";
};

multiModal.addEventListener("click", function (e) {
  if (e.target === multiModal) closeMultiImagePreview();
});
