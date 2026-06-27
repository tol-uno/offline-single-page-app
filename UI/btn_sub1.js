
const btn_sub1 = {
  name: "btn_sub1",

  template() {
    return /* HTML */ `
      <button id="${this.name}">
        <div>Sub1 Button</div>
      </button>
    `;
  },

  func() {
    console.log("sub1 Clicked!");
  },
};
