import React, { PropsWithChildren } from "react";
import { FolderSVG } from "../consts";

type Props = PropsWithChildren<{
    checkedLocal: boolean,
    toggleChecked: (buttonIndex: number) => void
}>;

export default function Driven ({
    checkedLocal,toggleChecked
}: Props) {

    return (
        <div id='driven' role="tabpanel" aria-labelledby="Data Maker">
            <br/>
            <div id='action' className="header">
                <div className="toggle-container">
                    <div className={`${checkedLocal ? "dialog-button" : "disabled-button"}`} onClick={() => toggleChecked(3)}>
                        <FolderSVG color={`${checkedLocal ? "#8971F6" : "#323232"}`}/>Local
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}