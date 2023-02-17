const menus = document.querySelectorAll(".h_menu a"),
  depth2 = document.querySelector(".depth2"),
  header = document.querySelector("header"),
  side_menus = document.querySelectorAll(`.menu a:not(.brand)`),
  slide_wrap = document.querySelector(".slide_wrap"),
  sec1_current = document.querySelector(".current");
let prevY;
let prevX = 0;
let cnt = 0;
let width, direction, index, current, interval;
let trigger = true;
let mouseDown = false;
let cloneFirst = slide_wrap.firstElementChild.cloneNode(true);
let cloneLast = slide_wrap.lastElementChild.cloneNode(true);

window.onload = () => {
  slide_wrap.append(cloneFirst);
  slide_wrap.prepend(cloneLast);
  slide_wrap.style.width = `${slide_wrap.childElementCount * 100}%`;
  index = 1;
  current = 1;
  sec1_current.innerHTML = `0${current}`;
  width = 100 / slide_wrap.childElementCount;
  slide_wrap.style.transition = ``;
  slide_wrap.style.transform = `translateX(-${index * width}%)`;
  setTimeout(() => {
    header.classList.add("show");
    for (let slide of document.querySelectorAll(".slide_wrap a")) {
      slide.addEventListener("click", (e) => {
        e.preventDefault();
      });
    }
    slide_wrap.style.transition = `.2s ease`;
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
  } else header.classList.add("show");
  prevY = currentY;
};

window.onresize = () => {
  width = 100 / slide_wrap.childElementCount;
  slide_wrap.style.transform = `translateX(-${width * index}%)`;
};

document.body.addEventListener("mousemove", function (e) {
  let cursor = document.querySelector(".cursor");
  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
});

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
    slide_wrap.style.transition = ``;
    slide_wrap.style.transform = `translateX(-${index * width}%)`;
    setTimeout(() => {
      slide_wrap.style.transition = `.3s ease`;
    });
  }
  trigger = true;
  cnt = 0;
});

document.querySelector(".sec1_prev").addEventListener("click", () => {
  if (trigger) {
    trigger = false;
    cnt = 0;
    index--;
    current = current > 1 ? current - 1 : 2;
    trans_slide();
  }
});

document.querySelector(".sec1_next").addEventListener("click", () => {
  if (trigger) {
    trigger = false;
    cnt = 0;
    index++;
    current = current < 2 ? current + 1 : 1;
    trans_slide();
  }
});

document.querySelector(".go_top").addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

function handleDown(x) {
  cnt = 0;
  prevX = x;
  mouseDown = true;
}

function handleMove(x) {
  let movePoint =
      (slide_wrap.clientWidth / slide_wrap.childElementCount) * index,
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
    current = current < 2 ? current + 1 : 1;
  } else if (direction < -100) {
    index--;
    current = current > 1 ? current - 1 : 2;
  }
  trans_slide();
}

function trans_slide() {
  sec1_current.innerHTML = `0${current}`;
  slide_wrap.style.transform = `translateX(-${index * width}%)`;
}

function autoPlay() {
  cnt++;
  if (cnt > 3) {
    cnt = 0;
    index++;
    current = current < 2 ? current + 1 : 1;
  }
  move_slide(0);
}
