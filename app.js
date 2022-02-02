const API_KEY = "12afc91fe2cb84d88314b20a1b8a95dd";

const header = document.querySelector("header");

const rated_slider = document.querySelector(".rated");
const popular_slider = document.querySelector(".popular");
const upcoming_slider = document.querySelector(".upcoming");

let scrollPerClick = 0; // Intervalo de scroll
let scrollAmount = 0; // Posição atual do scroll

async function getData(param) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${param}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  return data.results
}

(async () => {
  const rated = await getData("top_rated");
  const popular = await getData("popular");
  const upcoming = await getData("upcoming");

  rated.map(item => {
    rated_slider.insertAdjacentHTML(
      "beforeend",
      `<img 
        src="https://image.tmdb.org/t/p/w200/${item.poster_path}" 
        alt="${item.original_title}" 
      />`
    );
  });

  popular.map(item => {
    popular_slider.insertAdjacentHTML(
      "beforeend",
      `<img 
        src="https://image.tmdb.org/t/p/w200/${item.poster_path}" 
        alt="${item.original_title}" 
      />`
    );
  });

  upcoming.map(item => {
    upcoming_slider.insertAdjacentHTML(
      "beforeend",
      `<img 
        src="https://image.tmdb.org/t/p/w200/${item.poster_path}" 
        alt="${item.original_title}" 
      />`
    );
  });

  const imageWidth = document.querySelector(".popular img").clientWidth;
  scrollPerClick = popular_slider.clientWidth - imageWidth;
})()

function scrollToLeft(param) {
  const slider = document.querySelector(`.${param}`);

  slider.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });

  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
}

function scrollToRight(param) {
  const slider = document.querySelector(`.${param}`);

  if (scrollAmount <= slider.scrollWidth - slider.clientWidth) {
    slider.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
}

window.addEventListener("resize", () => {
  const imageWidth = document.querySelector(".popular img").clientWidth;
  scrollPerClick = popular_slider.clientWidth - imageWidth;
})

window.addEventListener("scroll", () => {
  if (window.scrollY >= 100) {
    header.classList.add("toggled");
  } else {
    header.classList.remove("toggled");
  }
});