import { hexToRgb } from "../../util/colorUtil";
import { findLastX } from "../../util/utils";

export function makePowerBIcanvas(background: string, control: string, columns: string, rows: string){
    if(Number.isNaN(Number(columns)) || Number.isNaN(Number(rows))) {
        figma.notify("Please enter numbers in columns and rows!");
        return;
    }

    const bcgColor = hexToRgb(background);
    const cntColor = hexToRgb(control);
    const shadowColor = hexToRgb("#D8D8D8");

    const cols = Number(columns);
    const rws = Number(rows);

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "Power BI Canvas Background";
    frame.resize(1153, 630);
    frame.cornerRadius = 10;
    frame.fills = [{ type: 'SOLID', color: { r: Number(bcgColor?.r), g: Number(bcgColor?.g), b: Number(bcgColor?.b) } }];

    let lastX = 120;
    let lastY = 114 + 20;
    for (let i = 0; i < cols; i++) {

        lastX = i == 0 ? lastX : lastX + 183 + 60;

        for (let j = 0; j < rws; j++) {
            const controlRectangle = figma.createRectangle();
            controlRectangle.x = lastX;
            controlRectangle.y = j == 0 ? 60 : lastY;

            controlRectangle.name = "Control_"+j;
            controlRectangle.resize(183, 114);
            controlRectangle.cornerRadius = 20;
            controlRectangle.fills = [{ type: 'SOLID', color: { r: Number(cntColor?.r), g: Number(cntColor?.g), b: Number(cntColor?.b) } }];
            controlRectangle.effects = [{ type: 'DROP_SHADOW', color: {r: Number(shadowColor?.r), g: Number(shadowColor?.g), b: Number(shadowColor?.b), a: 0.87 }, 
                offset: {x: 1.5, y: 3},radius: 9,visible: true,blendMode:"NORMAL"}];

            frame.appendChild(controlRectangle);

            lastY = controlRectangle.y + 114 + 20;
        }
    }
}