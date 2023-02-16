import { Scooter } from "./Scooter";
import { Serialisable } from "./Serialisable";

export class Customer implements Serialisable {

    id                      : number | undefined;
    firstName               : string;
    lastName                : string;
    dob                     : number;
    strikes                 : number;
    curScooter              : Scooter | undefined;
    lastScooter             : Scooter | undefined;
    totalDistance           : number;
    lastDistance            : number;
    username                : string;
    password                : string;           // Hex string

    constructor(_id: number | undefined, _firstName: string, _lastName: string, _dob: number, _strikes: number, 
        _curScooter: number | undefined, _lastScooter: number | undefined, _totalDistance: number, 
        _lastDistance: number, _username: string, _password: string) {
        this.id             = _id;
        this.firstName      = _firstName;
        this.lastName       = _lastName;
        this.dob            = _dob;
        this.strikes        = _strikes;
        this.totalDistance  = _totalDistance;
        this.lastDistance   = _lastDistance;
        this.username       = _username;
        this.password       = _password;
        
        var curScooter = undefined;
        var lstScooter = undefined;
        if (typeof _curScooter == 'number') {
            // Get Scooter from database by ID
        }
        if (typeof _lastScooter == 'number') {
            // Get Scooter from database by ID
        }

        this.curScooter = curScooter;
        this.lastScooter = lstScooter;
    }

    static fromRow(row: any): Customer {
        return new Customer(row.id, row.firstname, row.lastname, row.dob, row.strikes,
             row.current_scooter, row.last_scooter, row.total_travel_dist, row.last_travel_dist,
             row.username, row.password);
    }
}