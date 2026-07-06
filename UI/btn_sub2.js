const btn_sub2 = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
            <button id="btn_sub2">
                <div>Sub2 Button</div>
            </button>
        `;
  },
  () => {
    console.log("sub2 Clicked!");
  },
);
