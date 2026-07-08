import uiElement from "../uiElement";
import { parseComponentIntoDomElement } from "..";

export const btn_logger = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
          <button id="btn_logger">
            <div>Log Something</div>
          </button>
        `;
  },
  () => {
    console.log("Logger Clicked!");
  },
);
