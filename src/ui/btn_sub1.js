import uiElement from "../uiElement";
import { parseComponentIntoDomElement } from "..";

export const btn_sub1 = new uiElement(
  "button",
  () => {
    return /* HTML */ parseComponentIntoDomElement`
            <button id="btn_sub1">
                <div>Sub1 Button</div>
            </button>
        `;
  },
  () => {
    console.log("sub1 Clicked!");
  },
);
