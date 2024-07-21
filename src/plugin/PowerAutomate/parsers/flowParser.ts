import { Flow, Definition, Input, Action, Recurrence,Trigger } from "../../../model/PowerAutomate/Flow";
import { hexToRgb } from "../../../util/colorUtil";
import { findLastX } from "../../../util/utils";

export function parseFlow(flow: Flow) {
    const flowBackStart = hexToRgb("#EAE2F2");
    const flowBackEnd = hexToRgb("#E5E9F3");
    const flowPoint = hexToRgb("#379CFE");
    const flowStart = hexToRgb("#4846FF");
    const flowTitleColor = hexToRgb("#525252");

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "Power Automate Flow - " + flow.properties.displayName;
    frame.cornerRadius = 10;
    frame.fills = [{type: "GRADIENT_LINEAR",
        gradientTransform: [[0,1,0],[0.5,1,0]],
        gradientStops: [
            {position: 0, color: {r: Number(flowBackStart?.r), g: Number(flowBackStart?.g), b: Number(flowBackStart?.b), a: 1}},
            {position: 1, color: {r: Number(flowBackEnd?.r), g: Number(flowBackEnd?.g), b: Number(flowBackEnd?.b), a: 1}}
        ]}];
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'CENTER';
    frame.itemSpacing = 20;
    frame.horizontalPadding = 60;
    frame.verticalPadding = 60;

    const title = figma.createText();
    title.characters = flow.properties.displayName;
    title.name = "flow_title";
    title.fontSize = 40;
    title.resize(frame.width,30);
    title.fills = [{ type: 'SOLID', color: { r: Number(flowTitleColor?.r), g: Number(flowTitleColor?.g), b: Number(flowTitleColor?.b) } }];

    const steps = figma.createFrame();
    steps.name = "flow_steps";
    steps.cornerRadius = 10;
    steps.fills = [{ type: 'SOLID', color: { r: Number(1), g: Number(1), b: Number(1) },opacity: 0 }]; 
    steps.layoutMode = 'VERTICAL';
    steps.counterAxisAlignItems = 'CENTER';
    steps.itemSpacing = 0;
    steps.horizontalPadding = 10;

    const circle = figma.createEllipse();
    circle.name = "flow_start";
    circle.fills = [{ type: 'SOLID', color: { r: Number(flowStart?.r), g: Number(flowStart?.g), b: Number(flowStart?.b) } }];
    circle.resize(60,60);

    const circleS = figma.createEllipse();
    circleS.name = "circle";
    circleS.x = 5;
    circleS.fills = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    circleS.strokes = [{ type: 'SOLID', color: { r: Number(0), g: Number(0), b: Number(0) } }];
    circleS.strokeWeight = 2;
    circleS.resize(17,17);

    const startArrow = figma.createLine();
    startArrow.name = "flow_start_arrow";
    startArrow.rotation = -90;
    startArrow.resize(50,0);
    startArrow.strokes = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    startArrow.strokeCap = "NONE";
    startArrow.strokeWeight = 2;

    steps.appendChild(circle);
    steps.appendChild(startArrow);
    steps.appendChild(circleS);

    appendTrigger(flow.properties.trigger,steps,flowPoint);

    appendSteps(flow.properties.definition,steps,flowPoint);

    frame.appendChild(title);
    frame.appendChild(steps);
    

    frame.layoutSizingHorizontal = "HUG";
    title.layoutSizingHorizontal = "HUG";

    steps.layoutSizingHorizontal = "HUG";
    steps.layoutSizingVertical = "HUG";
}

