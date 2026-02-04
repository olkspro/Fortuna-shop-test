const API_URL =
  "https://script.google.com/macros/s/AKfycbxH0TBaDp8eUskxx9OcnUNXkPwrNJrtF3QwbRjGPhn50uN3PqD-k0rlQ8aBK4ghs943/exec";

// 1️⃣ беремо id з URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId) {
  document.body.innerHTML = "Товар не знайдено";
  throw new Error("No product id");
}

// 2️⃣ тягнемо всі товари
fetch(API_URL)
  .then((res) => res.json())
  .then((items) => {
    const loader = document.getElementById("loader");

    // 3️⃣ шукаємо потрібний товар
    const product = items.find((item) => String(item.id) === productId);

    if (!product) {
      document.body.innerHTML = "Товар не знайдено";
      return;
    }

    // 4️⃣ рендер
    renderProduct(product);
  })
  .catch((err) => {
    console.error(err);
    document.body.innerHTML = "Помилка завантаження";
  });



function renderProduct(item) {
  // 🖼 фото
  const carouselInner = document.getElementById("carouselInner");
  const thumbs = document.getElementById("carouselThumbs");

  // 🖼 основні слайди
  carouselInner.innerHTML = item.images
    .map(
      (src, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${src}">
      </div>
    `
    )
    .join("");

  // 🔍 thumbnails
  thumbs.innerHTML = item.images
    .map(
      (src, i) => `
      <img src="${src}" data-index="${i}" class="${i === 0 ? "active" : ""}">
    `
    )
    .join("");

  const carousel = new bootstrap.Carousel("#productCarousel");

  // 👉 клік по thumbnail
  thumbs.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
      const index = img.dataset.index;
      carousel.to(index);
    });
  });

  // 👉 активний thumbnail при свайпі
  document
    .getElementById("productCarousel")
    .addEventListener("slid.bs.carousel", (e) => {
      thumbs.querySelectorAll("img").forEach((t) => t.classList.remove("active"));
      thumbs.children[e.to].classList.add("active");
    });
  // 📄 права секція
  const info = document.getElementById("product-info");
  
  loader.classList.add("hidden");

  info.innerHTML = `
    <h1 class="product-title">${item.title}</h1>

    <div class="product-price">${item.price} ₴</div>

    <hr>

    <div class="product-size-block">
      <div class="label">РОЗМІР</div>
      <div class="size-text">${item.sizeText || "—"}</div>
    </div>

    <a href="${item.link}" target="_blank">Перейти в Telegram</a>

    <hr>

    <div class="product-description">
      ${item.desc.replace(/\n/g, "<br>")}
    </div>
  `;
}