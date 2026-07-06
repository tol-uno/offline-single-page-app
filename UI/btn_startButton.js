const btn_startButton = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
      <button id="btn_startButton">
        <div>Add Title Text</div>
      </button>
    `;
  },
  () => {
    UserInterface.addUiElement(ui_titleText);
  },
);
