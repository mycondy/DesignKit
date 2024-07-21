import React, { PropsWithChildren } from "react";
import {FolderSVG} from "../consts";

type Props = PropsWithChildren<{
    checkedSolution: boolean,
    toggleChecked: (buttonIndex: number) => void
}>;

export default function Import ({
    checkedSolution,toggleChecked
}: Props ) {

    return (
        <div id='import' role="tabpanel" aria-labelledby="Import">
            <br/>
            <div id='action' className="header">
                <div className="toggle-container">
                    <div className={`${checkedSolution ? "dialog-button" : "disabled-button"}`} onClick={() => toggleChecked(1)}>
                        <FolderSVG color={`${checkedSolution ? "#8971F6" : "#323232"}`}/>Local
                    </div>
                </div>
            </div>
            <br/>
        </div>
    )
}