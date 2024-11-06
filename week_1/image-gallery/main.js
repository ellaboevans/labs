const galleryContainer = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const fullImage = document.getElementById("full-image");
const captionText = document.getElementById("caption");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const closeButton = document.getElementById("close-btn");
const footer = document.getElementById("footer-container");

// Imports
import { IMAGES } from "./data.js";

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  let copy = new Date().getFullYear();
  let small = document.createElement("small");
  small.innerHTML = `&copy; ${copy} | Interactive Image Gallery.`;
  small.style.paddingBottom = "25px";
  small.style.paddingTop = "30px";
  footer.appendChild(small);
});

// Create thumbnail elements
IMAGES.forEach((image, index) => {
  const img = document.createElement("img");
  img.src = image.thumbnailUrl;
  img.alt = image.caption;

  img.addEventListener("click", () => openLightbox(index));
  galleryContainer.appendChild(img);
});

// Functions for opening lightbox
// and closing lightbox
function openLightbox(index) {
  currentIndex = index;
  fullImage.src = IMAGES[index].imageUrl;
  captionText.textContent = IMAGES[index].caption;
  lightbox.classList.add("active");
  document.body.style.overflowY = "hidden";

  // Removing or disabling buttons when
  // the user clicks on the first or last item in the gallery
  prevButton.disabled = currentIndex === 0 ? true : false;
  nextButton.disabled = currentIndex === IMAGES.length - 1 ? true : false;
}

function closeWithEscKey(event) {
  if (event.key === "Escape") {
    closeLightBox();
  }
}
function closeLightBox() {
  lightbox.classList.remove("active");
  document.body.style.overflowY = "auto";
}

function prevousItem() {
  if (currentIndex > 0) {
    openLightbox(currentIndex - 1);
  }
}
function nextItem() {
  if (currentIndex < IMAGES.length - 1) {
    openLightbox(currentIndex + 1);
  }
}

// Event handlers
closeButton.addEventListener("click", closeLightBox);

nextButton.addEventListener("click", nextItem);

prevButton.addEventListener("click", prevousItem);

// Enabling users to close lighbox
// when they press the escape key
document.addEventListener("keyup", (e) => closeWithEscKey(e));
