const randomText = [
  `Now that you've got a firm grasp on all the main keys of your keyboard, you will put them all together for some short paragraphs.`,
  `Always do your best to keep your eyes on the screen, using your fingers' memory to know where to move your fingers!`,
  `The more you practice, the more you will get used to the feel of the keyboard and`,
  `Now that you are a master of the keyboard, we are going to remove the training wheels. These screens feature long words and tough punctuation.

Have fun!`,
];

// Select elements
const textDisplay = document.getElementById("textDisplay");
const outputField = document.getElementById("outputText");
const speedText = document.getElementById("speedText");
const errorText = document.getElementById("errorText");
const accuracyText = document.getElementById("accuracyText");
const totalWordsText = document.getElementById("totalWordsText");
const resetButton = document.getElementById("resetButton");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

let startTime;
let errorCount = 0;

// Function to set new random text
function setNewText() {
  const randomIndex = Math.floor(Math.random() * randomText.length);
  textDisplay.innerText = randomText[randomIndex];
  outputField.value = "";
  startTime = null;
  errorCount = 0;

  // Reset stats
  speedText.innerText = "Speed: 0 words/minute";
  errorText.innerText = "Errors: 0";
  accuracyText.innerText = "Accuracy: 0%";
  totalWordsText.innerText = `Total words: ${
    textDisplay.innerText.split(" ").length
  }`;
}

// Function to check user input
function checkText() {
  const originalText = textDisplay.innerText;
  const userInput = outputField.value;

  if (!startTime) {
    startTime = new Date(); // Start timer
  }

  let highlightedText = "";
  errorCount = 0;

  for (let i = 0; i < originalText.length; i++) {
    if (i < userInput.length) {
      if (userInput[i] === originalText[i]) {
        highlightedText += `<span style="color: green;">${originalText[i]}</span>`;
      } else {
        highlightedText += `<span style="color: red;">${originalText[i]}</span>`;
        errorCount++;
      }
    } else {
      highlightedText += `<span style="color: gray;">${originalText[i]}</span>`;
    }
  }

  // Update display with colored text
  textDisplay.innerHTML = highlightedText;

  // Calculate accuracy
  let accuracy =
    ((originalText.length - errorCount) / originalText.length) * 100;
  accuracy = accuracy < 0 ? 0 : accuracy.toFixed(2);

  // Calculate speed (words per minute)
  let elapsedTime = (new Date() - startTime) / 60000;
  let wordsPerMinute =
    elapsedTime > 0
      ? (userInput.split(" ").length / elapsedTime).toFixed(2)
      : 0;

  // Update stats
  speedText.innerText = `Speed: ${wordsPerMinute} words/minute`;
  errorText.innerText = `Errors: ${errorCount}`;
  accuracyText.innerText = `Accuracy: ${accuracy}%`;

  // Check if text is correct
  if (userInput === originalText) {
    alert("Correct! Well done.");
    setNewText();
  }
}

// Function to reset everything
resetButton.addEventListener("click", setNewText);

// Function to clear textarea
clearButton.addEventListener("click", () => {
  outputField.value = "";
});

// Function to copy text
copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(outputField.value)
    .then(() => alert("Text copied!"))
    .catch((err) => console.error("Failed to copy text: ", err));
});

// Listen for user input
outputField.addEventListener("input", checkText);

// Load initial text
setNewText();
