/**
 * @typedef {Object} Component
 * @property {string} name - The identifier for this component
 * @property {Function} template - HTML data template for the component
 * @property {Function} func - UI component logic
 */

/**
 * @type {Component}
 */
const btn_logger = {
  name: "btn_logger",

  /**
   * Generates the HTML template for the button
   * @param {Object} props - Component properties
   * @returns {string} HTML string
   */
  template() {
    return /* HTML */ `
      <button id="${this.name}">
        <div>Log Something</div>
      </button>
    `;
  },

  func() {
    console.log("Logger Clicked!");
  },
};
