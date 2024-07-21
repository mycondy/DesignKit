import { Button, Label, Subtitle1, Textarea } from "@fluentui/react-components";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    grid: string
}>;

function onCreate(): void {
    const input = document.getElementsByName("grid")[0].innerHTML;

    parent.postMessage({ pluginMessage: { type: 'grid',input } }, '*');
}

let out = "View";

export default function JsonXMLContent ({
    grid}: Props) {
   
    
    return (
        <div id='parentContent' role="tabpanel" aria-labelledby="JSONXML">
            <br />
            <Subtitle1 id='subheading'>Fake Data Generator</Subtitle1>
            <br />
            <Textarea className="longArea" name='grid' appearance='outline' id={grid} />
            <br />
            <br />
            <Button className='btnLong2' appearance="primary" onClick={() => onCreate()}>GENERATE</Button>
        </div>
    )
}