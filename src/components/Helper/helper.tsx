import React, { PropsWithChildren } from "react";
import { CanvasSVG, PowerBISVG } from "../consts";

type Props = PropsWithChildren<{
    checkedCanvasH: boolean,
    checkedBI: boolean,
    toggleChecked: (buttonIndex: number) => void
}>;


export default function Helper ({
    checkedCanvasH,checkedBI,toggleChecked
}: Props) {


    return (
        <div id='helper' role="tabpanel" aria-labelledby="Helper">
            <br/>
            <div id='action' className="header">
                <div className="toggle-container">
                    <div className={`${checkedCanvasH ? "dialog-button" : "disabled-button"}`} onClick={() => toggleChecked(7)}>
                        <CanvasSVG color={`${checkedCanvasH ? "#8971F6" : "#323232"}`}/>Canvas
                    </div>
                    <div className={`${checkedBI ? "dialog-button" : "disabled-button"}`} onClick={() => toggleChecked(8)}>
                        <PowerBISVG color={`${checkedBI ? "#8971F6" : "#323232"}`}/>Power BI
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}