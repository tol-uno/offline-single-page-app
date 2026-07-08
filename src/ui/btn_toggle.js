import uiElement from "../uiElement";
import { parseComponentIntoDomElement, UserInterface } from "..";

export const btn_toggle = new uiElement(
  "toggle",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
      <div id="btn_toggle" class="toggle-container">
        <span class="label">BG Light</span>
        <div class="toggle"></div>
      </div>
    `;
  },
  () => {
    btn_toggle.domReference.classList.toggle("toggled");
    const toggleState = UserInterface.getToggleState(btn_toggle.domReference); // this was a UserInterface.getToggleS....
    btn_toggle.label.textContent = toggleState ? "BG Dark" : "BG Light";
    document.body.style.backgroundColor = toggleState ? "darkgray" : "lightgray";
  },
);
