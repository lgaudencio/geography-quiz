// JAVASCRIPT FOR THE QUIZ

/**
 * Inspiration for this quiz was from a YouTube video which can be found below:
 * https://youtube.com/watch?v=PBcqGxrr9g8&feature=share 
 * The name of this YouTube creator is GreatStack
 * 
 * Changes were made from the above tutorial to incorporate new features 
 * to the project and to be more user friendly.
 */

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

/**
 * This async function is used to call the questions from the relevant 
 * JSON file depending on the difficulty mode selected. 
 * The idea to use an async function can be found on the link below:
 * https://www.sitepoint.com/javascript-async-await/
 */
for (let btn of difficulty){
    btn.addEventListener("click", async function() {
      let response = await fetch(`${btn.value}.json`);
      const json = await response.json();
      questions = json.questions;
      /**
       * Difficulty modes will disappear when one is clicked and the quiz will load on the same page.
       * This is a new added feature as it was easier than using local storage.
       */
      difficultyLvl.style.display = "none";
      quizContainer.style.display = "block";
      startQuiz();
    });
}

/**
 * This function is responsible for starting the quiz, whether a new 
 * quiz or if the user chooses to restart a quiz that finished 
 */
function startQuiz() {
    currentQuestionNumber = 0;
    score = 0;
    //Feature of incorrect answers given was added 
    incorrect = 0;
    shuffledQuestions = 0;
    //Feedback will only become visable at the end of the quiz
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
  
    //A for loop was added instead of a for each loop to make readability easier
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

/**
 * This function is responsible for resetting the quiz container
 * for the next question once the user answers the current question
 * and clicks the 'Next' button
 */
function reset() {
  homeButton.style.display = "none";
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

/**
 * This function is responsible for three things, the first being that 
 * it adds the correct class to the buttons when the user picks their 
 * answer, it will keep count of the correct and incorrect answers and 
 * it will block the buttons from being pressed once the user has made 
 * their selection 
 */
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
  
  //A for loop was added instead of a for each loop to make readability easier
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
  
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  
    button.disabled = true;
  
    };
  
    nextButton.style.display = "block";
  
};

/** 
 * This function is responsible to read the score of the user at the end
 * of the quiz, based on the score, a feedback message will be returned
 */
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

/**
 * This function is responsible in displaying the feedback message, 
 * which is generated by the scoreMessage function
 */
function resultFeedback() {
  document.querySelector("#feedback").hidden = false;
  feedbackSection.innerText = `${scoreMessage()}`
};

/**
 * This function is reponsible for displaying the total score 
 * (correct and incorrect answers), feedback depending on the 
 * end result, a 'Restart' button and a 'Home' button
 */
function displayScore() {
  reset();
  displayQuestion.innerText = `Score: ${score} Correct & ${incorrect} Wrong`;
  resultFeedback(); 
  nextButton.innerText = "Restart";
  homeButton.style.display = "block";
  nextButton.style.display = "block";
};
  
/**
 * This function is reponsible for handling the question when 
 * the user clicks the 'Next' button
 */
function nextButtonControl() {
  currentQuestionNumber++;
  if (currentQuestionNumber < questions.length) {
    presentQuestion()
  } else {
    displayScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQuestionNumber < questions.length) {
    nextButtonControl();
  } else {
    startQuiz();
  }
});
