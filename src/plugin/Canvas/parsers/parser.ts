import { Field, Screen,Props,Form,Container } from '../../../model/Canvas/Screen';
import { ScreenSaver } from '../../../model/Canvas/ScreenSaver';
import { findLastX, findPropertyValueFromScreens, findPropertyValuebyName, getMaxWidthHeight, getValue, showIcon } from '../../../util/utils';
import { getFontName } from '../importers/font-importer';
import {hexToRGBA, hexToRgb, invertColor, rgbToHex, rgbaToRgb, rgbaToRgbWithOpacity, shadeColor,threeHexToRGB} from '../../../util/colorUtil';
import { CompField, CompForm, CompProps } from '../../../model/Canvas/Component';

var screenVal: Screen;
var saver: ScreenSaver;

export function parseScreen(screen: Screen,allScreens: ScreenSaver) {
    saver = allScreens;
    const frame = figma.createFrame();
    screenVal = screen;

    const resize = getMaxWidthHeight(screen);
    frame.resize(Number(resize.w),Number(resize.h));

    frame.name = screen.name;
    frame.cornerRadius = 20;
    if(screen.fill != "") {
        var {r,g,b} = rgbaToRgb(screen.fill);
        frame.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
    }
    frame.x = findLastX() + 10;
    frame.y = 0;

    addChildObject(0,screen.fields,frame);
    addFormsChild(screen.forms,frame);
    addContainerChild(screen.containers,frame);

    figma.currentPage.appendChild(frame);

}

