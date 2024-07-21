import '../styles/ui.css';
import { useLaunchButtonStyles } from './consts';
import Import from './Import/import';
import Data from './Data/dataMaker';
import Export from './Export/export';
import Helper from './Helper/helper';

import SolutionContent from './Import/solutionContent';

import JsonXMLContent from './Data/jsonxmlContent';

import CanvasHelperContent from './Helper/canvasHelper';
import BIHelperContent from './Helper/powerBIHelper';

import CanvasExportContent from './Export/canvasExport';

import React, { ChangeEvent } from 'react';
import JSZip from 'jszip';
import { useFilePicker } from 'use-file-picker';
import {saveAs} from 'file-saver';
import {Subtitle1,TabValue,SelectTabEvent, SelectTabData,TabList, Tab, useId} from '@fluentui/react-components';


function App() {
  const [selectedValue, setSelectedValue] = React.useState<TabValue>("import");
  const [selectedContent, setSelectedContent] = React.useState("solutionContent");
  
  const [selKey, setSelKey] = React.useState("");
  const [selUser, setSelUser] = React.useState("");
  const [selValidTo, setSelValidTo] = React.useState("");
  const [btnKeyText, setBtnKeyText] = React.useState("ADD KEY");

  const [checkedSolution, setCheckedSolution] = React.useState(true);
  const [checkedLocal, setCheckedLocal] = React.useState(true);
  const [checkedCanvas, setCheckedCanvas] = React.useState(true);
  const [checkedCanvasH, setCheckedCanvasH] = React.useState(true);
  const [checkedBI, setCheckedBI] = React.useState(false);

  const pass = useId("input-pass");
  const url = useId("input-url");
  const token = useId("input-token");
  const grid = useId("area-grid");
  const apikey = useId("input-key");
  const endpoint = useId("input-endpoint");
  const language = useId("dropdown-language");
  const output = useId("dropdown-output");

  const bckgBI = useId("input-backgr-bi");
  const controlBI = useId("input-control-bi");
  const columnsBI = useId("input-columns-bi");
  const rowsBI = useId("input-rows-bi");
  
  const l = useLaunchButtonStyles();

  const yamlPicker = useFilePicker({
    accept: '.yaml',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-yaml', filesContent } }, '*');
    },
  });

  React.useEffect(() => { 
    window.onmessage = async (event) => {
      let data = event.data.pluginMessage;
      if(data != undefined) {
        if(data.pluginMessage.type == "yaml") {
          let names = data.pluginMessage.names;
          if(data.pluginMessage.yaml.length == 1) {
            const fileName = names[0];
            const file = new Blob([data.pluginMessage.yaml], { type: 'application/yaml' });
            let link = document.createElement('a');
            link.target = '_blank';
            link.href = window.URL.createObjectURL(file);
            var name = fileName.concat('.fx.yaml');
            link.setAttribute("download", name);
            link.click();
            URL.revokeObjectURL(link.href);
          } else {
            var zip = new JSZip();
            for (let i = 0; i < data.pluginMessage.yaml.length; i++) {
              const fileName = names[i];
              const file = new Blob([data.pluginMessage.yaml[i]], { type: 'application/yaml' });
      
              zip.file(fileName.concat(".fx.yaml"),file);
            }
            zip.generateAsync({type:"blob"}).then(function(content){
              saveAs(content,"exported.zip");
            });
          }
          return;
        }
        let xmls = data.pluginMessage.xml;
  
        if(xmls.length == 1) {
          const xml = xmls[0];
          const file = new Blob([xml.file], { type: 'application/xml' });
          let link = document.createElement('a');
          link.target = '_blank';
          link.href = window.URL.createObjectURL(file);
          
          link.setAttribute("download", xml.name);
          link.click();
          URL.revokeObjectURL(link.href);
        } else {
          var zip = new JSZip();
          for (let i = 0; i < xmls.length; i++) {
            const xml = xmls[i];
            const file = new Blob([xml.file], { type: 'application/xml' });
    
            zip.file(xml.name.concat(".xml"),file);
          }
          zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content,"exported.zip");
          });
        }
    }
  }
  });

  const toggleChecked = React.useCallback(
    (buttonIndex: number) => {
      switch (buttonIndex) {
        case 1:
            setCheckedSolution(true);
            setSelectedContent("solutionContent");
            break;
          case 3:
            setCheckedLocal(true);
            setSelectedContent("jsonxmlcontent");
            break;
          case 5:
            setCheckedCanvas(true);
            setSelectedContent("exportcanvas");
            break;
          case 7:
            setCheckedCanvasH(true);
            setCheckedBI(false);
            setSelectedContent("helpercanvas");
            break;
          case 8:
            setCheckedCanvasH(false);
            setCheckedBI(true);
            setSelectedContent("helperbi");
            break;
      }
    },
    [checkedSolution,checkedLocal,checkedCanvas,checkedCanvasH,checkedBI]
  );

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value); 
      if(data.value == "import") {
          setSelectedContent("solutionContent");
          setCheckedSolution(true);
        return;
      }
      if(data.value == "data") {
        setSelectedContent("jsonxmlcontent");
        setCheckedLocal(true);
        return;
      } 
      if(data.value == "exports") {
        setSelectedContent("exportcanvas");
        setCheckedCanvas(true);
        return;
      }
      if (data.value == "helper") {
        setSelectedContent("helpercanvas");
        setCheckedCanvasH(true);
        setCheckedBI(false);
        return;
      } 
  };

  return (
    <div id='upper'>
      <div id='tabs'>
        <TabList id='tab' size='small' selectedValue={selectedValue} onTabSelect={onTabSelect}>
          <Tab id='Import' className={l.launchButton} value="import">Import</Tab>
          <Tab id='Data'  className={l.launchButton} value="data">Data Maker</Tab>
          <Tab id='Exports'  className={l.launchButton} value="exports">Export</Tab>
          <Tab id='Helper' className={l.launchButton} value="helper">Helper</Tab>
        </TabList>
      </div>
      <div id='content'>
        {selectedValue === "import" && <Import checkedSolution={checkedSolution} toggleChecked={toggleChecked} />}
        {selectedValue === "data" && <Data checkedLocal={checkedLocal} toggleChecked={toggleChecked}  />}
        {selectedValue === "exports" && <Export checkedCanvas={checkedCanvas} toggleChecked={toggleChecked} />}
        {selectedValue === "helper" && <Helper checkedCanvasH={checkedCanvasH} checkedBI={checkedBI} toggleChecked={toggleChecked} />}
        
        <div id='inner-content'>
          {selectedContent === "solutionContent" && <SolutionContent yamlPicker={yamlPicker} output={output} />}
          {selectedContent === "jsonxmlcontent" && <JsonXMLContent grid={grid} />}
          {selectedContent === "exportcanvas" && <CanvasExportContent />}
          {selectedContent === "helpercanvas" && <CanvasHelperContent />}
          {selectedContent === "helperbi" && <BIHelperContent bckgBI={bckgBI} controlBI={controlBI} columnsBI={columnsBI} rowsBI={rowsBI} />}
        </div>
      </div>
      <div id='footer'>
        <Subtitle1 id='footerText'>2024 developed by Mycondy, <small>2.0v</small> </Subtitle1>
        <a id='link' href='https://mycondy.com/designkit' target='_blank'>Get Pro</a>
      </div>
    </div>
  );
}

export default App;
