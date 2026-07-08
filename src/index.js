const DomParser = new DOMParser();

import { btn_startButton, btn_switchInterface, ui_buttonContainer, btn_logger, btn_mainMenu, btn_toggle } from "./ui";

export const uiGroup_startButtonGroup = new Set([btn_startButton, btn_switchInterface, ui_buttonContainer]);
export const uiGroup_loggerGroup = new Set([btn_logger, btn_mainMenu, btn_toggle]);

function parseStringToDomElement(templateString) {
  try {
    const parsedDocument = DomParser.parseFromString(templateString, "text/html");
    return parsedDocument.body.firstElementChild;
  } catch (error) {
    throw new Error(`Failed to parse DOM element: ${error.message}`, {
      cause: error,
    });
  }
}

export function parseComponentIntoDomElement(strings, ...values) {
  // each value is a ${} in the string template literal
  // recursivly expand all nested components to Dom elements
  const allSubElementsFound = [];
  const domChildrenArray = values.map((subElement) => {
    const result = subElement.template(); // uses this parseComponentIntoDomElement to parse template

    subElement.registerDomReferences(result.domElement); // register sub elements domReference

    // collect this child's own discovered sub-elements into the shared top-level array
    allSubElementsFound.push(...result.allSubElementsFound);

    // also track this child itself, since it's a sub-element of the current template
    allSubElementsFound.push(subElement);
    // allSubElementsFound.push(result.domElement); // old way where this array was populated with dom elements. Now that each class instance has its domReference set we can just use the class instance here. ^^ see above

    return result.domElement;
  });

  // add placeholder divs with the id of child that can be replaced with the actual child dom element
  // mash all string fragments together but turn ${subElements} into placeholder divs with an id
  let stringWithSubElementPlaceholders = "";
  for (let i = 0; i < strings.length; i++) {
    stringWithSubElementPlaceholders += strings[i];
    if (i < domChildrenArray.length) {
      stringWithSubElementPlaceholders += `<div id="${domChildrenArray[i].id}"></div>`;
    }
  }
  // parse and create the actual DOM element
  const domElement = parseStringToDomElement(stringWithSubElementPlaceholders);

  // slot in actual sub-element dom-elements into the placeholder divs
  for (const domChild of domChildrenArray) {
    // get placeholder div in domElement that aligns with this domChild
    const placeholderDiv = domElement.querySelector(`#${domChild.id}`);

    placeholderDiv.replaceWith(domChild);
  }

  return { domElement, allSubElementsFound };
}

export const UserInterface = {
  activeUiGroup: new Set(),

  addUiElement: function (element) {
    if (UserInterface.activeUiGroup.has(element)) {
      return;
    }

    element.addDomElement(document.body);

    UserInterface.activeUiGroup.add(element);
    for (const subElement of element.subElements) {
      UserInterface.activeUiGroup.add(subElement);
    }
  },

  removeUiElement: function (element) {
    const wasRemoved = UserInterface.activeUiGroup.delete(element);

    if (wasRemoved && element.domReference) {
      element.domReference.remove();
      element.domReference = null;

      // Remove subElements from activeUiGroup and set domReferences to null
      for (const subElement of element.subElements) {
        UserInterface.activeUiGroup.delete(subElement);
        subElement.domReference = null;
      }
    }
  },

  switchToUiGroup: function (newUiGroup) {
    const newUiGroupIncludingSubElements = new Set(newUiGroup);

    // Populate newUiGroupIncludingSubElements with all missing subElements before switching to it
    for (const element of newUiGroup) {
      for (const subElement of element.subElements) {
        newUiGroupIncludingSubElements.add(subElement);
      }
    }

    // Remove current active elements that're not in newUiGroupIncludingSubElements
    for (const element of UserInterface.activeUiGroup) {
      if (!newUiGroupIncludingSubElements.has(element)) {
        this.removeUiElement(element);
      }
    }

    // Only add parent elements -- subElements are added by their parents
    for (const element of newUiGroup) {
      this.addUiElement(element);
    }
  },

  getToggleState: function (toggleButton) {
    return toggleButton.classList.contains("toggled");
  },
};

function handleClick(event) {
  // traverse DOM upwards until match CSS selector for an element with an id
  const domElementClicked = event.target.closest("[id]");

  // Find element that matches the clicked DOM element
  let clickedElement = null;
  for (const element of UserInterface.activeUiGroup) {
    if (element.domReference === domElementClicked) {
      clickedElement = element;
      break;
    }
  }

  // Call the element's func if it exists
  if (clickedElement?.func) {
    clickedElement.func();
  }
}

document.addEventListener("click", handleClick);

UserInterface.switchToUiGroup(uiGroup_startButtonGroup);
