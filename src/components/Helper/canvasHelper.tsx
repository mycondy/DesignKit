import { Button, Label } from "@fluentui/react-components";
import React from "react";

function onCreate(): void {
    parent.postMessage({ pluginMessage: { type: 'listprefixes' } }, '*');
}


export default function CanvasHelper () {
    return (
        <div id='basic-cont' role="tabpanel" aria-labelledby="Canvas Helper">
            <br />
            <Label id='lbl'>List of Prefixes</Label>
            <Button id='list-button' onClick={() => onCreate()}>GENERATE</Button>
      </div>
    )
}