import { Action, Authentication, ConnectionObject, ConnectionReference, Definition, Flow, Host, Input, Item, Parameter, Properties, Recurrence, Trigger } from "../../../model/PowerAutomate/Flow";

export function importDefinitionJSON(file: any,flowName: string, flowID: string) {
    const json = file;
    const topParent = JSON.parse(json);
    
    const id = topParent.id == undefined ? flowID : topParent.id;
    const name = topParent.name == undefined ? flowName : topParent.name;

    const properties = topParent.properties;
    if(properties == undefined) return;

    const propID = properties.apiId;
    const displayName = properties.displayName == undefined ? flowName : properties.displayName;

    const reference = properties.connectionReferences;
    const triggers = properties.definition.triggers;

    if(triggers == undefined) return;
    
    let { triggerType, triggerMetadata, reccurence, kind } = getTrigger(triggers);

    if(reference != undefined) {
        const refKeys = Object.keys(reference);
        const refValues = Object.values(reference);

        const references: ConnectionReference[] = [];

        for (let index = 0; index < refValues.length; index++) {
            const refkey = refKeys[index];
            const refval = refValues[index];

            if(refval != null) {
                const refID = (refval as any).id; 
                const connectionName = (refval as any).connectionName; 
                const source = (refval as any).source; 
                const tier = (refval as any).tier; 
                
                const connnectionObject = new ConnectionObject(refkey,connectionName,source,refID,tier);
                references.push(new ConnectionReference(connnectionObject));
            }
        }
    }
    const defActions: Action[] = [];
    
    const definition = properties.definition;
    if(definition != undefined) {   
        const actions = definition.actions;
        
        fillActions("",undefined,defActions,actions);
    } 

    const sortedFirstAction = findFirstActionAndMove(defActions);
    const sortedParentActions = sortParentActionsAndMove(sortedFirstAction);

    const def = new Definition(sortedParentActions);
    const connectionReferences: ConnectionReference[] = [];
    fillConnectionRefs(properties.connectionReferences,connectionReferences);

    const trigger = new Trigger(triggerType,triggerMetadata,kind,reccurence);

    const prop = new Properties(propID,displayName,def,connectionReferences,trigger);
    const flow = new Flow(name,id,prop);
    return flow;
}

function getTrigger(triggers: any) {
    const manualTriggerType = triggers.manual;
    let triggerType = "Request";
    let triggerMetadata = "";
    let kind = "";

    let reccurence = undefined;

    if (manualTriggerType != undefined) {
        triggerMetadata = manualTriggerType.metadata.operationMetadataId;
        kind = manualTriggerType.kind;
    } else {
        const reccurenceTriggerType = triggers.Recurrence;
        if (reccurenceTriggerType != undefined) {
            triggerType = reccurenceTriggerType.type;
            triggerMetadata = reccurenceTriggerType.metadata.operationMetadataId;

            const frequency = reccurenceTriggerType.recurrence.frequency;
            const interval = Number(reccurenceTriggerType.recurrence.interval);
            const starttime = reccurenceTriggerType.recurrence.startTime;

            reccurence = new Recurrence(frequency, interval, starttime);
        }
    }
    return { triggerType, triggerMetadata, reccurence, kind };
}

function fillActions(parent: string,val: any | undefined, defActions: Action[], actions: any) {
    if(actions != undefined) {
        const actKeys = Object.keys(actions);
        const actValues = Object.values(actions);

        for (let index = 0; index < actValues.length; index++) {
            const actkey = actKeys[index];
            const actval = actValues[index];
            const type = (actval as any).type;
            const runAfter = (actval as any).runAfter;
            
            const runAfterKeys = Object.keys(runAfter);
            let after = "";
            if(runAfterKeys.length > 0) {
                after = runAfterKeys[0];
            }

            const metadataID = (actval as any).metadata.operationMetadataId;
            
            if(type == "OpenApiConnection") {
                const inputs = (actval as any).inputs;
                const authentication = inputs.authentication;
                const host = inputs.host;
                const parameters = inputs.parameters;

                const defAuthentication = new Authentication(authentication.value,authentication.type);
                const defHost = new Host(host.apiId,host.connectionName,host.operationId);
                const defParam = new Parameter(parameters.dataset,parameters.table);
                
                const defInput = new Input(actkey,defHost,defParam,defAuthentication);
                
                const defItem = new Item(actkey,type,defInput,metadataID,after);
                const defAction = new Action(parent,defItem);
                defActions.push(defAction);
                continue;
            }
            
            if(type == "Foreach") {
                inp = (actval as any).foreach;
            }
            const act = (actval as any).actions;
            const expression = (actval as any).expression;
            
            var exp = undefined;
            if(expression != undefined) {
                const actValues = Object.values(expression);
                exp = (actValues[0] as string[])[0];
            }
            const defItem = new Item(actkey,type,exp != undefined ? exp : inp,metadataID,after);
            const defAction = new Action(parent,defItem);
            defActions.push(defAction);

            if(act != undefined) {
                const subActions: Action[] = [];
                fillActions(actkey,actval,subActions,act);
     
                subActions.forEach(element => {
                    defActions.push(element);
                });
            }
        }

    } else {
        var inp = undefined;
        if(val != undefined){
            inp = val.inputs;
        }    
        const tp = val.type;
        const mt = val.metadata.operationMetadataId;
        const defItem = new Item(parent,tp,inp,mt,"");
        const defAction = new Action(parent,defItem);
        defActions.push(defAction);
    }  
}
function fillConnectionRefs(connectionReferences: any, refs: ConnectionReference[]) {
    if(connectionReferences != undefined) {
        const refKeys = Object.keys(connectionReferences);
        const refValues = Object.values(connectionReferences);

        for (let index = 0; index < refValues.length; index++) {
            const refkey = refKeys[index];
            const refval = refValues[index];
            
            const name = (refval as any).connectionName;
            const source = (refval as any).source;
            const id = (refval as any).id;
            const tier = (refval as any).tier;

            const conObj = new ConnectionObject(refkey,name,source,id,tier);
            const res = new ConnectionReference(conObj);

            refs.push(res);
        }
    }
}

function findFirstActionAndMove(defActions: Action[]) {
    const item = defActions.findIndex(val=> val.parent.length === 0 && val.item.runAfter.length === 0);
    if(item != undefined) return moveItem(defActions,item,0);

    return defActions;
}

function sortParentActionsAndMove(defActions: Action[]) {

    for (let i = 0; i < defActions.length; i++) {
        const item = defActions[i];
        if(item.item.runAfter == "") continue;

        const currentItemIndex = i;
        const previousIndex = defActions.findIndex(val=> val.item.parent === item.item.runAfter);

        if(currentItemIndex - 1 == previousIndex) continue;

        const previousItem = defActions[currentItemIndex - 1];
        const nextIndexToBeMoved = defActions.findIndex(val=> val.item.runAfter === previousItem.item.parent);

        if(nextIndexToBeMoved == -1) continue;

        const itemRemoved = defActions.splice(nextIndexToBeMoved,1);
        defActions.splice(currentItemIndex,0,itemRemoved[0]);
    }
    return defActions;
}

function moveItem(arr: Action[], fromIndex: number, toIndex: number){
    const itemRemoved = arr.splice(fromIndex, 1); 
    arr.splice(toIndex, 0, itemRemoved[0]);
    return arr;
  }