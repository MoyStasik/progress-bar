/**
 * Class create progress bar block and provide api to interact with it
 */
export class ProgressBar {
    #value;
    #isAnimated;
    #isHidden;
    /**
     * Constructor initialize block with progress bar
     * @constructor
     * @param {number} value - progress bar value from 0 to 100
     * @param {boolean} isAnimated - progress bar spinning or not
     * @param {boolean} isHidden - progress bar hidden or not
     */
    constructor(value = 0, isAnimated = false, isHidden = false) {
        if (Number.isNaN(value)) {
            throw new Error(`invalid type of ${value} expected number`);
        }
        if (!(Number(value) >= 0 && Number(value) <= 100)) {
            throw new Error(`invalid value of ${value} expected value >= 0 and value <= 100`);
        }

        this.#value = Number(value);

        this.progressBlock = createDiv("progress-block");

        const progressCircleContainer = createDiv("progress-icon");
        this.progressCircle = createDiv("progress-circle", "progress-bar");
        progressCircleContainer.appendChild(this.progressCircle);
        this.progressBlock.appendChild(progressCircleContainer);
        this.progressBlock.appendChild(createApiForProgressBar());

        this.togglehideButton = this.progressBlock.querySelector("#toggle-btn-hide");
        const toggleHideInput = this.progressBlock.querySelector("#hide-toggle");
        this.togglehideButton.addEventListener("click", (event) => toggleListeners(event, toggleHideInput, this));

        this.toggleAnimationButton = this.progressBlock.querySelector("#toggle-btn-animation");
        const toggleAnimationInput = this.progressBlock.querySelector("#animation-toggle");
        this.toggleAnimationButton.addEventListener("click", (event) => toggleListeners(event, toggleAnimationInput, this));
    
        const upperCircle = createDiv("upper-circle");
        progressCircleContainer.appendChild(upperCircle);

        this.valueInput = this.progressBlock.querySelector("#progress-value-input");
        validateInput(this.valueInput, this);
        setFirstState(this.#value, isAnimated, isHidden, this);
    }

    /**
     * render progress bar into element
     * @param {HTMLElement} element - elemnt for rendering block into
     */
    renderTo(element) {
        console.log(this.progressBlock instanceof HTMLElement, element)
        element.insertAdjacentElement("beforeend", this.progressBlock);
    }

    /**
     * spin progress bar
     */
    setAnimatiton() {
        console.log("it's me", this.#isAnimated)
        if (this.#isAnimated) {
            return;
        }

        this.#isAnimated = true;
        this.progressCircle.classList.add("animate");
        this.progressCircle.style.animationPlayState = "running";
    }

    /**
     * stop spining progress bar
     */
    deleteAnimation() {
        if (!this.#isAnimated) {
            return;
        }

        this.#isAnimated = false;
        this.progressCircle.style.animationPlayState = "paused";
    }

    /**
     * show progress bar 
     */
    show() {
        if (!this.#isHidden) {
            return;
        }

        this.#isHidden = false;
        this.progressCircle.style.opacity = "1";
    }

    /**
     * hide progress bar
     */
    hide() {
        if (this.#isHidden) {
            return;
        }

        this.#isHidden = true;
        this.progressCircle.style.opacity = "0";
    }

    /**
     * set value for progress bar
     * @param {number} value - input value
     */
    setValue(value) {
        this.#value = value;
        this.progressCircle.style.background = `conic-gradient(var(--progress-active-color) 0deg, var(--progress-active-color) ${3.6 * value}deg, var(--progress-none-color) ${3.6 * value}deg, var(--progress-none-color) 360deg)`;
    }

    /**
     * return progress bar value
     * @returns {number} - progress bar value
     */
    getValue() {
        return this.#value;
    }
}

/**
 * set first state for progress bar
 * @param {number} value - progress bar value
 * @param {boolean} isAnimated - spin progress bar or not
 * @param {boolean} isHidden - hide progress bar or not
 * @param {ProgressBar} progoressBlockInstance - progress bar block object
 */
function setFirstState(value, isAnimated, isHidden, progoressBlockInstance) {
    progoressBlockInstance.setValue(value);
    progoressBlockInstance.valueInput.value = value;
    if (isAnimated == true ) {
        progoressBlockInstance.setAnimatiton();
        progoressBlockInstance.progressBlock.querySelector("#animation-toggle").checked = true;
        progoressBlockInstance.toggleAnimationButton.classList.add("active");
    } 
    if (isHidden == true) {
        progoressBlockInstance.hide();
        progoressBlockInstance.progressBlock.querySelector("#hide-toggle").checked = true;
        progoressBlockInstance.togglehideButton.classList.add("active");
    } 
}

/**
 * validate input value
 * @param {HTMLInputElement} valueInput - input element for progress bar value
 * @param {*} progoressBlockInstance - progress bar block object
 */
function validateInput(valueInput, progoressBlockInstance) {
    valueInput.addEventListener("keypress", (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();  // Что за незаконный вторженец? Не цифра!
        }
        else if (valueInput.value == 100 ){
            event.preventDefault();
        }
        else if (valueInput.value == 10 && event.key != 0) {
            event.preventDefault();
        }
        else if (valueInput.value > 10){
            event.preventDefault();
        }
    });

    valueInput.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && valueInput.value < 10) {
            valueInput.value = 0;
            event.preventDefault();
        }
    });

    valueInput.addEventListener("keyup", (event) => {
        if (valueInput.value[0] == 0 && valueInput.value.length > 1) {
            valueInput.value = valueInput.value.slice(1);
        }

        progoressBlockInstance.setValue(Number(valueInput.value))
    });
}

