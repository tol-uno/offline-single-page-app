const activeUIGroup = {};
const DomParser = new DOMParser();

const uiGroup_startButtonGroup = new Set([
  btn_startButton,
  btn_switchInterface,
]);
const uiGroup_loggerGroup = new Set([btn_logger, btn_mainMenu, btn_toggle]);

function addUiElement(element) {
  if (element.name in activeUIGroup) {
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

  activeUIGroup[element.name] = { element, domElement };
}

function removeUiElement(element) {
  const { domElement } = activeUIGroup[element.name];
  if (domElement) {
    try {
      domElement.remove();
    } catch (error) {
      console.error(error);
    } finally {
      delete activeUIGroup[element.name];
    }
  }
  // safer way:
  // const elementItem = activeUIGroup[element.name];
  // if (entry?.domElement) {
  //   entry.domElement.remove();
  //   delete activeUIGroup[element.name];
  // }
}

function switchToUiGroup(newUiGroup) {
  // uiGroup need to be a Set()
  // None of these functions should mutate the uiGroups

  for (const elementName in activeUIGroup) {
    const { element } = activeUIGroup[elementName];
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
  const componentElement = event.target.closest("[id]");
  const { element, domElement } = activeUIGroup[componentElement?.id];
  element?.func?.(domElement);
}

document.addEventListener("click", handleClick);

addUiElement(btn_startButton);
addUiElement(btn_switchInterface);
