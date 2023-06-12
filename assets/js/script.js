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


const displayQuestion = document.querySelector("#display-question");

const answerButtons = document.querySelector("#answer-buttons");

const nextButton = document.querySelector("#next-button");