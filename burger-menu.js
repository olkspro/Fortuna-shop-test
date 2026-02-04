  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('overlay');

  burger.onclick = () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  overlay.onclick = () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
  };