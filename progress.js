import { ProgressBar } from "./src/progressBar.js";

const customProgressBar = new ProgressBar(); 
// const customProgressBar = ProgressBar();
customProgressBar.renderTo(document.getElementById("root"));

// const animationToggle = document.getElementById("animation-toogle");
// const toggleButton = document.getElementById("toogle-btn-animation");

// const setElementVisibility = (element, up) => {
//     element.style.opacity = (up === true) ? 1 : 0;
// }

// const progressBar = document.getElementById("progress-bar");

// const handleClickToogle = (event, toggle) => {
//     console.log(event.currentTarget.id);
//     if (!toggle.checked) {
//         event.currentTarget.classList.add("active");
//         (event.currentTarget.id === "toggle-btn-hide") ? setElementVisibility(progressBar, false) : null; 
//         return;
//     }
//     event.currentTarget.classList.remove("active");
//     (event.currentTarget.id === "toggle-btn-hide") ? setElementVisibility(progressBar, true) : null; 
// }

// toggleButton.addEventListener("click", (event) => handleClickToogle(event, animationToggle));

// const toggleHide = document.getElementById("hide-toggle");
// const toggleBtnHide = document.getElementById("toggle-btn-hide");
// toggleBtnHide.addEventListener("click", (event) => handleClickToogle(event, toggleHide));


// const progressValueInput = document.getElementById("progress-value-input");
// progressValueInput.addEventListener("keypress", function(e){
//     if (!/[0-9]/.test(e.key)) {
//       e.preventDefault();  // Что за незаконный вторженец? Не цифра!
//     }
//     if (this.value[0] == 0) {
//         this.value = "";
//     }
//     console.log()
// });

// progressValueInput.addEventListener("keyup", function(e){
//     if (this.value >= 100) {
//         this.value = 100;
//     }
//     else if (!this.value) {
//         this.value = 0;
//     }
// })