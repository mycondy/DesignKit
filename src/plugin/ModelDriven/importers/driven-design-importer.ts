import { hexToRgb } from "../../../util/colorUtil";

export function addColourFrame(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null,hexColour: string,rgbName: string,name: string) {
    const colour = hexToRgb(hexColour);
    
    const frame = figma.createFrame();
    frame.name = name;
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 10;

    const colourFrame = figma.createRectangle();
    colourFrame.name = "ds_colour";
    colourFrame.resize(250, 160);
    colourFrame.fills = [{ type: 'SOLID', color: { r: Number(colour?.r), g: Number(colour?.g), b: Number(colour?.b) } }];
    colourFrame.cornerRadius = 5;

    const colourTitle = figma.createText();
    colourTitle.characters = name;
    colourTitle.name = "ds_" + name;
    colourTitle.fontSize = 18;
    colourTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const colourHex = figma.createText();
    colourHex.characters = hexColour;
    colourHex.name = "ds_" + name + "_hex";
    colourHex.fontSize = 18;
    colourHex.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const colourRGB = figma.createText();
    colourRGB.characters = rgbName;
    colourRGB.name = "ds_" + name + "_rgb";
    colourRGB.fontSize = 18;
    colourRGB.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    frame.appendChild(colourFrame);
    frame.appendChild(colourTitle);
    frame.appendChild(colourHex);
    frame.appendChild(colourRGB);
    
    return frame;
}

export function addFontFrame(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, value: string, name: string,fontSize: number, style: string) {
    const valueFrame = figma.createFrame();
    valueFrame.name = value;
    valueFrame.cornerRadius = 5;
    valueFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    valueFrame.layoutMode = 'HORIZONTAL';
    valueFrame.counterAxisAlignItems = 'MIN';
    valueFrame.layoutWrap = 'WRAP';
    valueFrame.itemSpacing = 20;

    const title = figma.createText();
    title.characters = "Aa";
    title.name = "ds_" + name;
    title.fontSize = fontSize;
    title.fontName = { family: "Inter", style: style };
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const valueText = figma.createText();
    valueText.characters = name;
    valueText.name = name;
    valueText.fontSize = fontSize;
    valueText.fontName = { family: "Inter", style: style };
    valueText.resize(320,30);
    valueText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const nameText = figma.createText();
    nameText.characters = "FontSize.size" + value;
    nameText.name = value;
    nameText.fontSize = fontSize;
    nameText.fontName = { family: "Inter", style: style };
    nameText.resize(550,30);
    nameText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    
    valueFrame.appendChild(title);
    valueFrame.appendChild(valueText);
    valueFrame.appendChild(nameText);

    title.layoutSizingVertical = "HUG";
    return valueFrame;
}

