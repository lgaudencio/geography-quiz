// JAVASCRIPT FOR THE QUIZ

// Declare varibale so the questions on the JSON file will be displayed to the user
const displayQuestion = document.querySelector("#display-question");

// Declare variable so the answer options on the JSON file will be dispayed to the user
const answerButtons = document.querySelector("#answer-buttons");

// Declare variable so a 'Next' button will appear once the user makes their answer selection
const nextButton = document.querySelector("#next-button");

// Declare variable so feedback will be given to the user based on their results
const feedbackSection = document.querySelector("#feedback");

// Declare variable so a 'Home' button will be displayed to the user once the quiz is completed
const homeButton = document.querySelector("#home-button");

// Declare variable for the quiz container so that it is displayed to the user once they select their difficulty mode
const quizContainer = document.querySelector(".quiz-container");

//  Declare variable for the difficulty mode options to disappear once the user makes their selection
const difficultyLvl = document.querySelector(".difficulty-lvl");

// Declare variable so the correct JSON file difficulty mode questions are displayed the the user 
const difficulty = document.getElementsByClassName("difficulty"); 

// Declare variable for the current question number to be set to 0
let currentQuestionNumber = 0;

// Declare variable for correct answers to be set to 0
let score = 0;

// Declare variable for incorrect answers to be set to 0
let incorrect = 0;

// Declare variable for the shuffled questions to be set to 0
let shuffledQuestions = 0;

let questions = [];

for (let btn of difficulty){
    btn.addEventListener("click", async function() {
      let response = await fetch(`${btn.value}.json`);
      const json = await response.json();
      questions = json.questions;
      console.log(questions);
      diffLvl.style.display = "none";
      quizContainer.style.display = "block";
      startQuiz();
    });
}

function startQuiz() {
    currentQuestionNumber = 0;
    score = 0;
    incorrect = 0;
    shuffledQuestions = 0;
    document.querySelector("#feedback").hidden = true;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    nextButton.innerHTML = "Next";
    presentQuestion(); 
}

function presentQuestion() {
    reset();
    let displayedQuestion = questions[currentQuestionNumber];
    let questionNumber = currentQuestionNumber + 1;
    displayQuestion.innerHTML = `${questionNumber}&#41; ${displayedQuestion.question}&#63;`;
  
    for (let i = 0; i < displayedQuestion.answers.length; i++) {
      const answer = displayedQuestion.answers[i];
  
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("button");
      answerButtons.appendChild(button);
  
      if (answer.correct) {
        button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", pickAnswer);
    };
}

function reset() {
    homeButton.style.display = "none";
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function pickAnswer(event) {
    const selectedAnswer = event.target;
    const correctAnswer = selectedAnswer.dataset.correct === "true";
  
    if (correctAnswer) {
      selectedAnswer.classList.add("correct");
      score++;
    } else {
      selectedAnswer.classList.add("incorrect");
      incorrect++;
    }
  
    const buttons = answerButtons.children;
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
  
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
  
      button.disabled = true;
  
    };
  
    nextButton.style.display = "block";
  
  };

function scoreMessage() {
  if (score === 0) {
    return `Did you even try?`;
  } else if (score <= 5) {
    return `I think it's time to open an atlas!`;
  } else if (score <= 10) {
    return `Slowly but surley getting there...`;
  } else if (score <= 15) {
    return `More than half, impressive!`;
  } else if (score <= 19) {
    return `Almost there!`;
  } else if (score === 20) {
    return `100% - Perfect!`
  }
};

function resultFeedback() {
  document.querySelector("#feedback").hidden = false;
  feedbackSection.innerText = `${scoreMessage()}`
};

function displayScore() {
  reset();
  displayQuestion.innerText = `Score: ${score} Correct & ${incorrect} Wrong`;
  nextButton.innerText = "Restart";
  homeButton.style.display = "block";
  nextButton.style.display = "block";
};
  
function nextButtonControl() {
  currentQuestionNumber++;
  if (currentQuestionNumber < questions.length) {
    presentQuestion()
  } else {
    displayScore();
  }
};
