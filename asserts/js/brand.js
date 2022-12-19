let menus = document.querySelectorAll(".h_menu a");
let depth2 = document.querySelector(".depth2");
let header = document.querySelector("header");
let side_menus = document.querySelectorAll(".menu a");
let prevY;

window.onload = () => {
  setTimeout(() => {
    header.classList.add("show");
    prevY = window.scrollY;
  });
};

window.onscroll = () => {
  let currentY = window.scrollY;
  let direction = currentY - prevY;
  if (window.scrollY > 0) {
    if (direction < 0) header.classList.add("show");
    else {
      header.classList.remove("show");
      depth2.classList.remove("show");
      document.querySelector(".found").classList.remove("convert");
    }
  } else header.classList.add("show");
  prevY = currentY;
};

document.querySelector(".btn_side").addEventListener("click", () => {
  document.querySelector(".side_menu").classList.add("active");
});

document.querySelector(".btn_close").addEventListener("click", () => {
  document.querySelector(".side_menu").classList.remove("active");
});

for (let side_menu of side_menus) {
  side_menu.addEventListener("click", function (e) {
    e.preventDefault();
    let wrap = this.parentElement.parentElement;
    wrap.classList.toggle("active");
  });
}

document.body.addEventListener("mousemove", function (e) {
  let cursor = document.querySelector(".cursor");
  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
});

for (let menu of menus) {
  menu.addEventListener("mouseenter", () => {
    depth2.classList.add("show");
    document.querySelector(".found").classList.add("convert");
  });
}

header.addEventListener("mouseleave", () => {
  depth2.classList.remove("show");
  document.querySelector(".found").classList.remove("convert");
});
