import uiElement from "../uiElement";
import { parseComponentIntoDomElement, UserInterface, uiGroup_loggerGroup } from "..";

export const btn_switchInterface = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
          <button id="btn_switchInterface">
            <div>Switch UI</div>
            <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
              <circle r="45" cx="50" cy="50" fill="red" />
            </svg>
          </button>
        `;
  },
  () => {
    UserInterface.switchToUiGroup(uiGroup_loggerGroup);
    // should sync btn_toggle here
  },
);
