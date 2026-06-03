const activeUIGroup = new Set();
const DomParser = new DOMParser();

const uiGroup_startButtonGroup = new Set([btn_startButton, btn_switchInterface]);
const uiGroup_loggerGroup = new Set([btn_logger, btn_mainMenu, btn_toggle]);

function addUiElement(element) {
  if (activeUIGroup.has(element)) {
    return;
  }

  // parse the elements html and create dom element
  const templateString = element.template();
  const parsedDocument = DomParser.parseFromString(templateString, "text/html");
  const domElement = parsedDocument.body.firstChild;
  if (!domElement) {
    throw new Error(`Failed to parse template for: ${element.name}`);
  }
  document.body.appendChild(domElement);
  element.domReference = domElement;

  activeUIGroup.add(element);
}

function removeUiElement(element) {
  const wasRemoved = activeUIGroup.delete(element);

  if (wasRemoved && element.domReference) {
    element.domReference.remove();
  }
}

function switchToUiGroup(newUiGroup) {
  // uiGroup need to be a Set()
  // None of these functions should mutate the uiGroups

  for (const element of activeUIGroup) {
    if (!newUiGroup.has(element)) {
      removeUiElement(element);
    }
  }

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
    clickedElement.func(clickedElement.domReference);
  }
}

document.addEventListener("click", handleClick);

addUiElement(btn_startButton);
addUiElement(btn_switchInterface);
