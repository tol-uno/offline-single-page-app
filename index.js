const activeUIGroup = new Set();
const DomParser = new DOMParser();

const uiGroup_startButtonGroup = new Set([btn_startButton, btn_switchInterface, ui_buttonContainer]);
const uiGroup_loggerGroup = new Set([btn_logger, btn_mainMenu, btn_toggle]);

function addUiElement(element) {
  // also adds any sub elements
  if (activeUIGroup.has(element)) {
    return;
  }

  const template = element.template();
  const string = template.fullHTMLString ?? template;
  const subElements = template.subElements ?? [];

  const domElement = parseDomElement(string);

  if (!domElement) {
    throw new Error(`Failed to parse template for: ${element.name}`);
  }
  document.body.appendChild(domElement);
  element.domReference = domElement;

  activeUIGroup.add(element);

  // register any sub components to activeUiGroup and add their domReferences
  for (const child of subElements) {
    activeUIGroup.add(child);
    child.domReference = domElement.querySelector(`#${child.name}`);
  }
}

// Used as a tagged template literal that is required for components with nested components
function parseChildren(strings, ...values) {
  let subElements = [];
  // each value being mapped is a ${} in the string
  const processChildren = values.map((value) => {
    if (value.template) {
      // if the value in the ${} is a component (has a template)
      subElements.push(value);
      return value.template();
    } else {
      // this is usually the name of the component
      return value;
    }
  });

  // Combine all string fragments and ${} values together
  let fullHTMLString = "";
  for (let i = 0; i < strings.length; i++) {
    fullHTMLString += strings[i];
    if (i < processChildren.length) {
      fullHTMLString += processChildren[i];
    }
  }

  return { fullHTMLString, subElements };
}

function parseDomElement(elementString) {
  const parsedDocument = DomParser.parseFromString(elementString, "text/html");
  return parsedDocument.body.firstChild;
}

function removeUiElement(element) {
  const wasRemoved = activeUIGroup.delete(element);

  if (wasRemoved && element.domReference) {
    element.domReference.remove();
    element.domReference = null;

    // also removes sub components
    subElements = element.template().subElements ?? [];
    for (const element of subElements) {
      element.domReference = null;
    }
  }
}

function switchToUiGroup(newUiGroup) {
  const newUiGroupWithSubElements = new Set(newUiGroup);

  // Add subElements to newUiGroupWithSubElements
  for (const element of newUiGroup) {
    const subElements = element.template().subElements ?? [];
    for (const sub of subElements) {
      newUiGroupWithSubElements.add(sub);
    }
  }

  // Remove current active elements that're not in newUiGroupWithSubElements
  for (const element of activeUIGroup) {
    if (!newUiGroupWithSubElements.has(element)) {
      removeUiElement(element);
    }
  }

  // Only add parents. subElements are added by their parents
  for (const element of newUiGroup) {
    addUiElement(element);
  }
}

function getToggleState(toggleButton) {
  return toggleButton.classList.contains("toggled");
}

function handleClick(event) {
  // traverse DOM upwards until match CSS selector for an element with an id
  const domElementClicked = event.target.closest("[id]");

  // Find element that matches the clicked DOM element
  let clickedElement = null;
  for (const element of activeUIGroup) {
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

switchToUiGroup(uiGroup_startButtonGroup);