function appendTrigger(trigger: Trigger, frame: FrameNode, flowPoint: { r: number; g: number; b: number; } | null) {
    const triggerColor = hexToRgb("#C285FF");
    const titleColor = hexToRgb("#535353");
    const dscrColor = hexToRgb("#464646");
    const typeColor = hexToRgb("#F6F6F6");
    const typeTextColor = hexToRgb("#808080");

    const triggerFrame = figma.createFrame();
    triggerFrame.name = "Trigger";
    triggerFrame.cornerRadius = 10;
    triggerFrame.layoutMode = 'VERTICAL';
    triggerFrame.resize(300,300);
    triggerFrame.counterAxisAlignItems = 'MIN';
    triggerFrame.itemSpacing = 0;
    triggerFrame.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
    
    triggerFrame.verticalPadding = 0;
    triggerFrame.horizontalPadding = 0;

    const rectangleHeader = figma.createRectangle();
    rectangleHeader.name = "cover";
    rectangleHeader.resize(300,23);
    rectangleHeader.fills = [{ type: 'SOLID', color: { r: Number(triggerColor?.r), g: Number(triggerColor?.g), b: Number(triggerColor?.b) } }];

    const header = figma.createFrame();
    header.name = "Header";
    header.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
    header.layoutMode = 'HORIZONTAL';
    header.counterAxisAlignItems = 'MIN';
    header.itemSpacing = 20;
    header.verticalPadding = 10;
    header.horizontalPadding = 10;

    const titleFrame = figma.createFrame();
    titleFrame.name = "Title Frame";
    titleFrame.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
    titleFrame.layoutMode = 'VERTICAL';
    titleFrame.counterAxisAlignItems = 'MIN';
    titleFrame.itemSpacing = 2;
    titleFrame.verticalPadding = 0;
    titleFrame.horizontalPadding = 0;

    const title = figma.createText();
    title.characters = trigger.kind == "" ? "Recurrence" : trigger.kind;
    title.fontName = { family: "Outfit", style: "Regular" };
    title.name = "trigger_name";
    title.fills = [{ type: 'SOLID', color: { r: Number(titleColor?.r), g: Number(titleColor?.g), b: Number(titleColor?.b) } }];
    title.fontSize = 16;
    
    titleFrame.appendChild(title);

    const trigerType = figma.createText();
    trigerType.characters = trigger.type;
    trigerType.name = "trigger_type";
    trigerType.fontName = { family: "Outfit", style: "Regular" };
    trigerType.fills = [{ type: 'SOLID', color: { r: Number(dscrColor?.r), g: Number(dscrColor?.g), b: Number(dscrColor?.b) } }];
    trigerType.fontSize = 10;

    titleFrame.appendChild(trigerType);

    const right = figma.createFrame();
    right.name = "Right";
    right.fills = [{ type: 'SOLID', color: { r: Number(typeColor?.r), g:Number(typeColor?.g), b: Number(typeColor?.b) } }];
    right.layoutMode = 'VERTICAL';
    right.counterAxisAlignItems = 'MIN';
    right.itemSpacing = 10;
    right.verticalPadding = 2;
    right.horizontalPadding = 10;
    right.cornerRadius = 5;

    const typeTitle = figma.createText();
    typeTitle.characters = "TRIGGER";
    typeTitle.fontName = { family: "Outfit", style: "Regular" };
    typeTitle.name = "trigger_type_title";
    typeTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    typeTitle.fontSize = 10;

    right.appendChild(typeTitle);

    header.appendChild(titleFrame);
    header.appendChild(right);

    const content = figma.createFrame();
    content.name = "Content";
    content.fills = [{ type: 'SOLID', color: { r:1, g:1, b: 1 } }];
    content.layoutMode = 'VERTICAL';
    content.counterAxisAlignItems = 'MIN';
    content.itemSpacing = 10;
    content.paddingBottom = 10;
    content.paddingTop = 2;
    content.horizontalPadding = 10;
    content.cornerRadius = 5;

    const separator = figma.createLine();
    separator.strokeWeight = 1;
    separator.strokes = [{ type: 'SOLID', color: { r: Number(titleColor?.r), g: Number(titleColor?.g), b: Number(titleColor?.b) } }];

    const inputParamsText = figma.createText();
    inputParamsText.characters = "Parameters:";
    inputParamsText.fontName = { family: "Outfit", style: "Regular" };
    inputParamsText.name = "Params";
    inputParamsText.fills = [{ type: 'SOLID', color: { r: Number(dscrColor?.r), g: Number(dscrColor?.g), b: Number(dscrColor?.b) } }];
    inputParamsText.fontSize = 13;

    content.appendChild(separator);
    content.appendChild(inputParamsText);
    
    if(trigger.recurrence != undefined) {
        const parameters = addRecurrenceParams(trigger.recurrence, typeTextColor);
        content.appendChild(parameters);

        parameters.layoutSizingHorizontal = "FILL";
        parameters.layoutSizingVertical = "HUG";
    }


    const { circleS, arrow } = addStep(flowPoint, title);

    triggerFrame.appendChild(rectangleHeader);
    triggerFrame.appendChild(header);
    triggerFrame.appendChild(content);

    frame.appendChild(triggerFrame);
    frame.appendChild(circleS);
    frame.appendChild(arrow);

    triggerFrame.layoutSizingVertical = "HUG";
    rectangleHeader.layoutSizingHorizontal = "FILL";
    header.layoutSizingHorizontal = "FILL";
    header.layoutSizingVertical = "HUG";
    right.layoutSizingHorizontal = "HUG";
    titleFrame.layoutSizingHorizontal = "FILL";
    titleFrame.layoutSizingVertical = "HUG";
    content.layoutSizingHorizontal = "FILL";
    content.layoutSizingVertical = "HUG";
    separator.layoutSizingHorizontal = "FILL";
}

