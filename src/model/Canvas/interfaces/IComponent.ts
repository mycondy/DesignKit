export interface IComponent {
    name : string;
    fill: string;
    width: number;
    height: number;
    fields: ICompField[];
    forms?: ICompForm[] |  undefined;
    containers?: ICompContainer[] | undefined;
 }

 export interface ICompField {
    name: string;
    properties: ICompProps[];
}

export interface ICompProps {
    key: string; 
    value: string;
}

export interface ICompForm {
    name: string;
    type: string;
    properties: ICompProps[];
    fields: ICompField[];
}

export interface ICompContainer {
    name: string;
    type: string;
    properties: ICompProps[];
    fields: ICompField[];
    innerContainers?: ICompContainer[] | undefined;
}