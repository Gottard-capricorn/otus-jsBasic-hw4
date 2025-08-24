// ---------------- Поведение кнопки и вспомогательная функция -------------------

export function checkField() {
  const fieldValue = document.querySelector(".text-field").value;
  return fieldValue === "";
}


export function hideButton() {
  const buttonEl = document.querySelector(".Paragraph");
  buttonEl.hidden = true;
}

export function unhideButton() {
  const buttonEl = document.querySelector(".Paragraph");
  buttonEl.hidden = false;
}

export function buttonBehavior() {
  checkField() === true ? hideButton() : unhideButton();
}

// ---------------- Взаимодействие с кнопкой -------------------

export function addParagraph() {
  const inputValue = document.querySelector(".text-field").value;
  const newParagraph = document.createElement("li");
  newParagraph.innerText = inputValue; 
  const ParagraphsBox = document.querySelector("ul"); 
  ParagraphsBox.append(newParagraph);
  clearInputArea();
  buttonBehavior();
}

export function returnParagraphsObject() {
  const ParagraphsBox = document.querySelector("ul").querySelectorAll("li");
  return ParagraphsBox;
}

export function clearInputArea() {
  document.querySelector(".text-field").value = "";
}

export function removeParagraph() {
  const ParagraphsBox = returnParagraphsObject();
  const countParagraphs = ParagraphsBox.length;
  if (countParagraphs > 4) {
    ParagraphsBox[0].remove();
  }
}

// ---------------- Обработчики -------------------

export function addListenersCLickToButtonEl() {
  const buttonEl = document.querySelector(".Paragraph");
  buttonEl.addEventListener("click", addParagraph);
  buttonEl.addEventListener("click", removeParagraph);
}

export function addListenerKeyupToInputEl() {
  const inputEl = document.querySelector(".text-field");
  inputEl.addEventListener("keyup", (event) => {
    if (event.code !== "ControlLeft" && event.code !== "KeyV") {
      buttonBehavior();
    }
  });
}
