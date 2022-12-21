let menus = document.querySelectorAll(".h_menu a");
let depth2 = document.querySelector(".depth2");
let header = document.querySelector("header");
let side_menus = document.querySelectorAll(".menu a");
let slide_wrap = document.querySelector(".slide_wrap");
let prevY;
let prevPoint = 0;
let prevX = 0;
let cnt = 0;
let width, direction, index, interval;
let trigger = false;

window.onload = () => {
  setTimeout(() => {
    header.classList.add("show");
    prevY = window.scrollY;
    for (let slide of document.querySelectorAll(".slide_wrap a")) {
      slide.addEventListener("click", (e) => {
        e.preventDefault();
      });
    }
    interval = setInterval(() => {
      autoPlay();
    }, 1000);
  });
  let cloneFirst = slide_wrap.firstElementChild.cloneNode(true);
  let cloneLast = slide_wrap.lastElementChild.cloneNode(true);
  slide_wrap.append(cloneFirst);
  slide_wrap.prepend(cloneLast);
  index = 1;
  width = document.querySelector(".slide_wrap li").clientWidth;
  slide_wrap.style.transform = `translateX(-${index * width}px)`;
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
    let box_middle =
      document.querySelector(".box").offsetTop -
      document.querySelector(".box").offsetHeight;
    if (box_middle < window.scrollY)
      document.querySelector(".sec4_num").innerHTML = `284,438`;
  } else header.classList.add("show");
  prevY = currentY;
};

window.onresize = () => {
  width = document.querySelector(".slide_wrap li").clientWidth;
  slide_wrap.style.transform = `translateX(-${width * index}px)`;
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

slide_wrap.addEventListener("mousedown", (e) => {
  trigger = true;
  slide_wrap.style.transition = ``;
  clearInterval(interval);
  prevX = e.pageX;
});

slide_wrap.addEventListener("mousemove", (e) => {
  if (trigger == true) {
    moveX = prevX - e.pageX;
    slide_wrap.style.transform = `translateX(-${prevPoint + moveX}px)`;
  }
});

slide_wrap.addEventListener("mouseup", (e) => {
  nextX = e.pageX;
  move_slide(nextX);
  trigger = false;
});

slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  trigger = true;
  slide_wrap.style.transition = ``;
  clearInterval(interval);
  prevX = changedTouches[0].clientX;
});

slide_wrap.addEventListener("touchmove", ({ changedTouches }) => {
  if (trigger == true) {
    moveX = prevX - changedTouches[0].clientX;
    slide_wrap.style.transform = `translateX(-${prevPoint + moveX}px)`;
  }
});

slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  nextX = changedTouches[0].clientX;
  move_slide(nextX);
  trigger = false;
});

slide_wrap.addEventListener("transitionend", () => {
  if (index > slide_wrap.childElementCount - 2) {
    index = 1;
    slide_wrap.style.transition = ``;
    slide_wrap.style.transform = `translateX(-${width * index}px)`;
    setTimeout(() => {
      slide_wrap.style.transition = `.2s ease`;
    });
  } else if (index < 1) {
    index = slide_wrap.childElementCount - 2;
    slide_wrap.style.transition = ``;
    slide_wrap.style.transform = `translateX(-${width * index}px)`;
    setTimeout(() => {
      slide_wrap.style.transition = `.2s ease`;
    });
  }
});

document.body.addEventListener("mouseout", (e) => {
  move_slide(0);
  trigger = false;
});

function move_slide(x) {
  if (trigger == true) {
    direction = prevX - x;
    if (direction > width * 0.3) {
      index++;
    } else if (direction < -(width * 0.3)) {
      index--;
    }
    prevPoint = width * index;
    slide_wrap.style.transition = `.2s ease`;
    slide_wrap.style.transform = `translateX(-${prevPoint}px)`;
    setTimeout(() => {
      cnt = 0;
      interval = setInterval(() => {
        autoPlay();
      }, 1000);
    });
  }
}

function autoPlay() {
  cnt++;
  if (cnt > 3) {
    cnt = 0;
    index++;
  }
  prevPoint = width * index;
  slide_wrap.style.transition = `.2s ease`;
  slide_wrap.style.transform = `translateX(-${prevPoint}px)`;
}

let buttons = document.querySelectorAll(".btn_wrap button");
for (let button of buttons) {
  button.addEventListener("click", function () {
    let index = this.classList[0].split("")[3];
    clearActive(document.querySelectorAll(".sec2_menu"));
    clearActive(document.querySelectorAll(".about"));
    clearActive(document.querySelectorAll(".deco"));
    clearActive(buttons);
    document.querySelector(`.sec2_menu${index}`).classList.add("active");
    document.querySelector(`.about${index}`).classList.add("active");
    document.querySelector(`.deco${index}`).classList.add("active");
    this.classList.add("active");
  });
}

function clearActive(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}

document.querySelector(".go_top").addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});
