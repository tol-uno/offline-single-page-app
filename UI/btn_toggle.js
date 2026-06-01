const btn_toggle = {
  name: "btn_toggle",

  template(props) {
    return /* HTML */ `
      <div id="${this.name}" class="toggle-container">
        <span class="label">Change BG</span>
        <div class="toggle"></div>
      </div>
    `;
  },

  func(domElement) {
    domElement.classList.toggle("toggled");
    const toggleState = getToggleState(domElement); // this was a UserInterface.getToggleS....
    document.body.style.backgroundColor = toggleState
      ? "darkgray"
      : "lightgray";
  },
};
