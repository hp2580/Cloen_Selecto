let boxes = document.querySelectorAll(".desc");
let rotatable;

window.onload = () => {
  checkRotate();
};

window.onresize = () => {
  checkRotate();
};

document.body.addEventListener("mousemove", function (e) {
  let cursor = document.querySelector(".cursor");
  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
});

for (let box of boxes) {
  box.addEventListener("mouseenter", function () {
    if (rotatable == true) {
      let circle = this.nextElementSibling;
      circle.style.animation = `rotate 5s infinite linear`;
    }
  });
  box.addEventListener("mouseleave", function () {
    if (rotatable == true) {
      let circle = this.nextElementSibling;
      circle.style.animation = "";
    }
  });
}

function checkRotate() {
  if (window.innerWidth > 950) rotatable = true;
  else rotatable = false;
}
