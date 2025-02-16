
// import "./progressBar.css";

export class ProgressBar {
    #value;
    #isAnimated;
    #isHidden;
    constructor(value = 0, isAnimated = false, isHidden = false) {
        console.log("Я тут")
        this.value = value;
        this.isAnimated = isAnimated;
        this.isHidden = isHidden;
        this.progressBlock = createDiv("progress-block");

        const progressCircleContainer = createDiv("progress-icon");
        const progressCircle = createDiv("progress-circle", "progress-bar");
        progressCircleContainer.appendChild(progressCircle);
        this.progressBlock.appendChild(progressCircleContainer);
        this.progressBlock.appendChild(createApiForProgressBar());
    }

    renderTo(element) {
        console.log(this.progressBlock instanceof HTMLElement, element)
        element.insertAdjacentElement("beforeend", this.progressBlock);
    }

    setAnimatiton() {
        if (this.#isAnimated) {
            return;
        }

        this.isAnimated = true;

        // включать анимацию вращения
    }

    deleteAnimation() {
        if (!this.#isAnimated) {
            return;
        }

        this.isAnimated = false;

        // выключать анимацию вращения
    }

    show() {
        if (!this.#isHidden) {
            return;
        }

        this.#isHidden = false;

        // отобразить элемент круг
    }

    hide() {
        if (this.#isHidden) {
            return;
        }

        this.#isHidden = true;

        // скрыть элемент круг
    }
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