import { hexToRgb } from "../../util/colorUtil";
import { findLastX } from "../../util/utils";
import { addFontFrame } from "../ModelDriven/importers/driven-design-importer";

export function addProjectTemplate() {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#34306D");
    const imgColor = hexToRgb("#CCCCCC");

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "Project documentation";
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 40;
    frame.horizontalPadding = 50;
    frame.verticalPadding = 50;

    const headerFrame = figma.createFrame();
    headerFrame.name = "Header";
    headerFrame.cornerRadius = 5;
    headerFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    headerFrame.layoutMode = 'HORIZONTAL';
    headerFrame.counterAxisAlignItems = 'MIN';
    headerFrame.itemSpacing = 20;
    headerFrame.resize(1400,30);

    const headertitle = figma.createText();
    headertitle.characters = "<project_title>"
    headertitle.name = "Project Title";
    headertitle.fontSize = 32;
    headertitle.fontName = { family: "Inter", style: "Bold" };
    headertitle.resize(1400,50);
    headertitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const headerVersion = figma.createText();
    headerVersion.characters = "<version>"
    headerVersion.name = "Version";
    headerVersion.fontSize = 25;
    headerVersion.resize(500,30);
    headerVersion.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    headerFrame.appendChild(headertitle);
    headerFrame.appendChild(headerVersion);

    const descriptionFrame = figma.createFrame();
    descriptionFrame.name = "Project Description";
    descriptionFrame.cornerRadius = 5;
    descriptionFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    descriptionFrame.layoutMode = 'VERTICAL';
    descriptionFrame.counterAxisAlignItems = 'MIN';
    descriptionFrame.resize(1400,30);
    descriptionFrame.itemSpacing = 30;

    const dscrtitle = figma.createText();
    dscrtitle.characters = "Project Description"
    dscrtitle.name = "Description Title";
    dscrtitle.fontSize = 32;
    dscrtitle.fontName = { family: "Inter", style: "Bold" };
    dscrtitle.resize(1400,30);
    dscrtitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const dscrvalue = figma.createText();
    dscrvalue.characters = "<project_description>"
    dscrvalue.name = "Description Value";
    dscrvalue.fontSize = 25;
    dscrvalue.resize(1400,200);
    dscrvalue.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    descriptionFrame.appendChild(dscrtitle);
    descriptionFrame.appendChild(dscrvalue);

    const appScreenFrame = figma.createFrame();
    appScreenFrame.name = "App Screen";
    appScreenFrame.cornerRadius = 5;
    appScreenFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    appScreenFrame.layoutMode = 'VERTICAL';
    appScreenFrame.counterAxisAlignItems = 'MIN';
    appScreenFrame.itemSpacing = 30;

    const appScreenTitle = figma.createText();
    appScreenTitle.characters = "Application Screens"
    appScreenTitle.name = "App Screen Title";
    appScreenTitle.fontSize = 32;
    appScreenTitle.fontName = { family: "Inter", style: "Bold" };
    appScreenTitle.resize(1400,50);
    appScreenTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const imageFrame = addImages(background, imgColor);

    appScreenFrame.appendChild(appScreenTitle);
    appScreenFrame.appendChild(imageFrame);

    const dsFrame = figma.createFrame();
    dsFrame.name = "Design System";
    dsFrame.cornerRadius = 5;
    dsFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    dsFrame.layoutMode = 'VERTICAL';
    dsFrame.counterAxisAlignItems = 'MIN';
    dsFrame.itemSpacing = 30;

    const dsTitle = figma.createText();
    dsTitle.characters = "Design System"
    dsTitle.name = "Design System Title";
    dsTitle.fontSize = 32;
    dsTitle.fontName = { family: "Inter", style: "Bold" };
    dsTitle.resize(1400,50);
    dsTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const colourFrame = addColours(background, textColor, imgColor);

    dsFrame.appendChild(dsTitle);
    dsFrame.appendChild(colourFrame);

    const typographyFrame = figma.createFrame();
    typographyFrame.name = "Typography";
    typographyFrame.cornerRadius = 5;
    typographyFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    typographyFrame.layoutMode = 'VERTICAL';
    typographyFrame.counterAxisAlignItems = 'MIN';
    typographyFrame.itemSpacing = 30;

    const typographyTitle = figma.createText();
    typographyTitle.characters = "Typography"
    typographyTitle.name = "Typography Title";
    typographyTitle.fontSize = 32;
    typographyTitle.fontName = { family: "Inter", style: "Bold" };
    typographyTitle.resize(1400,50);
    typographyTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const fontSizeFrame = addFonts(background, textColor);

    typographyFrame.appendChild(typographyTitle);
    typographyFrame.appendChild(fontSizeFrame);

    const imagesFrame = figma.createFrame();
    imagesFrame.name = "Images";
    imagesFrame.cornerRadius = 5;
    imagesFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    imagesFrame.layoutMode = 'VERTICAL';
    imagesFrame.counterAxisAlignItems = 'MIN';
    imagesFrame.itemSpacing = 30;

    const imagesTitle = figma.createText();
    imagesTitle.characters = "Images"
    imagesTitle.name = "Images Title";
    imagesTitle.fontSize = 32;
    imagesTitle.fontName = { family: "Inter", style: "Bold" };
    imagesTitle.resize(1400,50);
    imagesTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const customerImagesFrame = addCustImage(background, imgColor);

    imagesFrame.appendChild(imagesTitle);
    imagesFrame.appendChild(customerImagesFrame);

    frame.appendChild(headerFrame);
    frame.appendChild(descriptionFrame);
    frame.appendChild(appScreenFrame);
    frame.appendChild(dsFrame);
    frame.appendChild(typographyFrame);
    frame.appendChild(imagesFrame);

    headertitle.layoutSizingHorizontal = "FILL";
    headerVersion.layoutSizingHorizontal = "HUG";
    dscrtitle.layoutSizingHorizontal = "FILL";
    dscrvalue.layoutSizingHorizontal = "FILL";
    appScreenTitle.layoutSizingHorizontal = "FILL";
    dsTitle.layoutSizingHorizontal = "FILL";
    typographyTitle.layoutSizingHorizontal = "FILL";
    
    imageFrame.layoutSizingVertical = "HUG";
    
    colourFrame.layoutSizingHorizontal = "FILL";
    colourFrame.layoutSizingVertical = "HUG";

    customerImagesFrame.layoutSizingVertical = "HUG";

    headerFrame.layoutSizingHorizontal = "FILL";
    headerFrame.layoutSizingVertical = "HUG";

    descriptionFrame.layoutSizingHorizontal = "FILL";
    descriptionFrame.layoutSizingVertical = "HUG";

    appScreenFrame.layoutSizingHorizontal = "HUG";
    appScreenFrame.layoutSizingVertical = "HUG";

    dsFrame.layoutSizingHorizontal = "FILL";
    dsFrame.layoutSizingVertical = "HUG";

    typographyFrame.layoutSizingHorizontal = "FILL";
    typographyFrame.layoutSizingVertical = "HUG";

    imagesFrame.layoutSizingHorizontal = "FILL";
    imagesFrame.layoutSizingVertical = "HUG";

    fontSizeFrame.layoutSizingHorizontal = "FILL";
    fontSizeFrame.layoutSizingVertical = "HUG";

    frame.layoutSizingHorizontal = "HUG";
}

