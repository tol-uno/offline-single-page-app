const btn_mainMenu = {
  name: "btn_mainMenu",

  template(props) {
    return /* HTML */ `
      <button id="${this.name}">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 62 62"
          >
            <path
              stroke="black"
              stroke-linecap="round"
              stroke-width="8"
              d="m19 43 24-24m-24 0 24 24"
            />
          </svg>
        </div>
      </button>
    `;
  },

  func() {
    switchToUiGroup(uiGroup_startButtonGroup);
  },
};
