let menus = document.querySelectorAll(".h_menu a");
let depth2 = document.querySelector(".depth2");
let header = document.querySelector("header");
let side_menus = document.querySelectorAll(`.menu a:not(.brand)`);
let slide_wrap = document.querySelector(".slide_wrap");
let sec1_current = document.querySelector(".current");
let prevY;
let prevPoint = 0;
let prevX = 0;
let cnt = 0;
let width, direction, index, current, interval;
let trigger = false;
let trigger2 = false;
let cloneFirst = slide_wrap.firstElementChild.cloneNode(true);
let cloneLast = slide_wrap.lastElementChild.cloneNode(true);
slide_wrap.append(cloneFirst);
slide_wrap.prepend(cloneLast);

window.onload = () => {
  index = 1;
  current = 1;
  sec1_current.innerHTML = `0${current}`;
  width = document.querySelector(".slide_wrap li").clientWidth;
  slide_wrap.style.transition = ``;
  slide_wrap.style.transform = `translateX(-${index * width}px)`;
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
  width = document.querySelector(".slide_wrap li").clientWidth;
  slide_wrap.style.transform = `translateX(-${width * index}px)`;
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
  isEnd = false;
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
  } else if (index < 1) {
    index = slide_wrap.childElementCount - 2;
  }
  prevPoint = index * width;
  slide_wrap.style.transition = ``;
  slide_wrap.style.transform = `translateX(-${prevPoint}px)`;
  setTimeout(() => {
    slide_wrap.style.transition = `.2s ease`;
  });
  setTimeout(() => {
    trigger2 = false;
  }, 300);
});

document.body.addEventListener("mouseout", (e) => {
  move_slide(0);
  trigger = false;
});

document.querySelector(".sec1_prev").addEventListener("click", () => {
  if (trigger2 == false) {
    trigger2 = true;
    index--;
    current = current > 1 ? current - 1 : 2;
    clearInterval(interval);
    trans_slide();
  }
});

document.querySelector(".sec1_next").addEventListener("click", () => {
  if (trigger2 == false) {
    trigger2 = true;
    index++;
    current = current < 2 ? current + 1 : 1;
    clearInterval(interval);
    trans_slide();
  }
});

function move_slide(x) {
  if (trigger == true) {
    direction = prevX - x;
    if (direction > width * 0.3) {
      index++;
      current = current < 2 ? current + 1 : 1;
    } else if (direction < -(width * 0.3)) {
      index--;
      current = current > 1 ? current - 1 : 2;
    }
    trans_slide();
  }
}

function trans_slide() {
  prevPoint = width * index;
  sec1_current.innerHTML = `0${current}`;
  slide_wrap.style.transition = `.2s ease`;
  slide_wrap.style.transform = `translateX(-${prevPoint}px)`;
  setTimeout(() => {
    cnt = 0;
    interval = setInterval(() => {
      autoPlay();
    }, 1000);
  });
}

function autoPlay() {
  cnt++;
  if (cnt > 3) {
    cnt = 0;
    index++;
    current = current < 2 ? current + 1 : 1;
  }
  prevPoint = width * index;
  sec1_current.innerHTML = `0${current}`;
  slide_wrap.style.transition = `.2s ease`;
  slide_wrap.style.transform = `translateX(-${prevPoint}px)`;
}

document.querySelector(".go_top").addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});
