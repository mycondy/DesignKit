import { IComponent, ICompField, ICompProps, ICompForm, ICompContainer } from "./interfaces/IComponent";

export class Component implements IComponent {
    name: string;
    fill: string;
    width: number;
    height: number;
    fields: CompField[];
    forms?: CompForm[] | undefined;
    containers?: CompContainer[] | undefined;
    
    constructor(name: string,fill: string,width: number,height:number, fields: CompField[],forms: CompForm[] | undefined,containers?: CompContainer[] | undefined) {
        this.name = name;
        this.fill = fill;
        this.width = width;
        this.height = height;
        this.fields = fields;
        this.forms = forms;
        this.containers = containers;
    }
}

export class CompForm implements ICompForm {
    name: string;
    type: string;
    fields: CompField[];
    properties: CompProps[];
    
    constructor(name: string,type: string, fields: CompField[],props: CompProps[]) {
        this.name = name;
        this.type = type;
        this.fields = fields;
        this.properties = props;
    }
}

export class CompField implements ICompField {
    name: string;
    type: string;
    properties: CompProps[];
    
    constructor(name: string,type: string, props: CompProps[]) {
        this.name = name;
        this.type = type;
        this.properties = props;
    }
}

export class CompProps implements ICompProps {
    key: string;
    value: string;
    
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}

export class CompContainer implements ICompContainer {
    name: string;
    type: string;
    fields: CompField[];
    properties: CompProps[];
    innerContainers?: CompContainer[] | undefined;
    
    constructor(name: string,type: string, fields: CompField[],props: CompProps[],innerContainers?: CompContainer[]) {
        this.name = name;
        this.type = type;
        this.fields = fields;
        this.properties = props;
        this.innerContainers = innerContainers;
    }
}