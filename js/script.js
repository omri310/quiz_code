// define quiz settings
const quizSettings = {
  duration: 85,
  penalty: 20,
  questions: [
    {
      Text: "What is the correct syntax for referring to an external script called 'script.js'?",
      choices: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>,", "<script file='script.js'>"],
      answer: "<script src='script.js'>"
    },
    {
      Text: "What does CSS stand for?",
      choices: ["Creative Style Style Sheet", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      Text: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>", "<javascript>", "scripting>", "<js>"],
      answer: "<script>"
    },
    {
      Text: "What is the correct syntax for creating a new array in JavaScript?",
      choices: ["var myArray = [];", "var myArray = {};", "var myArray = array();"],
      answer: "var myArray = [];"
    },
    {
      Text: "what operator is used to assign a value to a variable?",
      choices: ["=", "*", "+", "-"],
      answer: "="
    }
  ]
};

// defining variables for HTML 
const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const choicesContainer = document.getElementById("choices-container");
const feedbackEl = document.getElementById("feedback-container");
const initialsInput = document.getElementById("initials-input");
const submitcontainer = document.getElementById("submit-container");
const submitButton = document.getElementById("submitButton");
const scoreEl = document.getElementById("score-container");


// define variables for quiz state
let timeleft;
let currentQuestionIndex;
let score;
let userScore;
let timerInterval;

// add click event listener to start button
startButton.addEventListener("click", startQuiz);

// define funtion to start quiz
function startQuiz() {
  currentQuestionIndex = 0;
  timeleft = quizSettings.duration;
  score = 0;

  // hide start button and show quiz container
  startButton.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  // start the timer
  timerInterval = setInterval(() => {
    timeleft--;
    if (timeleft <= 0) {
      endQuiz();
      clearInterval(timerInterval);
    }
  }, 1000);

  // display first question
  displayQuestion();
}

// define function to display a question
function displayQuestion() {

  // get current question from quiz settings
  const currentQuestion = quizSettings.questions[currentQuestionIndex];

  // update question text, answer choices in HTML
  questionText.textContent = currentQuestion.Text;
  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach(choice => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent= choice;
    // add event listener not working
    choiceButton.addEventListener("click", (e) => {
    checkAnswer(e.target.textContent);
    });
    choicesContainer.appendChild(choiceButton);
  });
}

// define function to check user's answer
function checkAnswer(answer) {
  console.log(answer);
  if (answer === quizData[currentQuestionIndex].correctAnswer) {
console.log("correct");
    // answer is correct
    userScore += 15;
    feedbackEl.textContent = "Correct";
  } else {
console.log("wrong");
    //answer is incorrect
    timeleft -= 15;
    feedbackEl.textContent = "Wrong";
  }

  // move to next question/ end quiz
  currentQuestionIndex++;
  console.log(currentQuestionIndex);
  if (currentQuestionIndex === quizData.length) {
    endQuiz();
  } else {
    displayQuestion();
  }
}

// define function to end quiz
function endQuiz() {
  // stop timer
  clearInterval(timerInterval);
  // show final score/ hide quiz content
  quizContainer.classList.add("hidden");
  scoreEl.textContent = userScore;
  scoreEl.classList.remove("hidden");
}

// define event listener for when user submits score
submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  //get user's initials, score
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({
      initials: initials,
      score: userScore,
    });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // redirect high score page
    window.location.href = "highscore.html";
  }
})

// start the quiz when user clicks start button
function checkAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Wrong!";
    timeleft -= quizSettings.penalty;
    if (timeleft < 0) {
      timeleft = 0;
    }}}