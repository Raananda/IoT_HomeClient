import { AppData } from "../../models/AppData";

export class AddAppData {

    static readonly type = '[AppData] Add main-view';
    constructor(public payload: AppData) { }
    
}