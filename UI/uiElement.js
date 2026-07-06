class uiElement {
  /**
   * @param id {string}
   * @param type {"button" | "slider" | "toggle" | "display"}
   * @param template {function} Arrow function returning HTML
   * @param func {function} Arrow function representing the buttons behavior when clicked
   */
  constructor(type, template, func) {
    this.type = type;
    this.template = template;
    if (func) {
      this.func = func;
    }
    this.subElements = [];
    this.domReference = null;

    if (type === "slider") {
      this.handle = null;
      this.labelValue = null;
    }

    if (type === "toggle") {
      this.label = null;
    }
  }

  /**
  * Add slider for testing
  * Test labels and handles 
  *  
  * COULD DO:
   * When subElements are being added they should all check to make sure they dont already exist
   * - If they do, remove the old one before adding the new one  
   */

  addDomElement(container) {
    const { domElement, allSubElementsFound } = this.template();

    this.registerDomReferences(domElement);

    this.subElements = allSubElementsFound;

    container.appendChild(domElement);

    return domElement;
  }

  registerDomReferences(domElement) {
    this.domReference = domElement;

    if (this.type === "slider") {
      // register labelValue and handle
      this.labelValue = domElement.querySelector(".label > span");
      this.handle = domElement.querySelector(".handle");
    } else if (this.type === "toggle") {
      // register toggle and label
      this.label = domElement.querySelector(".label");
    }
  }
}
