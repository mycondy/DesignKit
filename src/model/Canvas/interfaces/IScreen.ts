export interface IScreen {
    name : string;
    width: number;
    height: number;
    fill: string;
    fields: IField[];
    forms?: IForm[] |  undefined;
    containers?: IContainer[] |  undefined;
 }

export interface IField {
    name: string;
    properties: IProps[];
}

export interface IProps {
    key: string; 
    value: string;
}

export interface IForm {
    name: string;
    type: string;
    properties: IProps[];
    fields: IField[];
}

export interface IContainer {
    name: string;
    type: string;
    properties: IProps[];
    fields: IField[];
    innerContainers?: IContainer[] | undefined;
}