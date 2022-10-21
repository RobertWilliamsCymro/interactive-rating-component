"use strict";
const buttonOne = document.getElementById("rating-one");
const buttonTwo = document.getElementById("rating-two");
const buttonThree = document.getElementById("rating-three");
const buttonFour = document.getElementById("rating-four");
const buttonFive = document.getElementById("rating-five");
const submitButton = document.getElementById("submit-rating");
const ratingButtons = document.getElementsByName("ratings");
let ratingSelectedText = "";
function setButtonState(buttonSelected) {
    clearPreviousRating(ratingButtons);
    if (!buttonSelected.classList.contains("active")) {
        buttonSelected.classList.value = "";
        buttonSelected.classList.toggle("active");
        ratingSelectedText = `You selected ${buttonSelected.textContent} out of 5`;
        submitButton.disabled = false;
    }
    else {
        buttonSelected.classList.value = "";
        buttonSelected.classList.toggle("rating-not-selected");
    }
}
function clearPreviousRating(buttonList) {
    buttonList.forEach((btnNotSelected) => {
        btnNotSelected.classList.value = "rating-not-selected";
    });
}
function submitRating() {
    localStorage.setItem("ratingSelected", ratingSelectedText);
    window.location.href = "thank-you.html";
}
if (document.URL.includes("index.html")) {
    buttonOne.addEventListener("click", () => setButtonState(buttonOne));
    buttonTwo.addEventListener("click", () => setButtonState(buttonTwo));
    buttonThree.addEventListener("click", () => setButtonState(buttonThree));
    buttonFour.addEventListener("click", () => setButtonState(buttonFour));
    buttonFive.addEventListener("click", () => setButtonState(buttonFive));
    submitButton.addEventListener("click", () => submitRating());
}
if (document.URL.includes("thank-you.html"))
    getRating();
function getRating() {
    const getRating = localStorage.getItem("ratingSelected");
    const thankYouMsg = document.getElementById("selected");
    thankYouMsg.textContent = getRating;
}
//# sourceMappingURL=index.js.map