function addImages(background: { r: number; g: number; b: number; } | null, imgColor: { r: number; g: number; b: number; } | null) {
    const imageFrame = figma.createFrame();
    imageFrame.name = "Image Frame";
    imageFrame.cornerRadius = 5;
    imageFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    imageFrame.layoutMode = 'HORIZONTAL';
    imageFrame.counterAxisAlignItems = 'MIN';
    imageFrame.layoutWrap = 'WRAP';
    imageFrame.resize(1500, 30);
    imageFrame.itemSpacing = 20;
    imageFrame.counterAxisSpacing = 60;

    const screen1Image = figma.createRectangle();
    screen1Image.name = "Screen Template 1";
    screen1Image.resize(640, 1136);
    screen1Image.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    screen1Image.cornerRadius = 10;

    const screen2Image = figma.createRectangle();
    screen2Image.name = "Screen Template 2";
    screen2Image.resize(640, 1136);
    screen2Image.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    screen2Image.cornerRadius = 10;

    const screen3Image = figma.createRectangle();
    screen3Image.name = "Screen Template 3";
    screen3Image.resize(640, 1136);
    screen3Image.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    screen3Image.cornerRadius = 10;

    const screen4Image = figma.createRectangle();
    screen4Image.name = "Screen Template 4";
    screen4Image.resize(640, 1136);
    screen4Image.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    screen4Image.cornerRadius = 10;

    imageFrame.appendChild(screen1Image);
    imageFrame.appendChild(screen2Image);
    imageFrame.appendChild(screen3Image);
    imageFrame.appendChild(screen4Image);
    return imageFrame;
}

