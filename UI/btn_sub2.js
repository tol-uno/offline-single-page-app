
const btn_sub2 = {
  name: "btn_sub2",

  template() {
    return /* HTML */ `
      <button id="${this.name}">
        <div>Sub2 Button</div>
      </button>
    `;
  },

  func() {
    console.log("sub2 Clicked!");
  },
};
