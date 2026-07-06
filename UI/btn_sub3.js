const btn_sub3 = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
            <button id="btn_sub3">
                <div>Sub Button 3</div>
            </button>
        `;
  },
  () => {
    console.log("Sub Button 3 Clicked!");
  },
);