function addColours(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, imgColor: { r: number; g: number; b: number; } | null) {
    const colourFrame = figma.createFrame();
    colourFrame.name = "Colours";
    colourFrame.cornerRadius = 5;
    colourFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    colourFrame.layoutMode = 'VERTICAL';
    colourFrame.counterAxisAlignItems = 'MIN';
    colourFrame.itemSpacing = 30;

    const colourTitle = figma.createText();
    colourTitle.characters = "Colours";
    colourTitle.name = "Colours Title";
    colourTitle.fontSize = 25;
    colourTitle.fontName = { family: "Inter", style: "Bold" };
    colourTitle.resize(1400, 50);
    colourTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const primaryFrame = figma.createFrame();
    primaryFrame.name = "Primary";
    primaryFrame.cornerRadius = 5;
    primaryFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    primaryFrame.layoutMode = 'HORIZONTAL';
    primaryFrame.counterAxisAlignItems = 'MIN';
    primaryFrame.layoutWrap = 'WRAP';
    primaryFrame.itemSpacing = 10;
    primaryFrame.counterAxisSpacing = 10;

    const colour1Frame = figma.createFrame();
    colour1Frame.name = "Primary Colour";
    colour1Frame.cornerRadius = 5;
    colour1Frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    colour1Frame.layoutMode = 'VERTICAL';
    colour1Frame.counterAxisAlignItems = 'MIN';
    colour1Frame.itemSpacing = 0;

    const primaryValue = figma.createRectangle();
    primaryValue.name = "Primary Value";
    primaryValue.resize(253, 160);
    primaryValue.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    primaryValue.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    primaryValue.cornerRadius = 10;

    const primaryBlock = figma.createFrame();
    primaryBlock.name = "Primary Text Block";
    primaryBlock.cornerRadius = 5;
    primaryBlock.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    primaryBlock.layoutMode = 'VERTICAL';
    primaryBlock.counterAxisAlignItems = 'MIN';
    primaryBlock.itemSpacing = 8;
    primaryBlock.verticalPadding = 20;

    const primaryBlockTitle = figma.createText();
    primaryBlockTitle.characters = "<colour_name>";
    primaryBlockTitle.name = "Primary Block Title";
    primaryBlockTitle.fontSize = 20;
    primaryBlockTitle.fontName = { family: "Inter", style: "Bold" };
    primaryBlockTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const separator = figma.createLine();
    separator.strokeWeight = 1;
    separator.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const hexPrimary = figma.createText();
    hexPrimary.characters = "<hex>";
    hexPrimary.name = "Primary HEX Value";
    hexPrimary.fontSize = 20;
    hexPrimary.fontName = { family: "Inter", style: "Bold" };
    hexPrimary.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    primaryBlock.appendChild(primaryBlockTitle);
    primaryBlock.appendChild(separator);
    primaryBlock.appendChild(hexPrimary);

    colour1Frame.appendChild(primaryValue);
    colour1Frame.appendChild(primaryBlock);

    const colour2Frame = figma.createFrame();
    colour2Frame.name = "Secondary Colour";
    colour2Frame.cornerRadius = 5;
    colour2Frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    colour2Frame.layoutMode = 'VERTICAL';
    colour2Frame.counterAxisAlignItems = 'MIN';
    colour2Frame.itemSpacing = 0;

    const secondaryValue = figma.createRectangle();
    secondaryValue.name = "Secondary Value";
    secondaryValue.resize(253, 160);
    secondaryValue.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    secondaryValue.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    secondaryValue.cornerRadius = 10;

    const secondaryBlock = figma.createFrame();
    secondaryBlock.name = "Secondary Text Block";
    secondaryBlock.cornerRadius = 5;
    secondaryBlock.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    secondaryBlock.layoutMode = 'VERTICAL';
    secondaryBlock.counterAxisAlignItems = 'MIN';
    secondaryBlock.itemSpacing = 8;
    secondaryBlock.verticalPadding = 20;

    const secondaryBlockTitle = figma.createText();
    secondaryBlockTitle.characters = "<colour_name>";
    secondaryBlockTitle.name = "Secondary Block Title";
    secondaryBlockTitle.fontSize = 20;
    secondaryBlockTitle.fontName = { family: "Inter", style: "Bold" };
    secondaryBlockTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const separator2 = figma.createLine();
    separator2.strokeWeight = 1;
    separator2.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const hexSecondary = figma.createText();
    hexSecondary.characters = "<hex>";
    hexSecondary.name = "Primary HEX Value";
    hexSecondary.fontSize = 20;
    hexSecondary.fontName = { family: "Inter", style: "Bold" };
    hexSecondary.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    secondaryBlock.appendChild(secondaryBlockTitle);
    secondaryBlock.appendChild(separator2);
    secondaryBlock.appendChild(hexSecondary);

    colour2Frame.appendChild(secondaryValue);
    colour2Frame.appendChild(secondaryBlock);

    const colour3Frame = figma.createFrame();
    colour3Frame.name = "Action Colour";
    colour3Frame.cornerRadius = 5;
    colour3Frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    colour3Frame.layoutMode = 'VERTICAL';
    colour3Frame.counterAxisAlignItems = 'MIN';
    colour3Frame.itemSpacing = 0;

    const actionValue = figma.createRectangle();
    actionValue.name = "Action Value";
    actionValue.resize(253, 160);
    actionValue.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    actionValue.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    actionValue.cornerRadius = 10;

    const actionBlock = figma.createFrame();
    actionBlock.name = "Action Text Block";
    actionBlock.cornerRadius = 5;
    actionBlock.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    actionBlock.layoutMode = 'VERTICAL';
    actionBlock.counterAxisAlignItems = 'MIN';
    actionBlock.itemSpacing = 8;
    actionBlock.verticalPadding = 20;

    const actionBlockTitle = figma.createText();
    actionBlockTitle.characters = "<colour_name>";
    actionBlockTitle.name = "Action Block Title";
    actionBlockTitle.fontSize = 20;
    actionBlockTitle.fontName = { family: "Inter", style: "Bold" };
    actionBlockTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const separator3 = figma.createLine();
    separator3.strokeWeight = 1;
    separator3.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const hexAction = figma.createText();
    hexAction.characters = "<hex>";
    hexAction.name = "Action HEX Value";
    hexAction.fontSize = 20;
    hexAction.fontName = { family: "Inter", style: "Bold" };
    hexAction.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    actionBlock.appendChild(actionBlockTitle);
    actionBlock.appendChild(separator3);
    actionBlock.appendChild(hexAction);

    colour3Frame.appendChild(actionValue);
    colour3Frame.appendChild(actionBlock);

    const colour4Frame = figma.createFrame();
    colour4Frame.name = "Background Colour";
    colour4Frame.cornerRadius = 5;
    colour4Frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    colour4Frame.layoutMode = 'VERTICAL';
    colour4Frame.counterAxisAlignItems = 'MIN';
    colour4Frame.itemSpacing = 0;

    const backgroundValue = figma.createRectangle();
    backgroundValue.name = "Background Value";
    backgroundValue.resize(253, 160);
    backgroundValue.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    backgroundValue.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    backgroundValue.cornerRadius = 10;

    const backgroundBlock = figma.createFrame();
    backgroundBlock.name = "Background Text Block";
    backgroundBlock.cornerRadius = 5;
    backgroundBlock.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    backgroundBlock.layoutMode = 'VERTICAL';
    backgroundBlock.counterAxisAlignItems = 'MIN';
    backgroundBlock.itemSpacing = 8;
    backgroundBlock.verticalPadding = 20;

    const backgroundBlockTitle = figma.createText();
    backgroundBlockTitle.characters = "<colour_name>";
    backgroundBlockTitle.name = "Background Block Title";
    backgroundBlockTitle.fontSize = 20;
    backgroundBlockTitle.fontName = { family: "Inter", style: "Bold" };
    backgroundBlockTitle.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const separator4 = figma.createLine();
    separator4.strokeWeight = 1;
    separator4.strokes = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const hexBackground = figma.createText();
    hexBackground.characters = "<hex>";
    hexBackground.name = "Background HEX Value";
    hexBackground.fontSize = 20;
    hexBackground.fontName = { family: "Inter", style: "Bold" };
    hexBackground.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    backgroundBlock.appendChild(backgroundBlockTitle);
    backgroundBlock.appendChild(separator4);
    backgroundBlock.appendChild(hexBackground);

    colour4Frame.appendChild(backgroundValue);
    colour4Frame.appendChild(backgroundBlock);

    primaryFrame.appendChild(colour1Frame);
    primaryFrame.appendChild(colour2Frame);
    primaryFrame.appendChild(colour3Frame);
    primaryFrame.appendChild(colour4Frame);

    colourFrame.appendChild(colourTitle);
    colourFrame.appendChild(primaryFrame);

    colour1Frame.layoutSizingHorizontal = "HUG";
    colour2Frame.layoutSizingHorizontal = "HUG";
    colour3Frame.layoutSizingHorizontal = "HUG";
    colour4Frame.layoutSizingHorizontal = "HUG";

    primaryFrame.layoutSizingHorizontal = "FILL";
    primaryFrame.layoutSizingVertical = "HUG";

    primaryBlock.layoutSizingHorizontal = "FILL";
    secondaryBlock.layoutSizingHorizontal = "FILL";
    actionBlock.layoutSizingHorizontal = "FILL";
    backgroundBlock.layoutSizingHorizontal = "FILL";

    return colourFrame;
}