function addChildObject(yValue: number,fields: Field[] | CompField[], frame: FrameNode | ComponentNode) {
    fields.forEach(field => {
        var fontName = getFontName(field.properties);
        if(field.type.includes("icon")) {
            addIconProps(field.properties,frame,yValue);
            return;
        }
        switch(field.type) {
            case "label": {
                const label = figma.createText();
                label.name = "lbl_" + field.name;
                label.characters = "Title";
                if(fontName != '') {
                    if(fontName.includes(".Font")) {
                        fontName = "Inter";
                    }
                    (async() => {
                        try {
                            await figma.loadFontAsync({
                                family: fontName,
                                style: 'Regular',
                            });
                        } catch(e) {
                            figma.notify("Missing font " + fontName + " in Figma!");
                            fontName = "Inter";

                            label.fontName = { family: fontName, style: "Regular" }; 
                            label.fontSize = 25;    
                            addLblProps(field.properties,label);
                            
                            if(yValue > 0) label.y = label.y + yValue;
                            frame.appendChild(label);
                        }
                    })().then(() => {
                        label.fontName = { family: fontName, style: "Regular" }; 
                        label.fontSize = 25;    
                        addLblProps(field.properties,label);
                        
                        if(yValue > 0) label.y = label.y + yValue;
                        frame.appendChild(label);
                    })
                } else {
                    label.fontSize = 25;    
                    addLblProps(field.properties,label);
                    
                    if(yValue > 0) label.y = label.y + yValue;
                    frame.appendChild(label);
                }
                break;
            }
            case "rectangle": {
                const rectangle = figma.createRectangle();
                rectangle.name = "rect_" + field.name;
                rectangle.cornerRadius = 10;
                rectangle.fills = [{ type: 'SOLID', color: { r: 0.2196, g: 0.3764, b: 0.698 } }];
                
                addRectangleProps(field.properties,rectangle);
                if(yValue > 0 ) rectangle.y = rectangle.y + yValue;
                frame.appendChild(rectangle);
                break;
            }
            case "circle": {
                const circle = figma.createEllipse();
                circle.name = "circle_" + field.name;

                addCircleProps(field.properties,circle);

                frame.appendChild(circle);
                break;
            }
            case "button": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "btn_" + field.name;
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0.2196, g: 0.3764, b: 0.698 } }];

                const text = figma.createText();
                text.textAlignHorizontal = "CENTER";
                text.textAlignVertical = "CENTER";
                addButtonProps(parentFrame,text,field.properties);
                
                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                
                parentFrame.appendChild(text);

                frame.appendChild(parentFrame);
                break;
            }
            case "text": {
                const parentFrame = figma.createFrame();
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
                parentFrame.name = "txt_" + field.name;

                const text = figma.createText();
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";

                addTextProps(parentFrame,text,field.properties);

                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                parentFrame.horizontalPadding = 10;
                
                parentFrame.appendChild(text);
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "dropdown":
            case "combobox":
            case "Combobox.pcfdataset": {
                const parentFrame = figma.createFrame();
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                parentFrame.paddingLeft = 10;

                parentFrame.name =  field.type == "dropdown" ? "dropdwn_" + field.name : "combo_" + field.name;

                const text = figma.createText();
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";

                var chars = field.type == "dropdown" ? "select items..." : "find items...";
                addBoxProps(parentFrame,text,field.properties,chars);
                
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "datepicker":
            case "'Date picker'": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "datepickr_" + field.name;
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0.96, g: 0.96, b: 0.96 } }];
                
                const text = figma.createText();
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";
                text.characters = "12/08/2023";
                
                addDatePickerProps(parentFrame,text,field.properties);
                
                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                parentFrame.paddingLeft = 10;
                
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "checkbox" : {
                const parentFrame = figma.createFrame();
                parentFrame.name = "check_" + field.name;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];

                const rectangle = figma.createRectangle();
                rectangle.cornerRadius = 10;
                rectangle.resize(60,60);

                const text = figma.createText();
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";

                addCheckProps(parentFrame,text,rectangle,field.properties);

                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                parentFrame.itemSpacing = 10;

                parentFrame.appendChild(rectangle);
                parentFrame.appendChild(text);
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "toggleSwitch": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "toggle_" + field.name;
                
                const rectangle = figma.createRectangle();
                rectangle.cornerRadius = 30;
                rectangle.resize(80,60);
                
                const circle = figma.createEllipse();
                circle.resize(40,40);

                const text = figma.createText();

                addToggleProps(parentFrame,field.properties,rectangle,circle,text);

                parentFrame.appendChild(rectangle);
                parentFrame.appendChild(circle);
                parentFrame.appendChild(text);
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "listbox": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "list_" + field.name;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];
                parentFrame.cornerRadius = 10;
                parentFrame.strokes = [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }];
                parentFrame.strokeWeight = 2;

                const rectangle = figma.createRectangle();
                rectangle.fills = [{ type: 'SOLID', color: { r: 0.2196, g: 0.3764, b: 0.698 } }];

                const text1 = figma.createText();
                text1.textAlignHorizontal = "LEFT";
                text1.textAlignVertical = "CENTER";
                text1.characters = "1";
                
                const text2 = figma.createText();
                text2.textAlignHorizontal = "LEFT";
                text2.textAlignVertical = "CENTER";
                text2.characters = "2";

                const text3 = figma.createText();
                text3.textAlignHorizontal = "LEFT";
                text3.textAlignVertical = "CENTER";
                text3.characters = "3";

                addListProps(parentFrame,field.properties,rectangle,text1,text2,text3);

                text3.fontSize = text2.fontSize;
                text3.x = text2.x;
                text3.y = text2.y + text2.height + 20;

                parentFrame.appendChild(rectangle);
                parentFrame.appendChild(text1);
                parentFrame.appendChild(text2);
                parentFrame.appendChild(text3);

                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);

                break;
            }
            case "slider": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "slider_" + field.name;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];

                const rectangle = figma.createRectangle();
                rectangle.fills = [{ type: 'SOLID', color: { r: 0.2196, g: 0.3764, b: 0.698 } }];
                rectangle.cornerRadius = 10;

                const circle = figma.createEllipse();
                circle.resize(40,40);

                addSliderProps(parentFrame,rectangle,circle,field.properties);

                parentFrame.appendChild(rectangle);
                parentFrame.appendChild(circle);
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);

                break;
            }
            case "rating": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "slider_" + field.name;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];

                const hex = rgbToHex(Math.round(0.2196*255),Math.round(0.3764*255),Math.round(0.698*255));
                const inverted = invertColor(hex);
                const rgba = hexToRGBA(inverted,1);

                addRatingProps(parentFrame,rgba,field.properties);
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "richTextEditor": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "richtxt_" + field.name;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];
                parentFrame.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                parentFrame.cornerRadius = 5;

                const format = figma.createText();
                format.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                format.characters = "Format";
                format.x = 10;
                format.y = 15;

                const vertical1 = figma.createRectangle();
                vertical1.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                vertical1.resize(1,30);

                const vertical2 = figma.createRectangle();
                vertical2.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                vertical2.resize(1,30);

                const vertical3 = figma.createRectangle();
                vertical3.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                vertical3.resize(1,30);

                const vertical4 = figma.createRectangle();
                vertical4.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                vertical4.resize(1,30);

                const vertical5 = figma.createRectangle();
                vertical5.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
                vertical5.resize(1,30);
                
                const rectangle = figma.createRectangle();
                rectangle.fills = [{ type: 'SOLID', color: { r: 0.8509, g: 0.8509, b: 0.8509 } }];
                rectangle.y = 40;
                
                const text = figma.createText();
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";
                
                addTextProps(parentFrame,text,field.properties);
                
                rectangle.resize(parentFrame.width,5);
                text.x = 10;

                vertical1.x = format.x + format.width + 40;
                vertical2.x = vertical1.x + vertical1.width + 105;
                vertical3.x = vertical2.x + vertical2.width + 75;
                vertical4.x = vertical3.x + vertical3.width + 40;
                vertical5.x = vertical4.x + vertical4.width + 75;

                vertical1.y = 5;
                vertical2.y = 5;
                vertical3.y = 5;
                vertical4.y = 5;
                vertical5.y = 5;
                
                const hexGray = rgbToHex(Math.round(0.90*255),Math.round(0.90*255),Math.round(0.90*255));
                const rgba = hexToRGBA("#000000",1);
                const rgbaGray = hexToRGBA(hexGray,1);

                showIcon("down","Down",format.x + format.width + 10,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("bold","Bold",vertical1.x + vertical1.width + 10,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("slash","Slash",vertical1.x + vertical1.width + 40,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("under","Underline",vertical1.x + vertical1.width + 75,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("link","Link",vertical2.x + vertical1.width + 10,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("unlink","Unlink",vertical2.x + vertical2.width + 40,format.y-3,20,20,rgbaGray,parentFrame,true);
                showIcon("erase","Erase",vertical3.x + vertical3.width + 10,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("option","OptionsList",vertical4.x + vertical4.width + 10,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("list","List",vertical4.x + vertical4.width + 40,format.y-3,20,20,rgba,parentFrame,true);
                showIcon("more","More",vertical5.x + vertical5.width + 10,format.y-3,20,20,rgba,parentFrame,true);

                parentFrame.appendChild(rectangle);
                parentFrame.appendChild(format);
                parentFrame.appendChild(vertical1);
                parentFrame.appendChild(vertical2);
                parentFrame.appendChild(vertical3);
                parentFrame.appendChild(vertical4);
                parentFrame.appendChild(vertical5);
                parentFrame.appendChild(text);

                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "timer" : {
                const parentFrame = figma.createFrame();
                parentFrame.name = "timer_" + field.name;
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0.2196, g: 0.3764, b: 0.698 } }];
                
                const text = figma.createText();
                text.textAlignHorizontal = "CENTER";
                text.textAlignVertical = "CENTER";
                text.characters = "00:00:00";
                text.fontSize = 21;

                addTextProps(parentFrame,text,field.properties);

                parentFrame.appendChild(text);
                
                parentFrame.layoutMode = 'HORIZONTAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
                parentFrame.horizontalPadding = 10;
                
                if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
                frame.appendChild(parentFrame);
                break;
            }
            case "triangle":
            case "octagon":
            case "pentagon": {
                const polygon = figma.createPolygon();
                if(field.type == "triangle") {
                    polygon.name = "tr_" + field.name;
                    polygon.pointCount = 3;
                } else if(field.type == "octagon") {
                    polygon.name = "oc_" + field.name;
                    polygon.pointCount = 5;
                } else {
                    polygon.name = "pe_" + field.name;
                    polygon.pointCount = 8;
                }
                polygon.resize(60, 60);

                addPolyProps(polygon,field.properties);
                if(yValue > 0) polygon.y = polygon.y + yValue;
                frame.appendChild(polygon);
                break;
            }
            case "star":
            case "star.star6":
            case "star.star8":
            case "star.star12":   {
                const star = figma.createStar();
                star.name = "star_" + field.name;
                star.resize(60, 60);
                star.pointCount = 5;

                if(field.type.includes("star6")) star.pointCount = 6;
                if(field.type.includes("star8")) star.pointCount = 8;
                if(field.type.includes("star12")) star.pointCount = 12;
                
                addStarProps(star, field.properties);
                if(yValue > 0) star.y = star.y + yValue;
                frame.appendChild(star);
                break;
            }
            case "radio": {
                addRadioProps(field.properties,field.name,frame,yValue);
                break;
            }
            case "image" : {
                addImage(field.name,field.properties,frame,yValue);
                break;
            }
            case "htmlViewer": {
                const rectangle = figma.createRectangle();
                rectangle.name = "html_" + field.name;
                rectangle.cornerRadius = 10;

                addHTMLProps(field.properties,rectangle,frame,field.name);
                break;
            }
            case "groupContainer.verticalAutoLayoutContainer" :
            case "groupContainer.horizontalAutoLayoutContainer" :
            case "groupContainer.manualLayoutContainer" :
            case "group": {
                const parentFrame = figma.createFrame();
                parentFrame.name = "cont_" + field.name;

                if(field.type.includes("horizontal"))  {
                    parentFrame.layoutMode = 'HORIZONTAL';
                    parentFrame.counterAxisAlignItems = 'CENTER';
                }
                else if(field.type.includes("vertical")) {
                    parentFrame.layoutMode = 'VERTICAL';
                    parentFrame.counterAxisAlignItems = 'CENTER';
                }

                addContainerProps(field.properties,parentFrame);

                frame.appendChild(parentFrame);
                break;
            }
        }
    });
}
function addFormsChild(forms: Form[] | CompForm[] | undefined, frame: FrameNode | ComponentNode) {
    if(forms != undefined) {
        forms.forEach(form => {
            const y = form.properties.find(function(item){
                return item.key == "Y";
            });

            const height = form.properties.find(function(item){
                return item.key == "Height";
            });
            if(y != undefined && height != undefined) {
                const yValue = y.value.includes("=") ? y.value.split("=")[1].replace("'",""): y.value;
                const resY = isNaN(Number(getNumValue(yValue,"Y"))) ? 0 : Number(getNumValue(yValue,"Y"));
                const heightValue = height.value.includes("=") ? height.value.split("=")[1].replace("'",""): height.value;
                
                var outHeight = heightValue.includes("Parent.") ? 200 : getNumValue(heightValue,"Height");
                if(outHeight == 0 || isNaN(Number(outHeight))) outHeight = 100;

                if(form.type == "gallery" || form.type == "formViewer" || form.type == "form") {
                    const parentFrame = figma.createFrame();
                    parentFrame.name = form.type + "_" + form.name;
                    parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];
                    parentFrame.resize(frame.width,Number(outHeight));
                    parentFrame.y = Number(resY);
                    
                    addChildObject(0,form.fields,parentFrame);
                    
                    frame.appendChild(parentFrame);
                    
                } else {
                    addChildObject(Number(resY),form.fields,frame);
                }
            }
        });
    }
}