function appendSteps(definition: Definition, frame: FrameNode,flowPoint: { r: number; g: number; b: number; } | null) {
    const actions = definition.actions;

    const openAPIColor = hexToRgb("#ff859a");
    const controlColor = hexToRgb("#3649de");
    const titleColor = hexToRgb("#535353");
    const dscrColor = hexToRgb("#464646");
    const typeColor = hexToRgb("#F6F6F6");
    const typeTextColor = hexToRgb("#808080");
    const flowEnd = hexToRgb("#909090");

    for (let index = 0; index < actions.length; index++) {
        const action = actions[index];
        
        const step = figma.createFrame();
        step.name = "flow_step_"+ index;
        step.cornerRadius = 10;
        step.layoutMode = 'VERTICAL';
        step.resize(300,300);
        step.counterAxisAlignItems = 'MIN';
        step.itemSpacing = 0;
        step.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
        
        step.verticalPadding = 0;
        step.horizontalPadding = 0;
        
        const rectangleHeader = figma.createRectangle();
        rectangleHeader.name = "cover";
        rectangleHeader.resize(300,23);
        if(action.item.type != "OpenApiConnection") {
            rectangleHeader.fills = [{ type: 'SOLID', color: { r: Number(controlColor?.r), g: Number(controlColor?.g), b: Number(controlColor?.b) } }];
        } else {
            rectangleHeader.fills = [{ type: 'SOLID', color: { r: Number(openAPIColor?.r), g: Number(openAPIColor?.g), b: Number(openAPIColor?.b) } }];
        }
        
        const header = figma.createFrame();
        header.name = "Header";
        header.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
        header.layoutMode = 'HORIZONTAL';
        header.counterAxisAlignItems = 'MIN';
        header.itemSpacing = 20;
        header.verticalPadding = 10;
        header.horizontalPadding = 10;

        const titleFrame = figma.createFrame();
        titleFrame.name = "Title Frame";
        titleFrame.fills = [{ type: 'SOLID', color: { r: 1, g:1, b: 1 } }];
        titleFrame.layoutMode = 'VERTICAL';
        titleFrame.counterAxisAlignItems = 'MIN';
        titleFrame.itemSpacing = 2;
        titleFrame.verticalPadding = 0;
        titleFrame.horizontalPadding = 0;

        const title = figma.createText();
        title.characters = action.item.parent.toUpperCase().replaceAll("_"," ");
        title.fontName = { family: "Outfit", style: "Regular" };
        title.name = "flow_title_"+index;
        title.fills = [{ type: 'SOLID', color: { r: Number(titleColor?.r), g: Number(titleColor?.g), b: Number(titleColor?.b) } }];
        title.fontSize = 16;
        
        titleFrame.appendChild(title);
        
        if(action.item.type == "OpenApiConnection") {
            const apiLabel = figma.createText();
            apiLabel.characters = "API Connection";
            apiLabel.name = "flow_api_label";
            apiLabel.fontName = { family: "Outfit", style: "Regular" };
            apiLabel.fills = [{ type: 'SOLID', color: { r: Number(dscrColor?.r), g: Number(dscrColor?.g), b: Number(dscrColor?.b) } }];
            apiLabel.fontSize = 10;

            titleFrame.appendChild(apiLabel);
        }

        const right = figma.createFrame();
        right.name = "Right";
        right.fills = [{ type: 'SOLID', color: { r: Number(typeColor?.r), g:Number(typeColor?.g), b: Number(typeColor?.b) } }];
        right.layoutMode = 'VERTICAL';
        right.counterAxisAlignItems = 'MIN';
        right.itemSpacing = 10;
        right.verticalPadding = 2;
        right.horizontalPadding = 10;
        right.cornerRadius = 5;

        const typeTitle = figma.createText();
        typeTitle.characters = action.item.type == "OpenApiConnection" ? "API" : "CONTROL";
        typeTitle.fontName = { family: "Outfit", style: "Regular" };
        typeTitle.name = "Type";
        typeTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
        typeTitle.fontSize = 10;

        right.appendChild(typeTitle);

        header.appendChild(titleFrame);
        header.appendChild(right);
        
        const content = figma.createFrame();
        content.name = "Content";
        content.fills = [{ type: 'SOLID', color: { r:1, g:1, b: 1 } }];
        content.layoutMode = 'VERTICAL';
        content.counterAxisAlignItems = 'MIN';
        content.itemSpacing = 10;
        content.paddingBottom = 10;
        content.paddingTop = 2;
        content.horizontalPadding = 10;
        content.cornerRadius = 5;

        const separator = figma.createLine();
        separator.strokeWeight = 1;
        separator.strokes = [{ type: 'SOLID', color: { r: Number(titleColor?.r), g: Number(titleColor?.g), b: Number(titleColor?.b) } }];

        const inputParamsText = figma.createText();
        inputParamsText.characters = "Input Parameters:";
        inputParamsText.fontName = { family: "Outfit", style: "Regular" };
        inputParamsText.name = "Input Params";
        inputParamsText.fills = [{ type: 'SOLID', color: { r: Number(dscrColor?.r), g: Number(dscrColor?.g), b: Number(dscrColor?.b) } }];
        inputParamsText.fontSize = 13;

        const parameters = addParameters(action, index, typeTextColor);

        content.appendChild(separator);
        content.appendChild(inputParamsText);
        content.appendChild(parameters);

        const { circleS, arrow } = addStep(flowPoint, title);
        
        step.appendChild(rectangleHeader);
        step.appendChild(header);
        step.appendChild(content);
        
        frame.appendChild(step);
        frame.appendChild(circleS);
        frame.appendChild(arrow);
        
        step.layoutSizingVertical = "HUG";
        rectangleHeader.layoutSizingHorizontal = "FILL";
        header.layoutSizingHorizontal = "FILL";
        header.layoutSizingVertical = "HUG";
        right.layoutSizingHorizontal = "HUG";
        titleFrame.layoutSizingHorizontal = "FILL";
        titleFrame.layoutSizingVertical = "HUG";
        content.layoutSizingHorizontal = "FILL";
        content.layoutSizingVertical = "HUG";
        separator.layoutSizingHorizontal = "FILL";
        parameters.layoutSizingHorizontal = "FILL";
        parameters.layoutSizingVertical = "HUG";
    }

    const circle = figma.createEllipse();
    circle.name = "flow_end";
    circle.fills = [{ type: 'SOLID', color: { r: Number(flowEnd?.r), g: Number(flowEnd?.g), b: Number(flowEnd?.b) } }];
    circle.resize(60,60);

    frame.appendChild(circle);

}

