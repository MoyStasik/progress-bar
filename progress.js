import { ProgressBar } from "./src/progressBar.js";

const customProgressBar = new ProgressBar(10, true, false); 
customProgressBar.renderTo(document.getElementById("root"));