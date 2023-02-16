import { Action } from "./Action";
import { Customer } from "./Customer";
import { Serialisable } from "./Serialisable";

export class ScooterLog implements Serialisable {

    id          : number | undefined;
    action      : Action;
    description : string;
    customer    : Customer | undefined;
    date        : number;

    constructor(_id: number | undefined, _action: string, _description: string, _customer: number | undefined, _date: number) {
        this.id             = _id;
        this.action         = Action[_action];
        this.description    = _description;
        this.date           = _date;

        var customer = undefined;
        if (typeof _customer != "undefined") {
            // Get Customer by ID from database
        }

        this.customer = customer;
    }

    static fromRow(row: any): ScooterLog {
        return new ScooterLog(row.id, row.action, row.description, row.customer, row.date);
    }
}