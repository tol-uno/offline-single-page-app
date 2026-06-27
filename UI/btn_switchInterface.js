/**
 * @typedef {Object} Component
 * @property {string} name - The identifier for this component
 * @property {Function} template - HTML data template for the component
 * @property {Function} func - UI component logic
 */

/**
 * @type {Component}
 */
const btn_switchInterface = {
  name: "btn_switchInterface",

  /**
   * Generates the HTML template for the button
   * @param {Object} props - Component properties
   * @returns {string} HTML string
   */
  template() {
    return /* HTML */ `
      <button id="${this.name}">
        <div>Switch UI</div>
        <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
          <circle r="45" cx="50" cy="50" fill="red" />
        </svg>
      </button>
    `;
  },

  func() {
    switchToUiGroup(uiGroup_loggerGroup)
    // should sync btn_toggle here
  },
};
