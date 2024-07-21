import { Button, Label } from "@fluentui/react-components";
import React from "react";



function onCreate(type: string): void {
    if (type == "export") parent.postMessage({ pluginMessage: { type: 'exportCanvas' } }, '*');
}

export default function CanvasExport () {
    return (
        <div id='basic-cont' role="tabpanel" aria-labelledby="Canvas Export">
            <br />
            <Label id='lbl'>Export Screen(s)</Label>
            <Button id='export-button' onClick={() => onCreate("export")}>EXPORT</Button>
        </div>
    )
}