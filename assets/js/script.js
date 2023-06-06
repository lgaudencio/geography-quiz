let modal = document.querySelector("#modal");

let openButton = document.querySelector("#openModal"); 

let closeButton = document.querySelector(".close-modal")[0];

let okButton = document.querySelector(".footer-button")[0]; 

openButton.onclick = () => modal.style.display = "block";

closeButton.onclick = () => modal.style.display = "none";

okButton.onclick = () => modal.style.display = "none"; 