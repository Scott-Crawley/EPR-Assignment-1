import { Scooter } from "./Scooter";
import { Serialisable } from "./Serialisable";

export class Customer implements Serialisable {

    id          : number | undefined;
    firstName   : string;
    lastName    : string;
    dob         : number;
    strikes     : number;
    scooter     : Scooter | undefined;

    constructor(_id: number | undefined, _firstName: string, _lastName: string, _dob: number, _strikes: number, _scooter: number | Scooter | undefined) {
        this.id         = _id;
        this.firstName  = _firstName;
        this.lastName   = _lastName;
        this.dob        = _dob;
        this.strikes    = _strikes;
        
        var scooter = undefined;
        if (typeof _scooter == 'number') {
            // Get Scooter from database by ID
        }
        this.scooter = scooter;
    }

    static fromRow(row: any): Customer {
        return new Customer(row.ID, row.Firstname, row.Lastname, row.DOB, row.Strikes, row.Scooter);
    }
}