function addFonts(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null) {
    const fontSizeFrame = figma.createFrame();
    fontSizeFrame.name = "Font Sizes";
    fontSizeFrame.cornerRadius = 5;
    fontSizeFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    fontSizeFrame.layoutMode = 'VERTICAL';
    fontSizeFrame.counterAxisAlignItems = 'MIN';
    fontSizeFrame.itemSpacing = 20;
    fontSizeFrame.horizontalPadding = 10;

    const fontName = figma.createText();
    fontName.characters = "<font_name>";
    fontName.name = "Font Name";
    fontName.fontSize = 20;
    fontName.fontName = { family: "Inter", style: "Bold" };
    fontName.resize(1400, 50);
    fontName.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const tiny = addFontFrame(background, textColor, "10", "Tiny", 10, "Regular");
    const medium = addFontFrame(background, textColor, "14", "medium", 14, "Regular");
    const mediumPlus = addFontFrame(background, textColor, "16", "Medium Plus", 16, "Regular");
    const large = addFontFrame(background, textColor, "18", "Large", 18, "Regular");
    const xlarge = addFontFrame(background, textColor, "20", "xLarge", 20, "Regular");
    const xxlarge = addFontFrame(background, textColor, "28", "xxLarge", 28, "Regular");

    fontSizeFrame.appendChild(fontName);
    fontSizeFrame.appendChild(tiny);
    fontSizeFrame.appendChild(medium);
    fontSizeFrame.appendChild(mediumPlus);
    fontSizeFrame.appendChild(large);
    fontSizeFrame.appendChild(xlarge);
    fontSizeFrame.appendChild(xxlarge);

    tiny.layoutSizingVertical = "HUG";
    medium.layoutSizingVertical = "HUG";
    mediumPlus.layoutSizingVertical = "HUG";
    large.layoutSizingVertical = "HUG";
    xlarge.layoutSizingVertical = "HUG";
    xxlarge.layoutSizingVertical = "HUG";
    return fontSizeFrame;
}