function addStep(flowPoint: { r: number; g: number; b: number; } | null, title: TextNode) {
    const circleS = figma.createEllipse();
    circleS.name = "circle";
    circleS.x = 5;
    circleS.fills = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    circleS.strokes = [{ type: 'SOLID', color: { r: Number(0), g: Number(0), b: Number(0) } }];
    circleS.strokeWeight = 2;
    circleS.resize(17, 17);

    const arrow = figma.createLine();
    arrow.x = title.x;
    arrow.y = title.y;
    arrow.rotation = -90;
    arrow.resize(100, 0);
    arrow.strokes = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    arrow.strokeCap = "NONE";
    arrow.strokeWeight = 2;
    return { circleS, arrow };
}

function addParameters(action: Action, index: number, typeTextColor: { r: number; g: number; b: number; } | null) {
    const parameters = figma.createFrame();
    parameters.name = "Parameters";
    parameters.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameters.layoutMode = 'VERTICAL';
    parameters.counterAxisAlignItems = 'MIN';
    parameters.itemSpacing = 5;
    parameters.cornerRadius = 0;

    const parameterRow1 = figma.createFrame();
    parameterRow1.name = "Parameters Row";
    parameterRow1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow1.layoutMode = 'HORIZONTAL';
    parameterRow1.counterAxisAlignItems = 'MIN';
    parameterRow1.itemSpacing = 10;
    parameterRow1.cornerRadius = 0;

    const paramLabel1 = figma.createText();
    paramLabel1.characters = action.item.type == "OpenApiConnection" ? "Connector:" : "PeekCode:";
    paramLabel1.name = action.item.type == "OpenApiConnection" ? "connector_" + index : "peek_code_" + index;
    paramLabel1.fontName = { family: "Outfit", style: "Regular" };
    paramLabel1.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel1.fontSize = 7;
    paramLabel1.resize(50, 10);

    parameterRow1.appendChild(paramLabel1);

    if (action.item.inputs instanceof Input) {
        const apiTitle = figma.createText();
        apiTitle.characters = action.item.inputs.host.connectionName;
        apiTitle.name = "flow_api_title_" + index;
        apiTitle.fontName = { family: "Outfit", style: "Regular" };
        apiTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
        apiTitle.fontSize = 7;

        parameterRow1.appendChild(apiTitle);
    } else {
        const peekCode = figma.createText();
        peekCode.characters = action.item.inputs == undefined ? "": String(action.item.inputs);
        peekCode.name = "flow_peekcode_title_" + index;
        peekCode.fontName = { family: "Outfit", style: "Regular" };
        peekCode.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
        peekCode.fontSize = 7;

        parameterRow1.appendChild(peekCode);
    }

    const parameterRow2 = figma.createFrame();
    parameterRow2.name = "Parameters Row";
    parameterRow2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow2.layoutMode = 'HORIZONTAL';
    parameterRow2.counterAxisAlignItems = 'MIN';
    parameterRow2.itemSpacing = 10;
    parameterRow2.cornerRadius = 0;

    const paramLabel2 = figma.createText();
    paramLabel2.characters = "Type:";
    paramLabel2.name = "type_" + index;
    paramLabel2.fontName = { family: "Outfit", style: "Regular" };
    paramLabel2.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel2.fontSize = 7;
    paramLabel2.resize(50, 10);

    const typeTitle = figma.createText();
    typeTitle.characters = action.item.type;
    typeTitle.name = "flow_type_title_" + index;
    typeTitle.fontName = { family: "Outfit", style: "Regular" };
    typeTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    typeTitle.fontSize = 7;

    parameterRow2.appendChild(paramLabel2);
    parameterRow2.appendChild(typeTitle);

    parameters.appendChild(parameterRow1);
    parameters.appendChild(parameterRow2);

    parameterRow1.layoutSizingHorizontal = "FILL";
    parameterRow1.layoutSizingVertical = "HUG";

    parameterRow2.layoutSizingHorizontal = "FILL";
    parameterRow2.layoutSizingVertical = "HUG";

    if (action.item.inputs instanceof Input) {
        if(action.item.inputs.parameters.dataset != undefined) {
            const parameterRow3 = figma.createFrame();
            parameterRow3.name = "Parameters Row";
            parameterRow3.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            parameterRow3.layoutMode = 'HORIZONTAL';
            parameterRow3.counterAxisAlignItems = 'MIN';
            parameterRow3.itemSpacing = 10;
            parameterRow3.cornerRadius = 0;
    
            const paramLabel3 = figma.createText();
            paramLabel3.characters = "Dataset:";
            paramLabel3.name = "dataset_" + index;
            paramLabel3.fontName = { family: "Outfit", style: "Regular" };
            paramLabel3.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
            paramLabel3.fontSize = 7;
            paramLabel3.resize(50, 10);
    
            const datasetTitle = figma.createText();
            datasetTitle.characters = action.item.inputs.parameters.dataset;
            datasetTitle.name = "flow_type_title_" + index;
            datasetTitle.fontName = { family: "Outfit", style: "Regular" };
            datasetTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
            datasetTitle.fontSize = 7;

            parameterRow3.appendChild(paramLabel3);
            parameterRow3.appendChild(datasetTitle);

            parameters.appendChild(parameterRow3);

            parameterRow3.layoutSizingHorizontal = "FILL";
            parameterRow3.layoutSizingVertical = "HUG";
        }
    }

    const parameterRow4 = figma.createFrame();
    parameterRow4.name = "Parameters Row";
    parameterRow4.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow4.layoutMode = 'HORIZONTAL';
    parameterRow4.counterAxisAlignItems = 'MIN';
    parameterRow4.itemSpacing = 10;
    parameterRow4.cornerRadius = 0;

    const paramLabel4 = figma.createText();
    paramLabel4.characters = "Metadata ID:";
    paramLabel4.name = "metadataid_" + index;
    paramLabel4.fontName = { family: "Outfit", style: "Regular" };
    paramLabel4.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel4.fontSize = 7;
    paramLabel4.resize(50, 10);

    const metadataTitle = figma.createText();
    metadataTitle.characters = action.item.metadataID;
    metadataTitle.name = "flow_metadata_title_" + index;
    metadataTitle.fontName = { family: "Outfit", style: "Regular" };
    metadataTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    metadataTitle.fontSize = 7;

    parameterRow4.appendChild(paramLabel4);
    parameterRow4.appendChild(metadataTitle);

    parameters.appendChild(parameterRow4);

    parameterRow4.layoutSizingHorizontal = "FILL";
    parameterRow4.layoutSizingVertical = "HUG";
    return parameters;
}

