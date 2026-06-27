const ui_buttonContainer = {
  name: "ui_buttonContainer",

  template() {
    return /* HTML */ parseChildren` <div id="${this.name}">Container${btn_sub1} ${btn_sub2}</div> `;
  },
};