/**
 * Listeners for toggles elements
 * @param {MouseEvent} event - click on toggle 
 * @param {HTMLElement} toggle - clicked element 
 * @param {*} circleInstance - progress bar block object
 */
function toggleListeners(event, toggle, circleInstance) {
    console.log(event.currentTarget.id);
    if (!toggle.checked) {
        event.currentTarget.classList.add("active");
        (event.currentTarget.id === "toggle-btn-hide") ? circleInstance.hide() : circleInstance.setAnimatiton(); 
        return;
    }
    event.currentTarget.classList.remove("active");
    (event.currentTarget.id === "toggle-btn-hide") ? circleInstance.show() : circleInstance.deleteAnimation(); 
}

/**
 * create new element div
 * @param {string} className - class name for new element 
 * @param {string} id - id for new element
 * @returns {HTMLDivElement}
 */
function createDiv(className, id) {
    const divElement = document.createElement("div");
    divElement.className = className;
    if (id) {
        divElement.id = id;
    }
    return divElement;
}

/**
 * Create api block for progress bar
 * @returns {HTMLDivElement}
 */
function createApiForProgressBar() {
    const progressTools = createDiv("progress-tools");
    createSettingsSections(progressTools);

    return progressTools;
}

/**
 * create api components for progress bar block
 * @param {HTMLDivElement} settingsBlock 
 */
function createSettingsSections(settingsBlock) {
    const progressValueBlock = createDiv("progress-value");
    const progressAnimationBlock = createDiv("progress-animate");
    const progressHideBlock = createDiv("progress-hide");
    progressValueBlock.appendChild(createInputElementWithValue("text", "progress-value-input", "progress-value__input", 0));
    progressValueBlock.appendChild(createSpanElement("progress-value__span", "Value"));

    createSettingsBlockWithLabel(progressAnimationBlock, progressHideBlock);

    settingsBlock.insertAdjacentElement("beforeend", progressValueBlock);
    settingsBlock.insertAdjacentElement("beforeend", progressAnimationBlock);
    settingsBlock.insertAdjacentElement("beforeend", progressHideBlock);
}

/**
 * create input with value for progress bar
 * @param {string} type - input type
 * @param {string} id - input id
 * @param {string} className - input class name 
 * @param {number} value - input value
 * @returns {HTMLInputElement} 
 */
function createInputElementWithValue(type, id, className, value) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.className = className;
    input.value = value;

    return input;
}

/**
 * create settings block with label
 * @param {HTMLElement} progressAnimationBlock - block with animation toggle
 * @param {HTMLElement} progressHideBlock - block with toggle to hide progress bar
 */
function createSettingsBlockWithLabel(progressAnimationBlock, progressHideBlock) {
    const labelForAnimation = document.createElement("label");
    labelForAnimation.className = "Toogle";
    labelForAnimation.setAttribute("for", "animation-toggle");
    
    const inputForAnimation = createInputElementWithoutValue("checkbox", "animation-toggle", "animation-toggle", "Toggle__input");
    inputForAnimation.classList.add("hidden");
    const btnAnimationDiv = createDiv("toggle-checkbox", "toggle-btn-animation");
    labelForAnimation.append(inputForAnimation, btnAnimationDiv);
    
    const animationSpan = createSpanElement("progress-animate__span", "Animate"); 

    progressAnimationBlock.append(labelForAnimation, animationSpan);

    const labelForHide = document.createElement("label");
    labelForHide.className = "Toogle";
    labelForHide.setAttribute("for", "hide-toggle");

    const inputForHide = createInputElementWithoutValue("checkbox", "hide-toggle", "hide-toggle", "Toggle__input");
    inputForHide.classList.add("hidden");
    const btnHideDiv = createDiv("toggle-checkbox", "toggle-btn-hide");
    labelForHide.append(inputForHide, btnHideDiv);

    const hideSpan = createSpanElement("progress-hide__span", "Hide"); 
    progressHideBlock.append(labelForHide, hideSpan);

}

/**
 * create input without default value
 * @param {string} type - input type
 * @param {string} id - input id
 * @param {string} name - input name
 * @param {string} className - class name input
 * @returns {HTMLInputElement}
 */
function createInputElementWithoutValue(type, id, name, className) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.className = className;
    
    return input;
}

/**
 * create span element
 * @param {string} className class name for new span element
 * @param {string} text - text for span 
 * @returns {HTMLSpanElement}
 */
function createSpanElement(className, text) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;

    return span;
}
