const cookieBar = document.getElementById("cookie-bar");
const acceptBtn = document.getElementById("cookie-accept");
const declineBtn = document.getElementById("cookie-decline");

// Якщо вже прийняли/відхилили — не показуємо
if (localStorage.getItem("cookieChoice")) {
  cookieBar.classList.add("hidden");
}

// При натисканні на будь-яку кнопку — ховаємо та зберігаємо вибір
acceptBtn.addEventListener("click", () => {
  localStorage.setItem("cookieChoice", "accepted");
  cookieBar.classList.add("hidden");
});

declineBtn.addEventListener("click", () => {
  localStorage.setItem("cookieChoice", "declined");
  cookieBar.classList.add("hidden");
});
