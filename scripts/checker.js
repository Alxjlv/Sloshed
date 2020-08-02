const loadingSec = document.getElementsByClassName("loading")[0];
const resultsSec = document.getElementsByClassName("results")[0];

function loadDummy() {
  setTimeout(() => {
    loadingSec.classList.toggle("section__show");
    resultsSec.classList.toggle("section__show");
  }, 500);
}

/**
 * The user must pass a series of checks to get instant access to the search results.
 * If any of the gates are not passed, the user is redirected to the reaction test.
 */
function responsibilityCheck() {
  startGyro();

  // if there is no gyroscope, instantly redirect
  if (!errorState()) {
    window.location.href = "reaction-test.html";
  }

  // after 5 seconds, show results only if gyro test passed
  setTimeout(() => {
    let userState = stopGyro();
    if (userState) {
      console.log("User is sloshed");
      // redirect to react test
      window.location.href = "reaction-test.html";
    } else {
      console.log("User is all goods");
      loadingSec.classList.toggle("section__show");
      resultsSec.classList.toggle("section__show");
    }
  }, 5000)
}

window.onload = responsibilityCheck;