import { Button, Label } from "@fluentui/react-components";
import React, {PropsWithChildren } from "react";
import JSZip from "jszip";
import { Guid } from "typescript-guid";
import {isUUID} from "../../util/utils";
import { FilePickerReturnTypes } from "use-file-picker/types";
import { ColoredLine2 } from "../UI/uiComps";

type Props = PropsWithChildren<{
    yamlPicker: FilePickerReturnTypes<string, unknown>,
    output: string
}>;


function fileCheck(event:any) {
    const file = event.target.files[0];
    var zip = new JSZip();
    zip.loadAsync(file).then(async function (zip) {
        const files = Object.keys(zip.files);
        const fileValues = Object.values(zip.files);

        const f = zip.file("customizations.xml");

        if(f != undefined &&  f != null) {
            const data = await f.async("string");
            parent.postMessage({ pluginMessage: { type: 'import-xml',data } }, '*');
        }

        await importFlowsAndCanvas(files, fileValues, zip);
    });
}

async function importFlowsAndCanvas(files: string[], fileValues: JSZip.JSZipObject[], zip: JSZip) {
    for (let index = 0; index < files.length; index++) {
        const element = files[index];

        if (element.includes("Workflows/") && element.includes(".json")) {
            const val = fileValues[index];
            const flow = zip.file(val.name);

            if (flow != undefined && flow != null) {
                const filesContent = await flow.async("string");
                const fileName = val.name;
                let flowName = fileName.substring(fileName.indexOf("/") + 1, fileName.indexOf(".json"));

                const flowID = fileName.substring(fileName.indexOf("-") + 1, fileName.indexOf(".json"));

                let ID = "";
                if (isUUID(flowID)) {
                    ID = flowID;
                } else {
                    const nextLevel = flowID.substring(flowID.indexOf("-") + 1);
                    if (isUUID(nextLevel)) {
                        ID = nextLevel;
                        flowName = flowName.substring(0, flowName.indexOf("-")) + "-" + flowID.substring(0, flowID.indexOf("-"));
                    }
                }

                if (ID == "") ID = Guid.create().toString();

                parent.postMessage({ pluginMessage: { type: 'import-flow', filesContent, flowName, ID } }, '*');
                continue;
            }
            continue;
        }
        if (element.includes(".msapp")) {
            const val = fileValues[index];
            const msapp = zip.file(val.name);

            if (msapp != undefined && msapp != null) {
                const filesContent = await msapp.async("uint8array");
                zip.loadAsync(filesContent).then(async function (zip2) {
                    const files = Object.keys(zip2.files);
                    const fileValues = Object.values(zip2.files);

                    const filesContent: String[] = [];
                    let fileProperty = "";

                    for (let index = 0; index < files.length; index++) {
                        const element = files[index];
            
                        if(element.includes("Properties.json")) {
                            const val = fileValues[index];
                            const f = zip2.file(val.name);
                            if(f != undefined) {
                                fileProperty = await f.async("string");
                                continue;
                            }
                        }
                            if(element.includes("Controls")) {
                            const val = fileValues[index];
                            if(val.name.includes('Controls'+ '\\' + '1.json')) continue;
                            const f = zip2.file(val.name);
                            if(f != undefined) {
                                const content = await f.async("string");
                                filesContent.push(content);
                            }
                        }
                    }

                    if(filesContent.length == 0) {
                        parent.postMessage({ pluginMessage: { type: 'notfound',message: 'definition.json not found!' } }, '*');
                        return;
                    } 
                    parent.postMessage({ pluginMessage: { type: 'import-json', filesContent,fileProperty } }, '*');
                });
            }

        }
    }
}

export default function SolutionContent ({
    yamlPicker}: Props) {
   
    return (
        <div id='basic-cont' role="tabpanel" aria-labelledby="Import">
            <br />
            <Label id='lbl'>Power Apps Solution</Label>
            <label htmlFor="filePicker" className="custom-file-upload">+ADD ZIP</label>
            <input type="file" id="filePicker" accept=".zip" onChange={(event) => {fileCheck(event);}} />
            <br />
            <br />
            <ColoredLine2 color="#F5F5F5" />
            <Label id='lbl'>Canvas Apps</Label>
            <Button id="yaml-button" onClick={() => yamlPicker.openFilePicker()}>+ ADD YAML(s)</Button>
        </div>
    )
}