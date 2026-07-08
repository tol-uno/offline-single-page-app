import uiElement from "../uiElement";
import { parseComponentIntoDomElement, UserInterface } from "..";
import { ui_titleText } from "./ui_titleText";

export const btn_startButton = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
      <button id="btn_startButton">
        <div>Add Title Text</div>
      </button>
    `;
  },
  () => {
    UserInterface.addUiElement(ui_titleText);
  },
);