function addRecurrenceParams(recurrence: Recurrence, typeTextColor: { r: number; g: number; b: number; } | null) {
    const parameters = figma.createFrame();
    parameters.name = "Recurrence Params";
    parameters.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameters.layoutMode = 'VERTICAL';
    parameters.counterAxisAlignItems = 'MIN';
    parameters.itemSpacing = 5;
    parameters.cornerRadius = 0;

    const parameterRow1 = figma.createFrame();
    parameterRow1.name = "Params Row";
    parameterRow1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow1.layoutMode = 'HORIZONTAL';
    parameterRow1.counterAxisAlignItems = 'MIN';
    parameterRow1.itemSpacing = 10;
    parameterRow1.cornerRadius = 0;

    const paramLabel1 = figma.createText();
    paramLabel1.characters = "Frequency:";
    paramLabel1.name = "frequency";
    paramLabel1.fontName = { family: "Outfit", style: "Regular" };
    paramLabel1.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel1.fontSize = 7;
    paramLabel1.resize(50, 10);

    const frequencyTitle = figma.createText();
    frequencyTitle.characters = recurrence.frequency;
    frequencyTitle.name = "interval_title";
    frequencyTitle.fontName = { family: "Outfit", style: "Regular" };
    frequencyTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    frequencyTitle.fontSize = 7;

    parameterRow1.appendChild(paramLabel1);
    parameterRow1.appendChild(frequencyTitle);

    const parameterRow2 = figma.createFrame();
    parameterRow2.name = "Params Row";
    parameterRow2.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow2.layoutMode = 'HORIZONTAL';
    parameterRow2.counterAxisAlignItems = 'MIN';
    parameterRow2.itemSpacing = 10;
    parameterRow2.cornerRadius = 0;

    const paramLabel2 = figma.createText();
    paramLabel2.characters = "Interval:";
    paramLabel2.name = "interval";
    paramLabel2.fontName = { family: "Outfit", style: "Regular" };
    paramLabel2.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel2.fontSize = 7;
    paramLabel2.resize(50, 10);

    const intervalTitle = figma.createText();
    intervalTitle.characters = ""+ recurrence.interval;
    intervalTitle.name = "interval_title";
    intervalTitle.fontName = { family: "Outfit", style: "Regular" };
    intervalTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    intervalTitle.fontSize = 7;

    parameterRow2.appendChild(paramLabel2);
    parameterRow2.appendChild(intervalTitle);

    const parameterRow3 = figma.createFrame();
    parameterRow3.name = "Params Row";
    parameterRow3.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    parameterRow3.layoutMode = 'HORIZONTAL';
    parameterRow3.counterAxisAlignItems = 'MIN';
    parameterRow3.itemSpacing = 10;
    parameterRow3.cornerRadius = 0;

    const paramLabel3 = figma.createText();
    paramLabel3.characters = "Start Time:";
    paramLabel3.name = "starttime";
    paramLabel3.fontName = { family: "Outfit", style: "Regular" };
    paramLabel3.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    paramLabel3.fontSize = 7;
    paramLabel3.resize(50, 10);

    const timeTitle = figma.createText();
    timeTitle.characters = recurrence.startTime;
    timeTitle.name = "time_title";
    timeTitle.fontName = { family: "Outfit", style: "Regular" };
    timeTitle.fills = [{ type: 'SOLID', color: { r: Number(typeTextColor?.r), g: Number(typeTextColor?.g), b: Number(typeTextColor?.b) } }];
    timeTitle.fontSize = 7;

    parameterRow3.appendChild(paramLabel3);
    parameterRow3.appendChild(timeTitle);

    parameters.appendChild(parameterRow1);
    parameters.appendChild(parameterRow2);
    parameters.appendChild(parameterRow3);

    parameterRow1.layoutSizingHorizontal = "FILL";
    parameterRow1.layoutSizingVertical = "HUG";
    parameterRow2.layoutSizingHorizontal = "FILL";
    parameterRow2.layoutSizingVertical = "HUG";
    parameterRow3.layoutSizingHorizontal = "FILL";
    parameterRow3.layoutSizingVertical = "HUG";

    return parameters;
}