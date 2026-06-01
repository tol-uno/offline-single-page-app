/**
 * @typedef {Object} Component
 * @property {string} name - The identifier for this component
 * @property {Function} template - HTML data template for the component
 * @property {Function} func - UI component logic
 */

/**
 * @type {Component}
 */
const btn_startButton = {
  name: "btn_startButton",

  /**
   * Generates the HTML template for the button
   * @param {Object} props - Component properties
   * @returns {string} HTML string
   */
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
