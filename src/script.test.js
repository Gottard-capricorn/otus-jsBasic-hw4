import {
  checkField,
  hideButton,
  unhideButton,
  buttonBehavior,
  addParagraph,
  returnParagraphsObject,
  removeParagraph,
  addListenerKeyupToInputEl,
  addListenersCLickToButtonEl,
} from "./utils.js";

describe("Checking the behavior of the functions", () => {
  //подготовка
  const inputTag = document.createElement("input");
  inputTag.className = "text-field";
  inputTag.value = "";
  document.body.append(inputTag);
  const buttonTag = document.createElement("button");
  buttonTag.className = "Paragraph";
  buttonTag.innerText = "New Paragraph";
  document.body.append(buttonTag);
  const ulTag = document.createElement("ul");
  document.body.append(ulTag);
  const ulBox = document.querySelector("ul");

  //действия
  beforeEach(() => {
    document.querySelector(".text-field").value = "";
    document.querySelector(".Paragraph").hidden = false;
    ulBox.innerHTML = "";
    const liValues = ["First", "Second", "Third", "fourth"];
    liValues.forEach((liValue) => {
      const liElement = document.createElement("li");
      liElement.innerText = liValue;
      ulBox.append(liElement);
    });
  });

  //проверки
  it("there is a start page", () => {
    expect(document.querySelector(".text-field")).not.toBeNull();
    expect(document.querySelector(".Paragraph")).not.toBeNull();
    expect(document.querySelector("ul")).not.toBeNull();
    expect(document.querySelectorAll("li")).toHaveLength(4);
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
  });

  it("ulBox should contain 'First', 'Second', 'Third', and 'fourth'", () => {
    const expected = ["First", "Second", "Third", "fourth"];
    const received = [];
    ulBox.querySelectorAll("li").forEach((el) => {
      received.push(el.innerText);
    });
    expect(received).toEqual(expect.arrayContaining(expected));
  });

  it("ulBox should have a length of 4", () => {
    expect(ulBox.querySelectorAll("li").length).toEqual(4);
  });

  it("checkField() should return true when input is empty", () => {
    expect(checkField()).toBe(true);
  });

  it("hideButton() should set the hidden property of the button element to true", () => {
    hideButton();
    const buttonEl = document.querySelector(".Paragraph");
    expect(buttonEl.hidden).toBe(true);
  });

  it("unhideButton() should set the hidden property of the button element to false", () => {
    unhideButton();
    const buttonEl = document.querySelector(".Paragraph");
    expect(buttonEl.hidden).toBe(false);
  });

  it("buttonBehavior() should hide the button when the input field is empty", () => {
    buttonBehavior();
    const buttonEl = document.querySelector(".Paragraph");
    expect(buttonEl.hidden).toBe(true);
  });

  it("buttonBehavior should show the button when the input field is not empty", () => {
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
    expect(document.querySelector(".text-field").value).toBe("");
    buttonBehavior();
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
    document.querySelector(".text-field").value = "hello";
    buttonBehavior();
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
  });

  it("addParagraph() should increase ul length by 1", () => {
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
    buttonBehavior();
    expect(document.querySelector(".text-field").value).toBe("");
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
    document.querySelector(".text-field").value = "hello";
    buttonBehavior();
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
    let paragraphBox = ulBox.querySelectorAll("li");
    const paragraphCount = paragraphBox.length;
    addParagraph();
    paragraphBox = ulBox.querySelectorAll("li");
    const newParagraphCount = paragraphBox.length;
    expect(newParagraphCount).toBe(paragraphCount + 1);
  });

  it("addParagraph should add a new list item from the input text", () => {
    const inputArea = document.querySelector(".text-field");
    inputArea.value = "New Paragraph";
    addParagraph();
    const liBox = ulBox.querySelectorAll("li");
    expect(liBox[liBox.length - 1].innerText).toBe("New Paragraph");
  });

  it("returnParagraphsObject() should return object", () => {
    expect(typeof returnParagraphsObject()).toBe("object");
  });

  it("removeParagraph should remove the first list item when the list length exceeds 4", () => {
    const liElement = document.createElement("li");
    liElement.innerText = "fifth";
    ulBox.append(liElement);
    const ParagraphsBoxOldCondition = returnParagraphsObject();
    removeParagraph();
    const ParagraphsBoxNewCondition = returnParagraphsObject();
    expect(
      ParagraphsBoxOldCondition[0] !== ParagraphsBoxNewCondition[0]
    ).toBeTruthy();
  });

  it("Verify that the button is hidden by default, becomes visible on any key press except Ctrl+V, and hides again after clearing the input on button click.", () => {
    buttonBehavior();
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
    addListenerKeyupToInputEl();
    document.querySelector(".text-field").value = "test";
    let event = new Event("keyup");
    document.querySelector(".text-field").dispatchEvent(event);
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
    document.querySelector(".text-field").value = "";
    document.querySelector(".text-field").dispatchEvent(event);
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
  });

  it("Check the initial state of the list and the button, entering text makes the button visible, clicking it adds an item to the list and clears the input field, after which the button is hidden again", () => {
    buttonBehavior();
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
    expect(ulBox.querySelectorAll("li")[0].innerText).toEqual("First");
    expect(ulBox.querySelectorAll("li")[3].innerText).toEqual("fourth");
    expect(ulBox.querySelectorAll("li").length).toEqual(4);
    addListenerKeyupToInputEl();
    document.querySelector(".text-field").value = "test";
    document.querySelector(".text-field").dispatchEvent(new Event("keyup"));
    expect(document.querySelector(".Paragraph").hidden).toBe(false);
    addListenersCLickToButtonEl();
    let event = new Event("click");
    document.querySelector(".Paragraph").dispatchEvent(event);
    expect(ulBox.querySelectorAll("li")[0].innerText).toEqual("Second");
    expect(ulBox.querySelectorAll("li")[3].innerText).toEqual("test");
    expect(ulBox.querySelectorAll("li").length).toEqual(4);
    expect(document.querySelector(".text-field").value).toEqual("");
    expect(document.querySelector(".Paragraph").hidden).toBe(true);
  });

//   it(
//     "Button becomes visible when the user types any text into the input field, but it should not appear when text is inserted via paste (Ctrl+V)"
//   );
});
