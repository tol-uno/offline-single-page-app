const btn_startButton = {
  name: "btn_startButton",

  template(props) {
    return /* HTML */ `
      <button id="${this.name}">
        <div>Add Title Text</div>
      </button>
    `;
  },

  func() {
    addUiElement(ui_titleText);
  },
};
