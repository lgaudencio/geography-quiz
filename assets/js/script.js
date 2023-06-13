// JAVASCRIPT FOR THE MODAL 

// Declare variable for the modal
let modal = document.querySelector("#modal");

// Declare variable that will open the modal
let openButton = document.querySelector("#openModal"); 

// Declare variable for the <span> element which will close the modal
let closeButton = document.getElementsByClassName("close-modal")[0];

// Declare variable for the 'Ok' button which will also close the modal
let okButton = document.getElementsByClassName("footer-button")[0]; 

// The modal will open when the 'Before Beginning, Click me for Rules and Instructions' button is clicked
openButton.onclick = () => modal.style.display = "block";

// When <span> (x) is clicked, the modal will close
closeButton.onclick = () => modal.style.display = "none";

// When the 'Ok' button is clicked, the modal will also close
okButton.onclick = () => modal.style.display = "none"; 


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
}