function addContainerChild(containers: Container[] | undefined, frame: FrameNode) {
    if(containers != undefined) {
        containers.forEach(container => {
            const y = container.properties.find(function(item){
                return item.key == "Y";
            });
            
            const height = container.properties.find(function(item){
                return item.key == "Height";
            });
            
            const fill = container.properties.find(function(item){
                return item.key == "Fill";
            });
            
            if(y != undefined && height != undefined) {
                const yValue = y.value.includes("=") ? y.value.split("=")[1].replace("'",""): y.value;
                const resY = isNaN(Number(getNumValue(yValue,"Y"))) ? 0 : Number(getNumValue(yValue,"Y"));

                const heightValue = height.value.includes("=") ? height.value.split("=")[1].replace("'",""): height.value;

                var outHeight = heightValue.includes("Parent.") ? 200 : getNumValue(heightValue,"Height");
                if(outHeight == 0 || isNaN(Number(outHeight))) outHeight = 100;

                const parentFrame = figma.createFrame();
                parentFrame.name = container.type + "_" + container.name;
                
                if(container.type == "horizontalContainer")  {
                    parentFrame.layoutMode = 'HORIZONTAL';
                    parentFrame.counterAxisAlignItems = 'CENTER';
                }
                else if(container.type == "verticalContainer") {
                    parentFrame.layoutMode = 'VERTICAL';
                    parentFrame.counterAxisAlignItems = 'CENTER';
                }

                if(fill != undefined) {
                    const fillValue = fill.value.includes("=") ? fill.value.split("=")[1].replace("'",""): fill.value;
                    const rgb = rgbaToRgbWithOpacity(fillValue);
                    parentFrame.fills = [{ type: 'SOLID', color: { r: rgb.r, g: rgb.g, b: rgb.b } , opacity: rgb.o }];
                } else parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } , opacity: 0 }];

                parentFrame.resize(frame.width,Number(outHeight));
                parentFrame.y = Number(resY);

                addChildObject(0,container.fields,parentFrame);
                addContainerChild(container.innerContainers,parentFrame);

                frame.appendChild(parentFrame);

                if(container.type == "horizontalContainer")  {
                    parentFrame.layoutSizingHorizontal = "HUG";
                    parentFrame.layoutSizingVertical = "HUG";
                    }
                    else if(container.type == "verticalContainer") {
                        parentFrame.layoutSizingHorizontal = "HUG";
                        parentFrame.layoutSizingVertical = "HUG";
                }
            }
        });
    
    }
}

