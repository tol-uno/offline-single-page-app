import uiElement from "../uiElement";
import { parseComponentIntoDomElement } from "..";
import { btn_sub3 } from "./btn_sub3";

export const ui_containerSub3 = new uiElement("display", () => {
  return /* HTML */ parseComponentIntoDomElement` 
            <div id="ui_containerSub3">
                Sub3 Container
                ${btn_sub3}
            </div> `;
});
