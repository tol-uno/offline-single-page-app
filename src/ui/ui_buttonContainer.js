import uiElement from "../uiElement";
import { parseComponentIntoDomElement } from "..";
import {btn_sub1, btn_sub2, ui_containerSub3} from './'

export const ui_buttonContainer = new uiElement("display", () => {
  return /* HTML */ parseComponentIntoDomElement` 
      <div id="ui_buttonContainer">
        Container
        ${btn_sub1} 
        ${btn_sub2}
        ${ui_containerSub3}
      </div>  
    `;
});