function addCustImage(background: { r: number; g: number; b: number; } | null, imgColor: { r: number; g: number; b: number; } | null) {
    const customerImagesFrame = figma.createFrame();
    customerImagesFrame.name = "Customer Images";
    customerImagesFrame.cornerRadius = 5;
    customerImagesFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    customerImagesFrame.layoutMode = 'HORIZONTAL';
    customerImagesFrame.counterAxisAlignItems = 'MIN';
    customerImagesFrame.layoutWrap = 'WRAP';
    customerImagesFrame.resize(1500, 30);
    customerImagesFrame.itemSpacing = 20;
    customerImagesFrame.counterAxisSpacing = 60;

    const custImage1 = figma.createRectangle();
    custImage1.name = "Customer Image 1";
    custImage1.resize(80, 80);
    custImage1.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    custImage1.cornerRadius = 10;

    const custImage2 = figma.createRectangle();
    custImage2.name = "Customer Image 2";
    custImage2.resize(80, 80);
    custImage2.fills = [{ type: 'SOLID', color: { r: Number(imgColor?.r), g: Number(imgColor?.g), b: Number(imgColor?.b) } }];
    custImage2.cornerRadius = 10;

    customerImagesFrame.appendChild(custImage1);
    customerImagesFrame.appendChild(custImage2);
    return customerImagesFrame;
}