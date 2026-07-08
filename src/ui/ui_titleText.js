import uiElement from "../uiElement";
import { parseComponentIntoDomElement } from "..";

export const ui_titleText = new uiElement("display", () => {
  return /* HTML */ parseComponentIntoDomElement` 
      <div id="ui_titleText">
        Offline Single Page Application
      </div>
    `;
});
