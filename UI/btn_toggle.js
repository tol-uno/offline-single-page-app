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

  func() {
    this.domReference.classList.toggle("toggled");
    const toggleState = getToggleState(this.domReference); // this was a UserInterface.getToggleS....
    document.body.style.backgroundColor = toggleState ? "darkgray" : "lightgray";
  },
};
