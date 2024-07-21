import { hexToRgb } from "../../../util/colorUtil";
import { findLastX } from "../../../util/utils";
import { FreePrefixes } from "../../../model/consts/FreePrefixes";

export function addListPrefixes() {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#34306D");

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "List of prefixes";
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 20;
    frame.horizontalPadding = 20;
    frame.verticalPadding = 20;

    const prefixTitle = figma.createText();
    prefixTitle.characters = "List of FREE prefixes:";
    prefixTitle.name = "ht_prefix_title";
    prefixTitle.fontSize = 40;
    prefixTitle.resize(frame.width,30);
    prefixTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    
    frame.appendChild(prefixTitle);
    
    const keys = Object.keys(FreePrefixes);
    const values = Object.values(FreePrefixes);
    
    addListofPrefixes(keys, values, background, textColor, frame);

    prefixTitle.layoutSizingHorizontal = "HUG";

    frame.layoutSizingHorizontal = "HUG";
}
function addListofPrefixes(keys: string[], values: FreePrefixes[], background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, frame: FrameNode) {
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const value = values[index];

        const prefixFrame = figma.createFrame();
        prefixFrame.name = "ht_pref_" + index;
        prefixFrame.cornerRadius = 5;
        prefixFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        prefixFrame.layoutMode = 'HORIZONTAL';
        prefixFrame.counterAxisAlignItems = 'MIN';
        prefixFrame.itemSpacing = 20;
        prefixFrame.resize(600, 30);

        const prefKey = figma.createText();
        prefKey.characters = key.split('_').join(',') + ":";
        prefKey.name = "ht_key_" + index;
        prefKey.fontSize = 20;
        prefKey.resize(500, 30);
        prefKey.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

        const prefVal = figma.createText();
        prefVal.characters = value;
        prefVal.name = "ht_value_" + index;
        prefVal.fontSize = 20;
        prefVal.resize(500, 30);
        prefVal.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

        prefixFrame.appendChild(prefKey);
        prefixFrame.appendChild(prefVal);
        frame.appendChild(prefixFrame);

        prefixFrame.layoutSizingHorizontal = "HUG";
        prefKey.layoutSizingVertical = "HUG";
        prefKey.layoutSizingHorizontal = "FIXED";
        prefVal.layoutSizingVertical = "HUG";
        prefVal.layoutSizingHorizontal = "FIXED";
    }
}

