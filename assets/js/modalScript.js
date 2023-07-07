// JAVASCRIPT FOR THE MODAL 

/* The JavaScript code for the modal was based on the one 
    found on the W3Schools website and can be found at: 
    https://www.w3schools.com/howto/howto_css_modals.asp

    For best practice, ES6 was used by the use of 
    arrow functions.
*/

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
