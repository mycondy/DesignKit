import React, { PropsWithChildren } from "react";
import { CanvasSVG } from "../consts";

type Props = PropsWithChildren<{
    checkedCanvas: boolean,
    toggleChecked: (buttonIndex: number) => void
}>;

export default function Export({
    checkedCanvas,toggleChecked
}: Props) {

    return (
        <div id='driven' role="tabpanel" aria-labelledby="Export">
            <br/>
            <div id='action' className="header">
                <div className="toggle-container">
                    <div className={`${checkedCanvas ? "dialog-button" : "disabled-button"}`} onClick={() => toggleChecked(5)}>
                        <CanvasSVG color={`${checkedCanvas ? "#8971F6" : "#323232"}`}/>Canvas
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}