function addLblProps(properties: Props[] | CompProps[], label: TextNode) {
    var w = 120;
    var h = 20;
    var lblFill = "";
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                if(value.includes("Parent.")) label.x = 10;
                else label.x = isNaN(Number(getNumValue(value,"X"))) ? 0 : Number(getNumValue(value,"X"));
                break;
            }
            case "Y" : {
                label.y = isNaN(Number(getNumValue(value,"Y"))) ? 0 : Number(getNumValue(value,"Y"));
                break;
            }
            case "Width" : {
                const wdth = getNumValue(value,"Width");
                w = wdth == 0 || wdth < 0 || isNaN(wdth) ? 120 : wdth;
                break;
            }
            case "Height" : {
                if(value.includes("Parent.")) h = 100;
                else h = isNaN(Number(getNumValue(value,"Height"))) ? 100 : Number(getNumValue(value,"Height"));
                break;
            }
            case "Text" : {
                const val = value.replace('"','').replace('"','');
                label.characters = val;
                break;
            }
            case "Size" : {
                const sz = getNumValue(value,"Size");
                label.fontSize = sz == 0 || isNaN(sz) ? 16 : Number(sz);
                break;
            }
            case "Color" : {
                lblFill = getColorValue(value,"Fill");
                break;
            }
            case "Align" : {
                if(value.includes("Left")) label.textAlignHorizontal = "LEFT";
                if(value.includes("Center")) label.textAlignHorizontal = "CENTER";
                if(value.includes("Right")) label.textAlignHorizontal = "RIGHT";
                break;
            }
            case "Visible": {
                label.visible = value === 'true' ? true : false;
                break;
            }
            case "PaddingTop":
            case "PaddingRight":
            case "PaddingBottom":
            case "PaddingLeft": {
                const par = getNumValue(value,"PaddingTop");
                label.paragraphSpacing = isNaN(par) ? 0 : par;
                break;
            }
            case "Underline": {
                label.textDecoration = value === 'true' ? "UNDERLINE" : "NONE";
                break;
            }
        }
    });
    if(label.x < 0) label.x = 0;

    label.resize(Number(w),Number(h));
    
    if(lblFill != "") {
        var rgba = lblFill;
        var {r,g,b} = rgbaToRgb(rgba);
        label.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
    }
}
function addRectangleProps(properties: Props[] | CompProps[], rectangle: RectangleNode) {
    var w = 120;
    var h = 1;
    var borderStyle = "None";
    var borderColor = "";
    var borderThickness = 0;
    var percent = 0;
    var fillHex = "";
    var rectFill = "";

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                rectangle.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                const y = getNumValue(value,"Y");
                rectangle.y = isNaN(y) ? 0 : y;
                break;
            }
            case "Width" : {
                if(value.includes("Parent.")) w = 100;
                else w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "BorderThickness": {
                borderThickness = getNumValue(value,"BorderThickness");
                break;
            }
            case "BorderStyle": {
                borderStyle = value.split(".")[1];
                break;
            }
            case "BorderColor": {
                if(value.includes("ColorFade")) {
                    const fade = value.substring(value.indexOf('('),value.indexOf(')')).substring(1);
                    percent = Number(fade.split(",")[1].trim().replace("%","").replace("-",""));
                    borderColor = fade.split(',')[0].trim();
                } else {
                    borderColor = value;
                }
                break;
            }
            case "Fill" : {
                rectFill = getColorValue(value,"Fill");
                break;
            }
            case "HtmlText":{
                const div = prop.value.substring(prop.value.indexOf('<div'),prop.value.indexOf('</div>')).concat('</div>');
                const back_color = div.substring(div.indexOf('background-color'));
                const parsed = back_color.substring(back_color.indexOf(':'),back_color.indexOf(';'));
                const hex = parsed.substring(1);
                const rgb = hexToRgb(hex);
                rectangle.fills = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
                break;
            }
            case "Visible": {
                rectangle.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    if(h == 0) {
        rectangle.resize(w,80);
    } else if(w == 0) {
        rectangle.resize(120,h);
    } else rectangle.resize(w,h);

    if(rectFill != "") {
        var rgba = rectFill;
        var {r,g,b} = rgbaToRgb(rgba);
        fillHex = rgbToHex(r*255,g*255,b*255);

        rectangle.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
    }

    if(borderStyle != "None") {
        if(borderColor == "Self.Fill") {
            const borderHex = percent != 0 ? shadeColor(fillHex,percent) : fillHex;
            const rgb =  hexToRgb(borderHex);
            rectangle.strokes = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
        } else {
            var {r,g,b} = rgbaToRgb(borderColor);
            rectangle.strokes = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
        }
        rectangle.strokeWeight = borderThickness;
    }
}
function addIconProps(properties: Props[] | CompProps[],frame: FrameNode | ComponentNode,yValue: number) {
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var rgba = "";
    var iconName = "";
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                x = getNumValue(value,"X");
                if(isNaN(x)) x = 0;
                break;
            }
            case "Y" : {
                y = getNumValue(value,"Y");
                if(isNaN(y)) y = 0;
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(w)) {
                    w = 20;
                }
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                if(h == 0 || isNaN(h)) {
                    h = 20;
                }
                break;
            }
            case "Color" : {
                rgba = getColorValue(value,"Fill");
                break;
            }
            case "Icon" : {
                iconName = value.split(".")[1];
                break;
            }
        }
    });
    if(yValue > 0 ) y = y + yValue;
    showIcon(iconName,iconName,x,y,w,h,rgba,frame,true);
}
function addImage(name: string,properties: Props[] | CompProps[], frame: FrameNode | ComponentNode,yValue: number) {
    var imageLink = "";
    var svg = "";
    var x = 0;
    var y = 0;
    var w = 0;
    var h = 0;
    var radius = 0;
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Image" : {
                if(prop.value.includes("data:image/svg+xml")) {
                    svg =prop.value.substring(prop.value.indexOf('"<svg'),prop.value.indexOf('</svg>")')).substring(1).concat("</svg>");
                } else {
                    imageLink = value.replace('"','').replace('"','');
                }
                break;
            }
            case "RadiusBottomLeft" :
            case "RadiusBottomRight" :
            case "RadiusTopLeft" :
            case "RadiusTopRight" : {
                radius = Number(value);
                break;
            }
        }
    });
    if(imageLink != "") {
        if(imageLink.includes("http://") || imageLink.includes("https://")) {
            figma.createImageAsync(imageLink).then(async (image: Image) => {
                const parentFrame = figma.createFrame();
                parentFrame.name = "img_" + name;
                parentFrame.cornerRadius = 10;
                parentFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 },opacity: 0 }];
                parentFrame.x = x;
                parentFrame.y = y;
                parentFrame.layoutMode = 'VERTICAL';
                parentFrame.counterAxisAlignItems = 'CENTER';
    
                const node = figma.createRectangle();
                node.name = name;
                node.resize(Number(w),Number(h))
                node.cornerRadius = radius;
        
                node.fills = [{
                    type: 'IMAGE',
                    imageHash: image.hash,
                    scaleMode: 'FIT'
                }];
                if(yValue > 0) node.y = node.y + yValue;
                
                const text = figma.createText();
                text.name = "img_link";
                text.characters = imageLink;
                text.visible = false;
                text.textAlignHorizontal = "LEFT";
                text.textAlignVertical = "CENTER";
    
                parentFrame.appendChild(node);
                parentFrame.appendChild(text);
                frame.appendChild(parentFrame);
    
                parentFrame.layoutSizingVertical = "HUG";
                parentFrame.layoutSizingHorizontal = "HUG";
            });
        } else {
            figma.notify("Wrong Image imported! Only hyperlink supported");
        }
        return;
    }
    if(svg != "") {
        const node = figma.createNodeFromSvg(svg);
        node.x = x;
        node.y = y;
        node.name = "svg_" + name;
        node.resize(w,h);
        frame.appendChild(node);
    }
}
function addButtonProps(parentFrame: FrameNode, text: TextNode,properties: Props[] | CompProps[]) {
    var w = 100;
    var h = 60;
    var borderStyle = "None";
    var borderColor = "";
    var percent = 0;
    var borderThickness = 0;
    var fillHex = "";

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(Number(x)) ? 0 : x;
                break;
            }
            case "Y" : {
                const y = getNumValue(value,"Y");
                parentFrame.y = isNaN(y) ? 0 : y;
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(w)) {
                    w = 100;
                }
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                if(h == 0 || isNaN(h)) {
                    h = 60;
                }
                break;
            }
            case "BorderThickness": {
                borderThickness = getNumValue(value,"BorderThickness");
                break;
            }
            case "BorderStyle": {
                borderStyle = value.split(".")[1];
                break;
            }
            case "BorderColor": {
                if(value.includes("ColorFade")) {
                    const fade = value.substring(value.indexOf('('),value.indexOf(')')).substring(1);
                    percent = Number(fade.split(",")[1].trim().replace("%","").replace("-",""));
                    borderColor = fade.split(',')[0].trim();
                } else {
                    borderColor = value;
                }
                break;
            }
            case "Text" : {
                text.characters = value.replace('"','').replace('"','');
                break;
            }
            case "RadiusBottomLeft" :
            case "RadiusBottomRight" :
            case "RadiusTopLeft" :
            case "RadiusTopRight" : {
                parentFrame.cornerRadius = getNumValue(value,"RadiusBottomLeft");
                break;
            }
            case "Size": {
                const sz = getNumValue(value,"Size");
                text.fontSize = sz == 0 || isNaN(sz) ? 16 : Number(sz);
                break;
            }
            case "Color": {
                const rgba = getColorValue(value,"Fill");
                const color = rgbaToRgbWithOpacity(rgba);
                text.fills = [{ type: 'SOLID', color : {r: Number(color.r) , g: Number(color.g) , b: Number(color.b)},opacity: color.o}];
                break;
            }
            case "Fill" : {
                if(prop.value.includes("If(")) {
                    const valF = prop.value.split("RGBA")[1].slice(0,-1);
                    const {r,g,b} = rgbaToRgbWithOpacity("RGBA"+valF);
                    parentFrame.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                    
                } else {
                    if(prop.value.includes("ColorValue")) break;
                    const rgba = getColorValue(value,"Fill");
                    const {r,g,b} = rgbaToRgbWithOpacity(rgba);
                    parentFrame.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                }
                break;
            }
        }
    });
    if(borderStyle != "None") {
        if(borderColor == "Self.Fill") {
            const borderHex = percent != 0 ? shadeColor(fillHex,percent) : fillHex;
            const rgb =  hexToRgb(borderHex);
            parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
        } else {
            var {r,g,b} = rgbaToRgb(borderColor);
            parentFrame.strokes = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
        }
        parentFrame.strokeWeight = borderThickness;
    }
    text.resize(w,h/2);
    parentFrame.resize(w,h);
}
function addTextProps(parentFrame: FrameNode, text: TextNode, properties: Props[] | CompProps[]) {
    var w = 100;
    var h = 50;
    var border = "";
    var color = "";
    var fill = "";
    var percent = 0;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(x) ? 0 : x;
                break;
            }
            case "Y" : {
                const y = getNumValue(value,"Y");
                parentFrame.y = isNaN(y) ? 0 : y;
                break;
            }
            case "Width" : {
                w = Number(getNumValue(value,"Width"));
                if(w == 0 || isNaN(w)) {
                    w = 100;
                }
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                if(h == 0 || isNaN(h)) {
                    h = 50;
                }
                break;
            }
            case "Size": {
                const sz = getNumValue(value,"Size");
                text.fontSize = sz == 0 || isNaN(sz) ? 16 : Number(sz);
                break;
            }
            case "BorderColor": {
                if(value.includes("ColorFade")) {
                    const fade = value.substring(value.indexOf('('),value.indexOf(')')).substring(1);
                    percent = Number(fade.split(",")[1].trim().replace("%","").replace("-",""));
                    border = fade.split(',')[0].trim();
                } else {
                    border = value;
                }
            }
            case "Color": {
                color = getColorValue(value,"Fill");
                break;
            }
            case "Fill": {
                fill = getColorValue(value,"Fill");
                break;
            }
            case "Default":
            case "Text": {
                text.characters = value.replace('"','').replace('"','');
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
            case "Underline": {
                text.textDecoration = value === 'true' ? "UNDERLINE" : "NONE";
                break;
            }
        }
    });
    if(text.characters == "") text.characters = "insert text...";
    if(w == 0 || w < 0) w = 150;
    text.resize(w-10,h/2);
    parentFrame.resize(w,h);

    const textColor = hexToRgb("#000000");
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g:  Number(textColor?.g), b:  Number(textColor?.b) } }]; 
    
    const fillColor = fill == "" ? hexToRgb("#F6F6F7") : rgbaToRgb(fill);
    parentFrame.fills = [{ type: 'SOLID', color: { r: Number(fillColor?.r), g:  Number(fillColor?.g), b:  Number(fillColor?.b) } }]; 
    
    if(border != "") {
        if(border == "Self.Fill") {
            const borderHex = percent != 0 ? shadeColor(fill,percent) : fill;
            const rgb =  hexToRgb(borderHex);
            parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
        } else {
            if(border.includes("If(")){
                const defaultBorder = hexToRgb("#000000");
                parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(defaultBorder?.r), g: Number(defaultBorder?.g), b: Number(defaultBorder?.b) } }];
                return;
            }
            if(border.includes("RGBA")) {
                var {r,g,b} = rgbaToRgb(border);
                parentFrame.strokes = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
            } else {
                parentFrame.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            }
        } 
    }
}
function addBoxProps(parentFrame: FrameNode, text: TextNode, properties: Props[] | CompProps[],chars: string) {
    var w = 100;
    var h = 60;
    var chevronFill = "";
    var chevronBack = "";
    var border = "";
    var color = "";
    var fill = "";
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(Number(x)) ? 0 : Number(x);
                break;
            }
            case "Y" : {
                const valY = getNumValue(value,"Y");
                parentFrame.y = isNaN(Number(valY)) ? 0 : Number(valY);
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(Number(w))) {
                    w = 100;
                }
                break;
            }
            case "Height" : {
                h = Number(getNumValue(value,"Height"));
                if(h == 0 || isNaN(Number(h))) {
                    h = 20;
                }
                break;
            }
            case "Size": {
                const sz = getNumValue(value,"Size");
                text.fontSize = sz == 0 || isNaN(sz) ? 16 : Number(sz);
                break;
            }
            case "BorderColor": {
                border = getColorValue(value,"BorderColor");
                break;
            }
            case "Color": {
                color = getColorValue(value,"Fill");
                break;
            }
            case "Fill": {
                fill = getColorValue(value,"Fill");
                break;
            }
            case "ChevronFill": {
                chevronFill = getColorValue(value,"Fill");
                break;
            }
            case "ChevronBackground": {
                chevronBack = getColorValue(value,"Fill");
                break;
            }
        }
    });

    text.resize(Number(w)-57,Number(h)/2);
    text.characters = chars;
    parentFrame.resize(Number(w),Number(h));

    parentFrame.appendChild(text);

    const textColor = color == "" ? hexToRgb("#000000") : rgbaToRgb(color);
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g:  Number(textColor?.g), b:  Number(textColor?.b) } }]; 
    text.layoutSizingHorizontal = "FILL";
    
    const fillColor = fill == "" ? hexToRgb("#F6F6F7") : rgbaToRgb(fill);
    parentFrame.fills = [{ type: 'SOLID', color: { r: Number(fillColor?.r), g:  Number(fillColor?.g), b:  Number(fillColor?.b) } }]; 

    const borderColor = border == "" || border.includes("If(") ? hexToRgb("#000000") : rgbaToRgb(border);
    parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(borderColor?.r), g:  Number(borderColor?.g), b:  Number(borderColor?.b) } }]; 


    const chevronF = chevronFill == "" ? hexToRGBA("#3860B2",1) : chevronFill;
    const chevronB = chevronBack == "" ? hexToRgb("#3860B2") : rgbaToRgb(chevronBack);

    const iconFrame = figma.createFrame();
    iconFrame.name = "iconFrame";
    iconFrame.layoutMode = 'HORIZONTAL';
    iconFrame.counterAxisAlignItems = 'CENTER';
    iconFrame.horizontalPadding = 10;

    iconFrame.fills = [{ type: 'SOLID', color: { r: Number(chevronB?.r), g:  Number(chevronB?.g), b:  Number(chevronB?.b) } }];

    showIcon("down","Down",text.x + text.width,parentFrame.y/2,32,32,chevronF,iconFrame,true);

    parentFrame.appendChild(iconFrame);

}
function addCircleProps(properties: Props[] | CompProps[], circle: EllipseNode) {
    var w = 60;
    var h = 60;
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                circle.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                circle.y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Fill" : {
                if(value.includes("If") || prop.value.includes("If")) break;
                
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);
                circle.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Visible": {
                circle.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    circle.resize(w,h);
}
function addCheckProps(parentFrame: FrameNode, text: TextNode,rectangle: RectangleNode, properties: Props[] | CompProps[]) {
    var w = 60;
    var h = 60;
    var borderStyle = "None";
    var borderColor = "";
    var percent = 0;
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(Number(x)) ? 0 : Number(x);
                break;
            }
            case "Y" : {
                const valY = getNumValue(value,"Y");
                parentFrame.y = isNaN(Number(valY)) ? 0 : Number(valY);
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(Number(w))) {
                    w = 60;
                }
                break;
            }
            case "Height" : {
                h = Number(getNumValue(value,"Height"));
                if(h == 0 || isNaN(Number(h))) {
                    h = 60;
                }
                break;
            }
            case "BorderStyle": {
                borderStyle = value.split(".")[1];
                break;
            }
            case "CheckboxBorderColor": {
                if(value.includes("ColorFade")) {
                    const fade = value.substring(value.indexOf('('),value.indexOf(')')).substring(1);
                    percent = Number(fade.split(",")[1].trim().replace("%","").replace("-",""));
                    borderColor = fade.split(',')[0].trim();
                } else {
                    borderColor = value;
                }
                break;
            }
            case "CheckboxBackgroundFill": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);
                rectangle.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
            }
            case "Color" : {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);
                text.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Text" : {
                text.characters = value.replace('"','').replace('"','');
                break;
            }
            case "Size" : {
                text.fontSize = getNumValue(value,"Size");
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    text.resize(w,h/2);
    parentFrame.resize(w,h);

    if(borderStyle != "None") {
        var {r,g,b} = rgbaToRgb(borderColor);
        rectangle.strokes = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
        rectangle.strokeWeight = 2;
    }
}
function addRadioProps(properties: Props[] | CompProps[],name: string,frame: FrameNode | ComponentNode,yValue: number) {
    const items = properties.find(function(item){
        return item.key == "Items";
    });

    const splitter = items?.value.replace("[","").replace("]","").split(",");

    if(splitter != undefined) {
        var x = 0;
        var y = 0;
        var w = 0;
        var h = 0;
        var size = 0;
        var color = "";
        var fill = "";
        var backgroundFill = "";
        var borderFill = {r:-1,g: -1,b: -1, o: -1};

        const parentFrame = figma.createFrame();
        parentFrame.name = "radio_" + name;
        parentFrame.layoutMode = 'VERTICAL';
        parentFrame.counterAxisAlignItems = 'MIN';

        properties.forEach(prop => {
            const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
            switch(prop.key) {
                case "X" : {
                    x = getNumValue(value,"X");
                    break;
                }
                case "Y" : {
                    y = Number(value);
                    break;
                }
                case "Width" : {
                    w = getNumValue(value,"Width");
                    break;
                }
                case "Height" : {
                    h = Number(value);
                    h = h > 100 ? 80 : h;
                    break;
                }
                case "Size" : {
                    size = getNumValue(value,"Size");
                    if(size == 0 || isNaN(size)) size = 15;
                    break;
                }
                case "Color": {
                    color = getColorValue(value,"Fill");
                    break;
                }
                case "RadioBackgroundFill": {
                    backgroundFill = getColorValue(value,"Fill");
                    break;
                }
                case "RadioBorderColor": {
                    borderFill = rgbaToRgbWithOpacity(value);
                    break;
                }
                case "Fill": {
                    fill = value;
                    break;
                }
            }
        });
        
        parentFrame.x = x;
        parentFrame.y = y;
        
        for (let k = 0; k < splitter?.length; k++) {
            const valueFrame = figma.createFrame();
            const val = splitter[k].replace('\"','').replace('\"','').replace('=','');
            valueFrame.name = "value_" + val;
            
            const circle = figma.createEllipse();
            circle.resize(60,60);
            
            if(backgroundFill != "") {
                const radioFill = rgbaToRgbWithOpacity(backgroundFill);
                circle.fills = [{ type: 'SOLID', color: { r: Number(radioFill.r), g:  Number(radioFill.g), b:  Number(radioFill.b) },opacity: radioFill.o }]; 
            }
            
            if(borderFill.r != -1) {
                circle.strokes = [{ type: 'SOLID', color: { r: Number(borderFill.r), g:  Number(borderFill.g), b:  Number(borderFill.b) },opacity: borderFill.o }]; 
            }

            const text = figma.createText();
            text.textAlignHorizontal = "LEFT";
            text.textAlignVertical = "CENTER";
            text.characters = val;

            if(size > 0) text.fontSize = size;
            
            text.resize(w,h/2);

            valueFrame.resize(w,h);

            valueFrame.layoutMode = 'HORIZONTAL';
            valueFrame.counterAxisAlignItems = 'CENTER';
            valueFrame.itemSpacing = 10;
        
            valueFrame.appendChild(circle);
            valueFrame.appendChild(text);

            const textColor = color == "" ? hexToRgb("#000000") : rgbaToRgb(color);
            text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g:  Number(textColor?.g), b:  Number(textColor?.b) } }]; 
            
            if(fill == "") {
                valueFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b:  0 },opacity: 0 }]; 
            } else {
                const fillColor = rgbaToRgbWithOpacity(fill);
                valueFrame.fills = [{ type: 'SOLID', color: { r: Number(fillColor?.r), g:  Number(fillColor?.g), b:  Number(fillColor?.b) },opacity: fillColor.o }]; 
            }
            parentFrame.appendChild(valueFrame);
        }
        if(yValue > 0) parentFrame.y = parentFrame.y + yValue;
        frame.appendChild(parentFrame);

        parentFrame.layoutSizingHorizontal = 'HUG';
    }    
}
function addToggleProps(parentFrame: FrameNode,properties: Props[] | CompProps[], rectangle: RectangleNode, circle: EllipseNode,text: TextNode) {
    var w = 160;
    var h = 50;
    var color = "";
    var handleFill = "";
    var falseFill = "";
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                parentFrame.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                parentFrame.y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Color": {
                color = getColorValue(value,"Fill");
                break;
            }
            case "HandleFill": {
                handleFill = getColorValue(value,"Fill");
                break;
            }
            case "FalseFill": {
                falseFill = getColorValue(value,"Fill");
                break;
            }
            case "FalseText" : {
                text.characters = value.replace('"','').replace('"','');
                break;
            }
            case "Size" : {
                text.fontSize = getNumValue(value,"Size");
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    parentFrame.resize(w,h+ 10);

    circle.x = rectangle.x + 10;
    circle.y = rectangle.y + 9;

    const handleColor = handleFill == "" ? hexToRgb("#FFFFFF") : rgbaToRgb(handleFill);
    circle.fills = [{ type: 'SOLID', color: { r: Number(handleColor?.r), g: Number(handleColor?.g), b: Number(handleColor?.b) }}];

    text.x = rectangle.x + rectangle.width + 15;
    text.y = rectangle.y + rectangle.height/4;
    text.resize(w/2,h/2);

    const textColor = color == "" ? hexToRgb("#000000") : rgbaToRgb(color);
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g:  Number(textColor?.g), b:  Number(textColor?.b) } }]; 

    const fillColor = falseFill == "" ? hexToRgb("#F6F6F7") : rgbaToRgb(falseFill);
    rectangle.fills = [{ type: 'SOLID', color: { r: Number(fillColor?.r), g:  Number(fillColor?.g), b:  Number(fillColor?.b) } }]; 
}
function addListProps(parentFrame: FrameNode, properties: Props[] | CompProps[], rectangle: RectangleNode, text1: TextNode, text2: TextNode,text3: TextNode) {
    var w = 200;
    var h = 200;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                parentFrame.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                parentFrame.y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Color": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);

                text2.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                text3.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Fill": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);

                parentFrame.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "SelectionColor": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);

                text1.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "SelectionFill": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);

                rectangle.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Size" : {
                text1.fontSize = getNumValue(value,"Size");
                text2.fontSize = getNumValue(value,"Size");
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    parentFrame.resize(w,h);

    rectangle.resize(w,65);
    text1.x = rectangle.x + 12;
    text1.y = rectangle.y + rectangle.height/3;

    text2.x = rectangle.x + 10;
    text2.y = rectangle.y + rectangle.height + 20;
}
function addDatePickerProps(parentFrame: FrameNode, text: TextNode, properties: Props[] | CompProps[]) {
    var w = 100;
    var h = 60;
    var fillHex = "";
    var iconFill = "";
    var iconBack = "";
    var borderColor = "";
    var borderThickness = 0;
    var percent = 0;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(Number(x)) ? 0 : Number(x);
                break;
            }
            case "Y" : {
                const valY = getNumValue(value,"Y");
                parentFrame.y = isNaN(Number(valY)) ? 0 : Number(valY);
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(Number(w))) {
                    w = 100;
                }
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                if(h == 0 || isNaN(Number(h))) {
                    h = 60;
                }
                break;
            }
            case "BorderThickness": {
                borderThickness = getNumValue(value,"BorderThickness");
                break;
            }
            case "BorderColor": {
                if(value.includes("ColorFade")) {
                    const fade = value.substring(value.indexOf('('),value.indexOf(')')).substring(1);
                    percent = Number(fade.split(",")[1].trim().replace("%","").replace("-",""));
                    borderColor = fade.split(',')[0].trim();
                } else if(value.includes("App.Theme")) {
                    borderColor = "RGBA(14,108,189,1)";
                } 
                else {
                    borderColor = value;
                }
                break;
            }
            case "Fill": {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);
                fillHex = rgbToHex(r*255,g*255,b*255);
                parentFrame.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
            }
            case "IconFill": {
                iconFill = getColorValue(value,"Fill");
                break;
            }
            case "IconBackground": {
                iconBack = getColorValue(value,"Fill");
                break;
            }
            case "Size" : {
                text.fontSize = getNumValue(value,"Size");
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    parentFrame.resize(w,h);
    text.resize(w - 57, h/2);
    text.x = 10;
    text.y = parentFrame.height/2;

    parentFrame.appendChild(text);

    const iconF = iconFill == "" ? hexToRGBA("#ffffff",1) : iconFill;
    const iconB = iconBack == "" ? hexToRgb("#3860B2") : rgbaToRgb(iconBack);

    const iconFrame = figma.createFrame();
    iconFrame.name = "iconFrame";
    iconFrame.layoutMode = 'HORIZONTAL';
    iconFrame.counterAxisAlignItems = 'CENTER';
    iconFrame.horizontalPadding = 10;
    iconFrame.fills = [{ type: 'SOLID', color: { r: Number(iconB?.r), g:  Number(iconB?.g), b:  Number(iconB?.b) } }];

    showIcon("calendar","CalendarBlank",text.x + text.width,parentFrame.y/2,32,32,iconF,iconFrame,true);

    parentFrame.appendChild(iconFrame);

    if(borderColor != "") {
        if(borderColor == "Self.Fill") {
            const borderHex = percent != 0 ? shadeColor(fillHex,percent) : fillHex;
            const rgb =  hexToRgb(borderHex);
            parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
        } else {
            if(borderColor.includes("If(")){
                const defaultBorder = hexToRgb("#000000");
                parentFrame.strokes = [{ type: 'SOLID', color: { r: Number(defaultBorder?.r), g: Number(defaultBorder?.g), b: Number(defaultBorder?.b) } }];
                return;
            }
            var {r,g,b} = rgbaToRgb(borderColor);
            parentFrame.strokes = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
        }
        parentFrame.strokeWeight = borderThickness;
    }
}
function addSliderProps(parentFrame: FrameNode, rectangle: RectangleNode, circle: EllipseNode, properties: Props[] | CompProps[]) {
    var w = 100;
    var h = 60;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                parentFrame.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                parentFrame.y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    parentFrame.resize(w,h);

    rectangle.resize(w,25);
    rectangle.y = h/3;
    circle.x = rectangle.x + rectangle.width/2;
    circle.y = h/4 - 1;
}
function addRatingProps(parentFrame: FrameNode,rgba: string,properties: Props[] | CompProps[]) {
    var w = 100;
    var h = 60;
    var numberStar = 1;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                parentFrame.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                parentFrame.y = getNumValue(value,"Y");
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                break;
            }
            case "Height" : {
                h = getNumValue(value,"Height");
                break;
            }
            case "Default" : {
                numberStar = Number(value);
            }
            case "Visible": {
                parentFrame.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
    parentFrame.resize(w,h);
    var x = 0;
    for (let index = 0; index < numberStar; index++) {
        showIcon("star","Star",x,5,60,60,rgba,parentFrame,true);
        x = x + 65;
    }
}
function addPolyProps(polygon: PolygonNode, properties: Props[] | CompProps[]) {
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                polygon.x = isNaN(Number(getNumValue(value,"X"))) ? 0 : Number(getNumValue(value,"X"));
                break;
            }
            case "Y" : {
                polygon.y = isNaN(Number(getNumValue(value,"Y"))) ? 0 : Number(getNumValue(value,"Y"));
                break;
            }
            case "Fill" : {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgbWithOpacity(rgba);
                polygon.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Visible": {
                polygon.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
}
function addStarProps(star: StarNode, properties: Props[] | CompProps[]) {
    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                star.x = getNumValue(value,"X");
                break;
            }
            case "Y" : {
                star.y = getNumValue(value,"Y");
                break;
            }
            case "Fill" : {
                var rgba = getColorValue(value,"Fill");
                var {r,g,b} = rgbaToRgb(rgba);
                star.fills = [{ type: 'SOLID', color: { r: r, g: g, b: b } }];
                break;
            }
            case "Visible": {
                star.visible = value === 'true' ? true : false;
                break;
            }
        }
    });
}
function addHTMLProps(properties: Props[] | CompProps[], rectangle: RectangleNode,frame: FrameNode | ComponentNode,name: string) {
    var textValue = "";
    var width = 120;
    var height = 80;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                rectangle.x = isNaN(Number(getNumValue(value,"X"))) ? 0 : Number(getNumValue(value,"X"));
                break;
            }
            case "Y" : {
                rectangle.y = isNaN(Number(getNumValue(value,"Y"))) ? 0 : Number(getNumValue(value,"Y"));
                break;
            }
            case "HtmlText":{
                const div = prop.value.substring(prop.value.indexOf('<div'),prop.value.indexOf('</div>')).concat('</div>');
                if(div.includes("background:")) {
                    const background = div.substring(div.indexOf('background'));
                    var parsedBack = background.includes(";") ? background.substring(background.indexOf(':'),background.indexOf(';')) : background.substring(background.indexOf(':'),background.indexOf("'"));
                    
                    if(parsedBack.includes("linear-gradient")) {
                        const gradientLeft = parsedBack.substring(parsedBack.indexOf('('),parsedBack.indexOf(',')).substring(1);
                        const gradientRight = parsedBack.substring(parsedBack.indexOf(','),parsedBack.indexOf(')')).substring(2);
                        
                        const rgbLeft = threeHexToRGB(gradientLeft);
                        const rgbRight = threeHexToRGB(gradientRight);
                        
                        
                        rectangle.fills = [{type: "GRADIENT_LINEAR",
                            gradientTransform: [[0,1,0],[0.5,1,0]],
                            gradientStops: [
                                {position: 0, color: {r: Number(rgbLeft?.r)/255, g: Number(rgbLeft?.g)/255, b: Number(rgbLeft?.b)/255, a: 1}},
                                {position: 1, color: {r: Number(rgbRight?.r)/255, g: Number(rgbRight?.g)/255, b: Number(rgbRight?.b)/255, a: 1}}
                            ]}]
                        } else {
                            const hexBack = parsedBack.substring(1);
                            const rgbBack = hexToRgb(hexBack);
                            if(!isNaN(Number(rgbBack?.r)))
                            rectangle.fills = [{ type: 'SOLID', color: { r: Number(rgbBack?.r), g: Number(rgbBack?.g), b: Number(rgbBack?.b) } }];
                        }
                    } else if(div.includes("background-color:")){
                        const back_color = div.substring(div.indexOf('background-color'));
                        var parsed = back_color.substring(back_color.indexOf(':'),back_color.indexOf(';'));
                        const hex = parsed.substring(1);
                    
                    if(hex.length == 4) {
                        const outRGB = threeHexToRGB(hex);
                        rectangle.fills = [{ type: 'SOLID', color: { r: Number(outRGB?.r)/255, g: Number(outRGB?.g)/255, b: Number(outRGB?.b)/255 } }];
                    } else if(hex.includes("&If")) {
                        if(!hex.includes("Value(")) {
                            const parseIf = hex.split(",");
                            const hexParsed = "#" + parseIf[1].replaceAll('"','');
                            const rgb = hexToRgb(hexParsed);
                            if(!isNaN(Number(rgb?.r)))
                                rectangle.fills = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
                        }
                    } else if(hex.includes('"&')) {
                        rectangle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                    } else {
                        const rgb = hexToRgb(hex);
                        if(!isNaN(Number(rgb?.r)))
                        rectangle.fills = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
                    }
                }
                
                if(div.includes("border-color:")) {
                    const border_color = div.substring(div.indexOf('border-color'));
                    var parsed = border_color.substring(border_color.indexOf(':'),border_color.indexOf(';'));
                    const hex = parsed.substring(1);
                    const rgb = hexToRgb(hex);
                    if(!isNaN(Number(rgb?.r)))
                    rectangle.strokes = [{ type: 'SOLID', color: { r: Number(rgb?.r), g: Number(rgb?.g), b: Number(rgb?.b) } }];
                }

                if(div.includes("width:")) {
                    const w_parse = div.substring(div.indexOf('width'));
                    parsed = w_parse.substring(w_parse.indexOf(':'),w_parse.indexOf(';'));
                    if(parsed.includes("Self.Width")) {
                    const widthProp = properties.find(prop=> prop.key == "Width");
                    const out = widthProp?.value.split("=")[1];
                    width = out != undefined ? Number(out) : 120;
                    } else if(parsed.includes('"&')) {
                        width = 120;
                    } else {
                        width = Number(parsed.substring(1).replace('px',''));
                    }
                }

                if(div.includes("height:")) {
                    const h_parse = div.substring(div.indexOf('height'));
                    parsed = h_parse.substring(h_parse.indexOf(':'),h_parse.indexOf(';'));

                    if(parsed.includes('"&')) {
                        height = 120;
                    } else {
                        height = Number(parsed.substring(1).replace('px',''));
                    }
                }
                rectangle.resize(Number(width),Number(height));

                textValue = prop.value.substring(prop.value.indexOf(">")).replace('</div>"',"").substring(1);

                break;
            }
        }
    });
    frame.appendChild(rectangle);
    if(textValue != ""|| textValue != undefined) {
        const text = figma.createText();
        text.name = "lbl_" + name;
        text.x = rectangle.x;
        text.y = rectangle.y;
        text.resize(Number(width),Number(height));
        text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        text.textAlignHorizontal = "CENTER";
        text.textAlignVertical = "CENTER";
        text.characters = textValue;
        frame.appendChild(text);
    }
}
function addContainerProps(properties: Props[], parentFrame: FrameNode) {
    var w = 100;
    var h = 100;

    properties.forEach(prop => {
        const value = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        switch(prop.key) {
            case "X" : {
                const x = getNumValue(value,"X");
                parentFrame.x = isNaN(Number(x)) ? 0 : Number(x);
                break;
            }
            case "Y" : {
                const valY = getNumValue(value,"Y");
                parentFrame.y = isNaN(Number(valY)) ? 0 : Number(valY);
                break;
            }
            case "Width" : {
                w = getNumValue(value,"Width");
                if(w == 0 || isNaN(Number(w))) {
                    w = 100;
                }
                break;
            }
            case "Height" : {
                h = Number(getNumValue(value,"Height"));
                if(h == 0 || isNaN(Number(h))) {
                    h = 160;
                }
                break;
            }
        }
    });
    parentFrame.resize(w, h);
}
function getNumValue(value: string,prop: string) {
    if(Number.isNaN(Number(value)) && screenVal != undefined && value != "") {
        const valFromThis = getValue(screenVal,value);
        if(valFromThis != "" && Number.isNaN(Number(valFromThis)) == false && valFromThis != undefined) {
            return Number.isNaN(Number(valFromThis)) ? Number(valFromThis) : valFromThis as number;
        }
        const valFromAll = findPropertyValueFromScreens(saver,value,prop);
        if(valFromAll != "") {
            const valFromSaver = valFromAll.includes("=") ? valFromAll.split("=")[1].replace("'","") : valFromAll;
            return Number(valFromSaver);
        }
    }
    
    return Number(value);
}

function getColorValue(value: string, prop: string) {
    if(value.includes("App.Theme")) {
        return "RGBA(14,108,189,1)";
    }
    if(value.includes("RGBA")) {
        return value;
    } else if(screenVal != undefined) {
        const val = findPropertyValuebyName(screenVal,value,prop);
        if(val != "") {
            return val.includes("=") ? val.split("=")[1].replace("'",""): val;
        } else {
            const val = findPropertyValueFromScreens(saver,value,prop);
            return val.includes("=") ? val.split("=")[1].replace("'",""): val;
        }
    } else {
        return "RGBA(255,255,255,1)";
    }
}