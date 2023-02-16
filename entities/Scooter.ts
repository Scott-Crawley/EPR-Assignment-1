import { Serialisable } from "./Serialisable";

export class Scooter implements Serialisable {
    
    id              : number | undefined;
    available       : boolean;
    lastUsed        : number;
    usedBy          : number;
    lastStationId   : number;
    coordinates     : string;
    charge          : number;

    constructor(_id: number | undefined, _available: boolean, _lastUsed: number, _usedBy: number,
        _lastStationId: number, _coordinates: string, _charge: number) {
        this.id             = _id;
        this.available      = _available;
        this.lastUsed       = _lastUsed;
        this.usedBy         = _usedBy;
        this.lastStationId  = _lastStationId;
        this.coordinates    = _coordinates;
        this.charge         = _charge;
    }

    static fromRow(row: any): Scooter {
        return new Scooter(row.id, row.available, row.last_used, row.last_used_by, row.last_station, row.coordinates, row.charge);
    }
}