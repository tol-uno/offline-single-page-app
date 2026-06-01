const activeUIGroup = {};
const DomParser = new DOMParser();

const uiGroup_logger = new Set([btn_logger, btn_switchInterface]);

function addUiElement(element) {
  if (element.name in activeUIGroup) {
    return;
  }

  // parse the elements html and create dom element
  const templateString = element.template();
  const parsedDocument = DomParser.parseFromString(templateString, "text/html");
  const domElement = parsedDocument.body.firstChild;
  document.body.appendChild(domElement);

  activeUIGroup[element.name] = { element, domElement };
}

function removeUiElement(element) {
  const { domElement } = activeUIGroup[element.name];
  if (domElement) {
    domElement.remove();
    delete activeUIGroup[element.name];
  }
}

// implement switchToUiGroup

function switchToUiGroup(newUiGroup) {
  // uiGroup need to be a Set()
  // None of these functions should mutate the uiGroups

  for (const element of this.activeUiGroup) {
    if (!newUiGroup.has(element)) {
      element.classList.add("hidden");
    }
  }

  for (const element of newUiGroup) {
    element.classList.remove("hidden");
  }

  this.activeUiGroup = new Set(newUiGroup);
}

function handleClick(event) {
  // traverse DOM upwards until match CSS selector for an element with an id
  const componentElement = event.target.closest("[id]");
  if (componentElement) {
    const { element } = activeUIGroup[componentElement.id];
    element.func();
  }
}

document.addEventListener("click", handleClick);

addUiElement(btn_startButton);
addUiElement(btn_switchInterface);
