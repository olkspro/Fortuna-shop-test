const API_URL =
  "https://script.google.com/macros/s/AKfycbxH0TBaDp8eUskxx9OcnUNXkPwrNJrtF3QwbRjGPhn50uN3PqD-k0rlQ8aBK4ghs943/exec";

fetch(API_URL)
  .then((res) => res.json())
  .then((items) => {
    const newBox = document.getElementById("new-products");
    const loader = document.getElementById("loader");

    loader.classList.add("hidden");

    const latest = items.reverse();

    latest.forEach((item) => {
      newBox.innerHTML += `
        <div class="card">
          <div class="product" onclick="openProduct(${item.id})">
            <img src="${item.images[0] || ''}" class="card-img-top" alt="Фото товару">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <div class="product-price">${item.price} ₴</div>
              <a href="#" class="stretched-link"></a>
            </div>
          </div>
        </div>
      `;
    });
  })
  .catch((err) => console.error(err));

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
