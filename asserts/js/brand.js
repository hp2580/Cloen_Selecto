const menus = document.querySelectorAll(".h_menu a"),
  depth2 = document.querySelector(".depth2"),
  header = document.querySelector("header"),
  side_menus = document.querySelectorAll(`.menu a:not(.found)`),
  slide_wrap = document.querySelector(".slide_wrap"),
  text_wrap = document.querySelector(".text_slide_wrap");
let prevY;
let prevX = 0;
let cnt = 0;
let width, direction, index, interval, interval2;
let trigger = true;
let mouseDown = false;
let cloneFirst = slide_wrap.firstElementChild.cloneNode(true);
let cloneLast = slide_wrap.lastElementChild.cloneNode(true);
slide_wrap.append(cloneFirst);
slide_wrap.prepend(cloneLast);

window.onload = () => {
  index = 1;
  width = 100 / slide_wrap.childElementCount;
  slide_wrap.style.transform = `translateX(-${index * width}%)`;
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
};

window.onscroll = () => {
  let currentY = window.scrollY;
  let direction = currentY - prevY;
  if (window.scrollY > 0) {
    if (direction < 0) header.classList.add("show");
    else {
      header.classList.remove("show");
      depth2.classList.remove("show");
      document.querySelector(".h_found").classList.remove("convert");
    }
    let box_middle =
      document.querySelector(".box").offsetTop -
      document.querySelector(".box").offsetHeight;
    if (box_middle < window.scrollY) {
      document.querySelector(".sec4_num").innerHTML = `284,438`;
    }
  } else header.classList.add("show");
  prevY = currentY;
};

window.onresize = () => {
  width = 100 / slide_wrap.childElementCount;
  slide_wrap.style.transform = `translateX(-${width * index}%)`;
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
    document.querySelector(".h_found").classList.add("convert");
  });
}

header.addEventListener("mouseleave", () => {
  depth2.classList.remove("show");
  document.querySelector(".h_found").classList.remove("convert");
});

slide_wrap.addEventListener("mousedown", ({ clientX }) => {
  if (trigger) {
    handleDown(clientX);
  }
});

slide_wrap.addEventListener("mousemove", ({ clientX }) => {
  if (trigger && mouseDown) {
    handleMove(clientX);
  }
});

slide_wrap.addEventListener("mouseup", ({ clientX }) => {
  if (trigger) {
    handleUp(clientX);
  }
});

slide_wrap.addEventListener("touchstart", ({ changedTouches }) => {
  if (trigger) {
    handleDown(changedTouches[0].clientX);
  }
});

slide_wrap.addEventListener("touchmove", ({ changedTouches }) => {
  if (trigger && mouseDown) {
    handleMove(changedTouches[0].clientX);
  }
});

slide_wrap.addEventListener("touchend", ({ changedTouches }) => {
  if (trigger) {
    handleUp(changedTouches[0].clientX);
  }
});

slide_wrap.addEventListener("transitionend", () => {
  let max = slide_wrap.childElementCount - 2;
  if (index > max || index < 1) {
    if (index > max) {
      index = 1;
    } else if (index < 1) {
      index = max;
    }
    slide_wrap.style.transition = "";
    slide_wrap.style.transform = `translateX(-${width * index}%)`;
    setTimeout(() => {
      slide_wrap.style.transition = `transform .3s ease`;
    });
  }
  trigger = true;
  cnt = 0;
});

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

function handleDown(x) {
  cnt = 0;
  mouseDown = true;
  prevX = x;
}

function handleMove(x) {
  let movePoint =
    (slide_wrap.clientWidth / slide_wrap.childElementCount) * index;
  moveX = prevX - x;
  slide_wrap.style.transition = ``;
  slide_wrap.style.transform = `translateX(-${movePoint + moveX}px)`;
}

function handleUp(x) {
  let direction = prevX - x;
  mouseDown = false;
  if (direction > 100 || direction < -100) {
    move_slide(direction);
    slide_wrap.style.transition = `transform .3s ease`;
    trigger = false;
  }
}

function move_slide(direction) {
  if (direction > 100) {
    index++;
  } else if (direction < -100) {
    index--;
  }
  slide_wrap.style.transform = `translateX(-${width * index}%)`;
}

function autoPlay() {
  cnt++;
  if (cnt > 3) {
    cnt = 0;
    index++;
    move_slide(0);
  }
}

function clearActive(elements) {
  for (let element of elements) {
    element.classList.remove("active");
  }
}

document.querySelector(".go_top").addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});
