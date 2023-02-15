import { Serialisable } from "./Serialisable";

export class Scooter implements Serialisable {
    
    id              : number | undefined;
    available       : boolean;
    lastUsed        : number;
    usedBy          : number;
    lastStationId   : number;
    coordinates     : string;

    constructor(_id: number | undefined, _available: boolean, _lastUsed: number, _usedBy: number, _lastStationId: number, _coordinates: string) {
        this.id             = _id;
        this.available      = _available;
        this.lastUsed       = _lastUsed;
        this.usedBy         = _usedBy;
        this.lastStationId  = _lastStationId;
        this.coordinates    = _coordinates;
        
    }

    static fromRow(row: any): Scooter {
        return new Scooter(row.ID, row.Available, row.LastUsed, row.UsedBy, row.LastStation, row.Coordinates);
    }
}