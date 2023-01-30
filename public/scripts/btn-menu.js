//@Author: João Portela
//Last-update: 14/09/2022 by Farias-sys
//File description: Configurações do menu

const btnMobile = document.getElementById("btn-mobile");
const closeMenuBtn = document.getElementById("toggle-menu-hamburguer");
const closeMenuBtn1 = document.getElementById("toggle-menu-hamburguer-1");
const closeMenuBtn2 = document.getElementById("toggle-menu-hamburguer-2");

// Para fazer com que o menu feche ao clicar na página desejada, coloquei um btn em cima do <a>
//e trabalhei em cima disso


function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();

  const nav = document.getElementById("nav");
  nav.classList.toggle("active");

  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", active);

  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    (scrollLeft = window.pageXOffset || document.documentElement.scrollLeft),
      // if any scroll is attempted, set this to the previous value
      (window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      });
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
    window.onscroll = function () {};
  }
}


closeMenuBtn1.addEventListener("click", toggleMenu);
closeMenuBtn1.addEventListener("touchstart", toggleMenu);
closeMenuBtn2.addEventListener("click", toggleMenu);
closeMenuBtn2.addEventListener("touchstart", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("touchstart", toggleMenu);
btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);
