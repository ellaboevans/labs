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
  let p = document.createElement("p");
  p.innerHTML = `&copy; ${copy} | Interactive Image Gallery.`;
  p.style.fontSize = "20px";
  p.style.paddingBottom = "25px";
  p.style.paddingTop = "30px";
  footer.appendChild(p);
});

// Create thumbnail elements
IMAGES.forEach((image, index) => {
  const img = document.createElement("img");
  img.src = image.thumbnailUrl;
  img.alt = image.caption;
  img.addEventListener("click", () => openLightbox(index));
  galleryContainer.appendChild(img);
});

function openLightbox(index) {
  currentIndex = index;
  fullImage.src = IMAGES[index].imageUrl;
  captionText.textContent = IMAGES[index].caption;
  //   lightbox.style.display = "block"; // removed this line to enable smooth transition
  lightbox.classList.add("active");
  document.body.style.overflowY = "hidden";
}

function closeLightBox() {
  lightbox.classList.remove("active");
  document.body.style.overflowY = "auto";
}

closeButton.addEventListener("click", closeLightBox);

nextButton.addEventListener("click", () => {
  if (currentIndex < IMAGES.length - 1) {
    openLightbox(currentIndex + 1);
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    openLightbox(currentIndex - 1);
  }
});
