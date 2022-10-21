// coding solution for unclicking a button below:
// https://stackoverflow.com/questions/70287049/javascript-onclick-how-to-undo-when-clicked-again

const buttonOne = document.getElementById("rating-one") as HTMLButtonElement;
const buttonTwo = document.getElementById("rating-two") as HTMLButtonElement;
const buttonThree = document.getElementById("rating-three") as HTMLButtonElement;
const buttonFour = document.getElementById("rating-four") as HTMLButtonElement;
const buttonFive = document.getElementById("rating-five") as HTMLButtonElement;
const submitButton = document.getElementById("submit-rating") as HTMLButtonElement;
const ratingButtons = document.getElementsByName("ratings") as NodeListOf<HTMLElement>;

let ratingSelectedText = "" as string;


function setButtonState(buttonSelected: HTMLButtonElement): void {
  clearPreviousRating(ratingButtons);
  if (!buttonSelected.classList.contains("active")) {
    buttonSelected.classList.value = "";
    buttonSelected.classList.toggle("active");
    ratingSelectedText = `You selected ${buttonSelected.textContent} out of 5`;
    submitButton.disabled = false;
  } else {
    buttonSelected.classList.value = "";
    buttonSelected.classList.toggle("rating-not-selected");
  }
}

function clearPreviousRating(buttonList: NodeListOf<HTMLElement>) {
  buttonList.forEach((btnNotSelected) => {
    btnNotSelected.classList.value = "rating-not-selected";
  });
}

function submitRating(): void {
  localStorage.setItem("ratingSelected", ratingSelectedText);
  window.location.href = "thank-you.html";
}

//using an if statement to avoid throwing a null exceptions when on thank-you.html

if (document.URL.includes("index.html")) {
  buttonOne.addEventListener("click", () => setButtonState(buttonOne));
  buttonTwo.addEventListener("click", () => setButtonState(buttonTwo));
  buttonThree.addEventListener("click", () => setButtonState(buttonThree));
  buttonFour.addEventListener("click", () => setButtonState(buttonFour));
  buttonFive.addEventListener("click", () => setButtonState(buttonFive));
  submitButton.addEventListener("click", () => submitRating());
}

if (document.URL.includes("thank-you.html")) getRating();

function getRating(): void {
  const getRating = localStorage.getItem("ratingSelected");
  const thankYouMsg = document.getElementById(
    "selected"
  ) as HTMLParagraphElement;
  thankYouMsg.textContent = getRating;
}
