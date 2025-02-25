import { Column, Grid, Row } from "../../../model/ModelDriven/Grid";
import { parseForm, parseGrid } from "../parsers/modelDrivenParser";

export function importJSONtoGrid(data: any) {
    try {
        const json = JSON.parse(data);
    
        parseJSONtoGrid(json,"none","View"); 
    } catch(error) {
        figma.notify("Invalid JSON file");
    }
}

function parseJSONtoGrid(json: any,language: string,output: string) {
    const columns: Column[] = [];
    let totalLines = 5;
    if (Array.isArray(json)) {

        const keys: String[] = [];
        totalLines = json.length;
        json.forEach(element => {
            const objkeys = Object.keys(element);
            objkeys.forEach(element => {
                if (!keys.includes(element)) keys.push(element);
            });
        });


        for (let i = 0; i < keys.length; i++) {
            const rows: Row[] = [];
            for (let index = 0; index < json.length; index++) {
                const element = json[index];
                const values = Object.values(element);

                const value = values[i] as any;
                rows.push(new Row(value));
            }
            columns.push(new Column(keys[i] as string, rows));
        }

    }
    const grid = new Grid(columns, totalLines,language);
    if(output == "View") parseGrid(grid);
    else parseForm(grid);
}