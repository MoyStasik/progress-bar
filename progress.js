import { ProgressBar } from "./src/progressBar.js";

const customProgressBar = new ProgressBar(0, false, false); 
customProgressBar.renderTo(document.getElementById("root"));