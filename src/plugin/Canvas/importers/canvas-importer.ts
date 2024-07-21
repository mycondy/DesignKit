import { showIcon } from "../../../util/utils";
import {hexToRGBA} from '../../../util/colorUtil';

export function addCalendar(frameWidth:number, x:number, y: number,height: number, calendarColor: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, disabledColor: { r: number; g: number; b: number; } | null, mainColor: { r: number; g: number; b: number; } | null) {
    const calendarFrame = figma.createFrame();
    calendarFrame.name = "cal_calvacation";
    calendarFrame.cornerRadius = 10;
    calendarFrame.resize(frameWidth - 100, 390);
    calendarFrame.x = x;
    calendarFrame.y = y + height + 30;
    calendarFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) } }];

    const topFrame = figma.createFrame();
    topFrame.name = "top";
    topFrame.cornerRadius = 10;
    topFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    topFrame.resize(calendarFrame.width, 90);

    const topText = figma.createText();
    topText.fontName = { family: "Poppins", style: "Bold" };
    topText.characters = "December 2023";
    topText.name = "lbl_calmonth";
    topText.fontSize = 21;
    topText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    topFrame.layoutMode = 'HORIZONTAL';
    topFrame.counterAxisAlignItems = 'CENTER';
    topFrame.primaryAxisAlignItems = 'CENTER';
    topFrame.itemSpacing = 10;

    showIcon("calprev", "Left", 0, 0, 45, 45, hexToRGBA("#34306D", 1), topFrame, true);
    topFrame.appendChild(topText);
    showIcon("calnext", "Right", 0, 0, 45, 45, hexToRGBA("#34306D", 1), topFrame, true);

    const bottomFrame = figma.createFrame();
    bottomFrame.name = "bottom";
    bottomFrame.cornerRadius = 10;
    bottomFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    bottomFrame.resize(calendarFrame.width, 300);

    const sundayFrame = figma.createFrame();
    sundayFrame.name = "sunday";
    sundayFrame.cornerRadius = 10;
    sundayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    sundayFrame.resize(55, bottomFrame.height);

    const sundayText = figma.createText();
    sundayText.fontName = { family: "Poppins", style: "Bold" };
    sundayText.characters = "Su";
    sundayText.name = "su_caltext";
    sundayText.fontSize = 21;
    sundayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1Text = figma.createText();
    w1Text.fontName = { family: "Poppins", style: "Regular" };
    w1Text.characters = "26";
    w1Text.name = "w1_caltext";
    w1Text.fontSize = 21;
    w1Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2Text = figma.createText();
    w2Text.fontName = { family: "Poppins", style: "Regular" };
    w2Text.characters = "3";
    w2Text.name = "w2_caltext";
    w2Text.fontSize = 21;
    w2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3Text = figma.createText();
    w3Text.fontName = { family: "Poppins", style: "Regular" };
    w3Text.characters = "10";
    w3Text.name = "w3_caltext";
    w3Text.fontSize = 21;
    w3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4Text = figma.createText();
    w4Text.fontName = { family: "Poppins", style: "Regular" };
    w4Text.characters = "17";
    w4Text.name = "w4_caltext";
    w4Text.fontSize = 21;
    w4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5Text = figma.createText();
    w5Text.fontName = { family: "Poppins", style: "Regular" };
    w5Text.characters = "24";
    w5Text.name = "w5_caltext";
    w5Text.fontSize = 21;
    w5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w6Text = figma.createText();
    w6Text.fontName = { family: "Poppins", style: "Regular" };
    w6Text.characters = "31";
    w6Text.name = "w6_caltext";
    w6Text.fontSize = 21;
    w6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    sundayFrame.layoutMode = 'VERTICAL';
    sundayFrame.counterAxisAlignItems = 'CENTER';
    sundayFrame.itemSpacing = 10;

    sundayFrame.appendChild(sundayText);
    sundayFrame.appendChild(w1Text);
    sundayFrame.appendChild(w2Text);
    sundayFrame.appendChild(w3Text);
    sundayFrame.appendChild(w4Text);
    sundayFrame.appendChild(w5Text);
    sundayFrame.appendChild(w6Text);

    const mondayFrame = figma.createFrame();
    mondayFrame.name = "monday";
    mondayFrame.cornerRadius = 10;
    mondayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    mondayFrame.resize(55, bottomFrame.height);

    const mondayText = figma.createText();
    mondayText.fontName = { family: "Poppins", style: "Bold" };
    mondayText.characters = "Mo";
    mondayText.name = "mo_caltext";
    mondayText.fontSize = 21;
    mondayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_1Text = figma.createText();
    w1_1Text.fontName = { family: "Poppins", style: "Regular" };
    w1_1Text.characters = "27";
    w1_1Text.name = "w1_1caltext";
    w1_1Text.fontSize = 21;
    w1_1Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_1Text = figma.createText();
    w2_1Text.fontName = { family: "Poppins", style: "Regular" };
    w2_1Text.characters = "4";
    w2_1Text.name = "w2_1caltext";
    w2_1Text.fontSize = 21;
    w2_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_1Text = figma.createText();
    w3_1Text.fontName = { family: "Poppins", style: "Regular" };
    w3_1Text.characters = "11";
    w3_1Text.name = "w3_1caltext";
    w3_1Text.fontSize = 21;
    w3_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_1Text = figma.createText();
    w4_1Text.fontName = { family: "Poppins", style: "Regular" };
    w4_1Text.characters = "18";
    w4_1Text.name = "w4_1caltext";
    w4_1Text.fontSize = 21;
    w4_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_1Text = figma.createText();
    w5_1Text.fontName = { family: "Poppins", style: "Regular" };
    w5_1Text.characters = "25";
    w5_1Text.name = "w5_1caltext";
    w5_1Text.fontSize = 21;
    w5_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    mondayFrame.layoutMode = 'VERTICAL';
    mondayFrame.counterAxisAlignItems = 'CENTER';
    mondayFrame.itemSpacing = 10;

    mondayFrame.appendChild(mondayText);
    mondayFrame.appendChild(w1_1Text);
    mondayFrame.appendChild(w2_1Text);
    mondayFrame.appendChild(w3_1Text);
    mondayFrame.appendChild(w4_1Text);
    mondayFrame.appendChild(w5_1Text);

    const tuesdayFrame = figma.createFrame();
    tuesdayFrame.name = "tuesday";
    tuesdayFrame.cornerRadius = 10;
    tuesdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    tuesdayFrame.resize(55, bottomFrame.height);

    const tuesdayText = figma.createText();
    tuesdayText.fontName = { family: "Poppins", style: "Bold" };
    tuesdayText.characters = "Tu";
    tuesdayText.name = "tu_caltext";
    tuesdayText.fontSize = 21;
    tuesdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_2Text = figma.createText();
    w1_2Text.fontName = { family: "Poppins", style: "Regular" };
    w1_2Text.characters = "28";
    w1_2Text.name = "w2_2caltext";
    w1_2Text.fontSize = 21;
    w1_2Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_2Text = figma.createText();
    w2_2Text.fontName = { family: "Poppins", style: "Regular" };
    w2_2Text.characters = "5";
    w2_2Text.name = "w2_2caltext";
    w2_2Text.fontSize = 21;
    w2_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_2Text = figma.createText();
    w3_2Text.fontName = { family: "Poppins", style: "Regular" };
    w3_2Text.characters = "12";
    w3_2Text.name = "w3_2caltext";
    w3_2Text.fontSize = 21;
    w3_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_2Text = figma.createText();
    w4_2Text.fontName = { family: "Poppins", style: "Regular" };
    w4_2Text.characters = "19";
    w4_2Text.name = "w4_2caltext";
    w4_2Text.fontSize = 21;
    w4_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_2Text = figma.createText();
    w5_2Text.fontName = { family: "Poppins", style: "Regular" };
    w5_2Text.characters = "26";
    w5_2Text.name = "w5_2caltext";
    w5_2Text.fontSize = 21;
    w5_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    tuesdayFrame.layoutMode = 'VERTICAL';
    tuesdayFrame.counterAxisAlignItems = 'CENTER';
    tuesdayFrame.itemSpacing = 10;

    tuesdayFrame.appendChild(tuesdayText);
    tuesdayFrame.appendChild(w1_2Text);
    tuesdayFrame.appendChild(w2_2Text);
    tuesdayFrame.appendChild(w3_2Text);
    tuesdayFrame.appendChild(w4_2Text);
    tuesdayFrame.appendChild(w5_2Text);

    const wednesdayFrame = figma.createFrame();
    wednesdayFrame.name = "wednesday";
    wednesdayFrame.cornerRadius = 10;
    wednesdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    wednesdayFrame.resize(55, bottomFrame.height);

    const wednesdayText = figma.createText();
    wednesdayText.fontName = { family: "Poppins", style: "Bold" };
    wednesdayText.characters = "We";
    wednesdayText.name = "we_caltext";
    wednesdayText.fontSize = 21;
    wednesdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_3Text = figma.createText();
    w1_3Text.fontName = { family: "Poppins", style: "Regular" };
    w1_3Text.characters = "29";
    w1_3Text.name = "w2_3caltext";
    w1_3Text.fontSize = 21;
    w1_3Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_3Text = figma.createText();
    w2_3Text.fontName = { family: "Poppins", style: "Regular" };
    w2_3Text.characters = "6";
    w2_3Text.name = "w2_3calText";
    w2_3Text.fontSize = 21;
    w2_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_3Text = figma.createText();
    w3_3Text.fontName = { family: "Poppins", style: "Regular" };
    w3_3Text.characters = "13";
    w3_3Text.name = "w3_3calText";
    w3_3Text.fontSize = 21;
    w3_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_3Text = figma.createText();
    w4_3Text.fontName = { family: "Poppins", style: "Regular" };
    w4_3Text.characters = "20";
    w4_3Text.name = "w4_3calText";
    w4_3Text.fontSize = 21;
    w4_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_3Text = figma.createText();
    w5_3Text.fontName = { family: "Poppins", style: "Regular" };
    w5_3Text.characters = "27";
    w5_3Text.name = "w5_3caltext";
    w5_3Text.fontSize = 21;
    w5_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    wednesdayFrame.layoutMode = 'VERTICAL';
    wednesdayFrame.counterAxisAlignItems = 'CENTER';
    wednesdayFrame.itemSpacing = 10;

    wednesdayFrame.appendChild(wednesdayText);
    wednesdayFrame.appendChild(w1_3Text);
    wednesdayFrame.appendChild(w2_3Text);
    wednesdayFrame.appendChild(w3_3Text);
    wednesdayFrame.appendChild(w4_3Text);
    wednesdayFrame.appendChild(w5_3Text);

    const thursdayFrame = figma.createFrame();
    thursdayFrame.name = "thursday";
    thursdayFrame.cornerRadius = 10;
    thursdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    thursdayFrame.resize(55, bottomFrame.height);

    const thursdayText = figma.createText();
    thursdayText.fontName = { family: "Poppins", style: "Bold" };
    thursdayText.characters = "Th";
    thursdayText.name = "th_caltext";
    thursdayText.fontSize = 21;
    thursdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_4Text = figma.createText();
    w1_4Text.fontName = { family: "Poppins", style: "Regular" };
    w1_4Text.characters = "30";
    w1_4Text.name = "w1_4calText";
    w1_4Text.fontSize = 21;
    w1_4Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_4Text = figma.createText();
    w2_4Text.fontName = { family: "Poppins", style: "Regular" };
    w2_4Text.characters = "7";
    w2_4Text.name = "w2_4calText";
    w2_4Text.fontSize = 21;
    w2_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_4Text = figma.createText();
    w3_4Text.fontName = { family: "Poppins", style: "Regular" };
    w3_4Text.characters = "14";
    w3_4Text.name = "w3_4calText";
    w3_4Text.fontSize = 21;
    w3_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_4Text = figma.createText();
    w4_4Text.fontName = { family: "Poppins", style: "Regular" };
    w4_4Text.characters = "21";
    w4_4Text.name = "w4_4calText";
    w4_4Text.fontSize = 21;
    w4_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_4Text = figma.createText();
    w5_4Text.fontName = { family: "Poppins", style: "Regular" };
    w5_4Text.characters = "28";
    w5_4Text.name = "w5_4caltext";
    w5_4Text.fontSize = 21;
    w5_4Text.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    w5_4Text.strokes = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];

    thursdayFrame.layoutMode = 'VERTICAL';
    thursdayFrame.counterAxisAlignItems = 'CENTER';
    thursdayFrame.itemSpacing = 10;

    thursdayFrame.appendChild(thursdayText);
    thursdayFrame.appendChild(w1_4Text);
    thursdayFrame.appendChild(w2_4Text);
    thursdayFrame.appendChild(w3_4Text);
    thursdayFrame.appendChild(w4_4Text);
    thursdayFrame.appendChild(w5_4Text);

    const fridayFrame = figma.createFrame();
    fridayFrame.name = "friday";
    fridayFrame.cornerRadius = 10;
    fridayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    fridayFrame.resize(55, bottomFrame.height);

    const fridayText = figma.createText();
    fridayText.fontName = { family: "Poppins", style: "Bold" };
    fridayText.characters = "Fr";
    fridayText.name = "fr_caltext";
    fridayText.fontSize = 21;
    fridayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_5Text = figma.createText();
    w1_5Text.fontName = { family: "Poppins", style: "Regular" };
    w1_5Text.characters = "1";
    w1_5Text.name = "w1_5calText";
    w1_5Text.fontSize = 21;
    w1_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w2_5Text = figma.createText();
    w2_5Text.fontName = { family: "Poppins", style: "Regular" };
    w2_5Text.characters = "8";
    w2_5Text.name = "w2_5calText";
    w2_5Text.fontSize = 21;
    w2_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_5Text = figma.createText();
    w3_5Text.fontName = { family: "Poppins", style: "Regular" };
    w3_5Text.characters = "15";
    w3_5Text.name = "w3_5calText";
    w3_5Text.fontSize = 21;
    w3_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_5Text = figma.createText();
    w4_5Text.fontName = { family: "Poppins", style: "Regular" };
    w4_5Text.characters = "22";
    w4_5Text.name = "w4_5calText";
    w4_5Text.fontSize = 21;
    w4_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_5Text = figma.createText();
    w5_5Text.fontName = { family: "Poppins", style: "Regular" };
    w5_5Text.characters = "29";
    w5_5Text.name = "w5_5caltext";
    w5_5Text.fontSize = 21;
    w5_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    fridayFrame.layoutMode = 'VERTICAL';
    fridayFrame.counterAxisAlignItems = 'CENTER';
    fridayFrame.itemSpacing = 10;

    fridayFrame.appendChild(fridayText);
    fridayFrame.appendChild(w1_5Text);
    fridayFrame.appendChild(w2_5Text);
    fridayFrame.appendChild(w3_5Text);
    fridayFrame.appendChild(w4_5Text);
    fridayFrame.appendChild(w5_5Text);

    const saturdayFrame = figma.createFrame();
    saturdayFrame.name = "saturday";
    saturdayFrame.cornerRadius = 10;
    saturdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) }, opacity: 0 }];
    saturdayFrame.resize(55, bottomFrame.height);

    const saturdayText = figma.createText();
    saturdayText.fontName = { family: "Poppins", style: "Bold" };
    saturdayText.characters = "Sa";
    saturdayText.name = "sa_caltext";
    saturdayText.fontSize = 21;
    saturdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_6Text = figma.createText();
    w1_6Text.fontName = { family: "Poppins", style: "Regular" };
    w1_6Text.characters = "2";
    w1_6Text.name = "w1_6calText";
    w1_6Text.fontSize = 21;
    w1_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w2_6Text = figma.createText();
    w2_6Text.fontName = { family: "Poppins", style: "Regular" };
    w2_6Text.characters = "9";
    w2_6Text.name = "w2_6calText";
    w2_6Text.fontSize = 21;
    w2_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_6Text = figma.createText();
    w3_6Text.fontName = { family: "Poppins", style: "Regular" };
    w3_6Text.characters = "16";
    w3_6Text.name = "w3_6calText";
    w3_6Text.fontSize = 21;
    w3_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_6Text = figma.createText();
    w4_6Text.fontName = { family: "Poppins", style: "Regular" };
    w4_6Text.characters = "23";
    w4_6Text.name = "w4_6calText";
    w4_6Text.fontSize = 21;
    w4_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_6Text = figma.createText();
    w5_6Text.fontName = { family: "Poppins", style: "Regular" };
    w5_6Text.characters = "30";
    w5_6Text.name = "w5_6caltext";
    w5_6Text.fontSize = 21;
    w5_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    saturdayFrame.layoutMode = 'VERTICAL';
    saturdayFrame.counterAxisAlignItems = 'CENTER';
    saturdayFrame.itemSpacing = 10;

    saturdayFrame.appendChild(saturdayText);
    saturdayFrame.appendChild(w1_6Text);
    saturdayFrame.appendChild(w2_6Text);
    saturdayFrame.appendChild(w3_6Text);
    saturdayFrame.appendChild(w4_6Text);
    saturdayFrame.appendChild(w5_6Text);

    bottomFrame.layoutMode = 'HORIZONTAL';
    bottomFrame.counterAxisAlignItems = 'MIN';
    bottomFrame.itemSpacing = 15;

    bottomFrame.appendChild(sundayFrame);
    bottomFrame.appendChild(mondayFrame);
    bottomFrame.appendChild(tuesdayFrame);
    bottomFrame.appendChild(wednesdayFrame);
    bottomFrame.appendChild(thursdayFrame);
    bottomFrame.appendChild(fridayFrame);
    bottomFrame.appendChild(saturdayFrame);

    calendarFrame.layoutMode = 'VERTICAL';
    calendarFrame.counterAxisAlignItems = 'CENTER';

    calendarFrame.appendChild(topFrame);
    calendarFrame.appendChild(bottomFrame);

    topFrame.layoutSizingHorizontal = "FILL";
    return calendarFrame;
}


