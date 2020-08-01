const loadingSec = document.getElementsByClassName("loading")[0];
const resultsSec = document.getElementsByClassName("results")[0];

function loadDummy() {
  setTimeout(() => {
    loadingSec.classList.toggle("section__show");
    resultsSec.classList.toggle("section__show");
  }, 2000);
}

window.onload = loadDummy;