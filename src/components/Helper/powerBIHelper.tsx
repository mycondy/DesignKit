import { Button, Input, Label, Subtitle1 } from "@fluentui/react-components";
import React, { ChangeEvent, PropsWithChildren, useState } from "react";

type Props = PropsWithChildren<{
    bckgBI: string,
    controlBI: string,
    columnsBI: string,
    rowsBI: string,
}>;

function onCreate(): void {
    const background = (document.getElementsByName("bgBI")[0] as HTMLInputElement).value;
    const control = (document.getElementsByName("cntBI")[0] as HTMLInputElement).value;
    const columns = document.getElementsByName("colsBI")[0].getAttribute("value");
    const rows = document.getElementsByName("rowsBI")[0].getAttribute("value");

    parent.postMessage({ pluginMessage: { type: 'powerbi',background,control, columns, rows } }, '*');
}

export default function BIHelper ({
    bckgBI,controlBI,columnsBI,rowsBI
}: Props ) {

    const [backVal, setBackVal] = useState("#000000");
    const [controlVal, setControlVal] = useState("#000000");

    const onBackChanged = (ev: ChangeEvent<HTMLInputElement>) => {
        setBackVal(ev.target.value);
    }

    const onContChanged = (ev: ChangeEvent<HTMLInputElement>) => {
        setControlVal(ev.target.value);
    }

    return (
        <div id='basic-cont' role="tabpanel" aria-labelledby="Power BI Helper">
            <br />
            <Subtitle1 id='subheading2'>Canvas Layout Background Generator</Subtitle1>
            <br />
            <br />
            <div id='twoColContent'>
                <div className='col-2'>
                    <Label id='lbl' htmlFor={bckgBI}>Background Color *</Label>
                    <br />
                    <div id="inner-colour-div">
                        <input name='bgBI' id={bckgBI} className='inpC' type="color" onChange={onBackChanged} />
                        <input id="colourInp" value={backVal} readOnly/>
                    </div>
                </div>
                <div className='col-2'>
                    <Label id='lbl' htmlFor={controlBI}>Control Color *</Label>
                    <br />
                    <div id="inner-colour-div">
                        <input name='cntBI' id={controlBI} className='inpC' type="color" onChange={onContChanged} />
                        <input id="colourInp" value={controlVal} readOnly/>
                    </div>
                </div>
            </div>
                <br />
            <div id='twoColContent'>
                <div className='col-2'>
                    <Label id='lbl' htmlFor={columnsBI}>Number of Columns *</Label>
                    <Input name='colsBI' id={columnsBI} className='inpD' appearance='outline' type="text" />
                </div>
                <div className='col-2'>
                    <Label id='lbl' htmlFor={rowsBI}>Number of Rows *</Label>
                    <Input name='rowsBI' id={rowsBI} className='inpD' appearance='outline' type="text" />
                </div>
             </div>
            <br />
            <Button appearance='primary' className='btnLong' onClick={() => onCreate()}>GENERATE</Button>
        </div>
    )
}