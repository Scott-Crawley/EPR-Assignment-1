import { Serialisable } from "./Serialisable";

export class Station implements Serialisable {
    
    id              : number | undefined;
    name            : string;
    maxCapacity     : number;
    currentCapacity : number;

    constructor(_id: number | undefined, _name: string, _maxCapacity: number, _currentCapacity: number) {
        this.id                 = _id;
        this.name               = _name;
        this.maxCapacity        = _maxCapacity;
        this.currentCapacity    = _currentCapacity;
    }

    static fromRow(row: any): Station {
        return new Station(row.ID, row.Name, row.MaxCapacity, row.CurrentCapacity);
    }
}