import { importJSONFiles } from "./Canvas/importers/json-importer";
import { ScreenSaver } from "../model/Canvas/ScreenSaver";
import { parseScreen } from "./Canvas/parsers/parser";
import { importYAMLFiles } from "./Canvas/importers/yaml-importer";
import { parseSelectedFrames } from "./Canvas/exporters/yaml-exporter";
import { importDefinitionJSON } from "./PowerAutomate/importers/flowImporter";
import { parseFlow } from "./PowerAutomate/parsers/flowParser";
import { parseModelDrivenScreen } from "./ModelDriven/parsers/modelDrivenParser";
import { importXMLFiles } from "./ModelDriven/importers/xml-importer";
import { importJSONtoGrid } from "./ModelDriven/importers/json-data-importer";
import { addProjectTemplate } from "./Export/pdfExport";
import { makePowerBIcanvas } from "./PowerBI/powerbi-importer";
import { addListPrefixes } from "./Canvas/importers/design-importer";

figma.showUI(__html__);
figma.ui.resize(400, 610);


figma.ui.onmessage = async msg => {
  if(msg.type == "notfound") {
    figma.notify("Customizations.xml file not found!");
    return;
  }
  
  if(msg.type == "exportCanvas") {
    const nodes = figma.currentPage.selection;

    if(nodes != undefined && nodes.length > 0) parseSelectedFrames();
    else figma.notify("Please select at least one frame");
  }

  if(msg.type === 'import-xml') {
    (async() => {
      await loadFonts();
    })().then(() => {
      const modelDrivenScreens = importXMLFiles(msg.data);
      if(modelDrivenScreens != undefined && modelDrivenScreens.length > 0) {
        modelDrivenScreens.forEach(modelDrivenScreen => {
          parseModelDrivenScreen(modelDrivenScreen);
        });
      }
    });
    return;
  }

  if(msg.type == "import-json") {
    (async() => {
      await loadFonts();
    })().then(() => {
      const fileProperty = msg.fileProperty;
      const screens = importJSONFiles(msg.filesContent,fileProperty);
      
      if(screens != undefined) {
        const saver = new ScreenSaver(screens);
        screens.forEach(screen => {
          parseScreen(screen,saver);
          return;
        });
     }
    });
   return;
  }

  if(msg.type == "import-yaml") {
    (async() => {
      await loadFonts();
    })().then(() => {
      const screens = importYAMLFiles(msg.filesContent);
      if(screens != undefined) {
      const saver = new ScreenSaver(screens);
      screens.forEach(screen => {
        parseScreen(screen,saver);
        return;
      });
    }
  });
  }

  if(msg.type == "grid") {
    const data = msg.data;
    if(data == undefined || data == "") {
      figma.notify("Please input JSON data");
      return;
    }
    (async() => {
      await loadFonts();
    })().then(() => {
      importJSONtoGrid(data);
      figma.closePlugin();
      return;
    });
  }

  if(msg.type == "addTemplate") {
    addProjectTemplate();
    return;
  }

  if(msg.type == "powerbi") {
    const background = msg.background;
    const control = msg.control;
    const columns = msg.columns;
    const rows = msg.rows;

    if(columns == "" || rows == "") {
      figma.notify("Please fill all mandatory fields!");
      return;
    }

    makePowerBIcanvas(background,control,columns,rows);
    return;
  }

  if(msg.type == "listprefixes") {
    addListPrefixes();  
    return;
  }

  if(msg.type == "import-flow") {
    const flow = importDefinitionJSON(msg.filesContent,msg.flowName,msg.ID);
    if(flow != undefined) {
        parseFlow(flow);
    }
    return;
  }
}

async function loadFonts() {
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Regular',
  });
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Bold',
  });
  await figma.loadFontAsync({
    family: "Poppins",
    style: 'Regular',
  });
  await figma.loadFontAsync({
    family: "Poppins",
    style: 'Bold',
  });
  await figma.loadFontAsync({
    family: "Outfit",
    style: 'Regular',
  });
}
