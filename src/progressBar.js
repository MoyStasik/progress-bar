export class ProgressBar {
    #value;
    #isAnimated;
    #isHidden;
    constructor(value = 0, isAnimated = false, isHidden = false) {
        console.log("Я тут")
        this.#value = value;
        this.#isAnimated = isAnimated;
        this.#isHidden = isHidden;
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
        validateInput(this.valueInput);
    }

    renderTo(element) {
        console.log(this.progressBlock instanceof HTMLElement, element)
        element.insertAdjacentElement("beforeend", this.progressBlock);
    }

    setAnimatiton() {
        console.log("it's me", this.#isAnimated)
        if (this.#isAnimated) {
            return;
        }

        this.#isAnimated = true;
        this.progressCircle.classList.add("animate");
    }

    deleteAnimation() {
        console.log("it's me", !this.#isAnimated)
        if (!this.#isAnimated) {
            return;
        }

        this.#isAnimated = false;
        this.progressCircle.classList.remove("animate");
    }

    show() {
        if (!this.#isHidden) {
            return;
        }

        this.#isHidden = false;
        this.progressCircle.style.opacity = "1";
    }

    hide() {
        if (this.#isHidden) {
            return;
        }

        this.#isHidden = true;
        this.progressCircle.style.opacity = "0";
    }

}

function validateInput(valueInput) {
    valueInput.addEventListener("keypress", (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();  // Что за незаконный вторженец? Не цифра!
        }
        else if (valueInput.value >= 10) {
            valueInput.value = 100;
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
        
    });
}

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



function createDiv(className, id) {
    const divElement = document.createElement("div");
    divElement.className = className;
    if (id) {
        divElement.id = id;
    }
    return divElement;
}

function createApiForProgressBar() {
    const progressTools = createDiv("progress-tools");
    createSettingsSections(progressTools);

    return progressTools;
}

function createSettingsSections(settingsBlock) {
    const progressValueBlock = createDiv("progress-value");
    const progressAnimationBlock = createDiv("progress-animate");
    const progressHideBlock = createDiv("progress-hide");
    progressValueBlock.appendChild(createInputElementWithValue("text", "progress-value-input", "progress-value__input", 0));
    progressValueBlock.appendChild(createSpanElement("progress-value__span", "Value"));

    createSettingBlockWithLabel(progressAnimationBlock, progressHideBlock);

    settingsBlock.insertAdjacentElement("beforeend", progressValueBlock);
    settingsBlock.insertAdjacentElement("beforeend", progressAnimationBlock);
    settingsBlock.insertAdjacentElement("beforeend", progressHideBlock);
}

function createInputElementWithValue(type, id, className, value) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.className = className;
    input.value = value;

    return input;
}

function createSettingBlockWithLabel(progressAnimationBlock, progressHideBlock) {
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

function createInputElementWithoutValue(type, id, name, className) {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.className = className;
    
    return input;
}

function createSpanElement(className, text) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;

    return span;
}
