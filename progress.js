import { ProgressBar } from "./src/progressBar.js";

const customProgressBar = new ProgressBar(10, true, true); 
customProgressBar.renderTo(document.getElementById("root"));