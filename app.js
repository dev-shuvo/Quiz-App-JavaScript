const questions = [
  {
    question: "Who is the founder of Apple?",
    answers: [
      { text: "Steve Jobs", correct: true },
      { text: "Bill Gates", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Larry Page", correct: false },
    ],
  },
  {
    question: "What is (2 + 2) * 4?",
    answers: [
      { text: "32", correct: false },
      { text: "16", correct: true },
      { text: "24", correct: false },
      { text: "36", correct: false },
    ],
  },
  {
    question: "When the World War II started?",
    answers: [
      { text: "January 4, 1942", correct: false },
      { text: "December 16, 1939", correct: false },
      { text: "June 3, 1937", correct: false },
      { text: "September 1, 1939", correct: true },
    ],
  },
  {
    question: "How many continents in the world?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "fw-bold",
      "text-start",
      "border",
      "border-dark",
      "mb-3",
      "text-capitalize"
    );
    button.innerHTML = answer.text;
    answerButtons.appendChild(button);
    if (answer.correct == true) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct == "true";

  if (isCorrect) {
    selectedButton.classList.add("btn-success");
    score++;
  } else {
    selectedButton.classList.add("btn-danger");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add("btn-success");
    } else {
      button.disabled = true;
    }
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
window.onload = startQuiz();
