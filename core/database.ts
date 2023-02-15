import * as log from './logging';
import * as mdb from 'mariadb';

import { Serialisable } from "../entities/Serialisable";
import { Customer } from '../entities/Customer';
import { Scooter } from '../entities/Scooter';
import { Station } from '../entities/Station';

const p = log.prefix;

var db: mdb.PoolConnection;

export function connect(): boolean {
    const host = process.env.DB_HOST || "http://localhost:3306";
    const user = process.env.DB_USER || "root";

    const pool = mdb.createPool({ host: host, user: user, connectionLimit: 1 });
    pool.getConnection()
        .then((connection) => db = connection)
        .catch((err) => console.error(err));

    return db != undefined;
}

export function getById(type: Serialisable, id: number): Serialisable | undefined {
    var entity: any;
    var eName:  string;
    var table:  string;
    switch (type) {
        case Customer:
            table  = "customers";
            entity = Customer;
            eName  = "Customer";
            break;
        case Scooter:
            table  = "scooters";
            entity = Scooter;
            eName  = "Scooter";
            break;
        case Station:
            table  = "stations";
            entity = Station;
            eName  = "Station";
            break;
        default:
            log.out(p.ERROR, `Invalid type: ${type.constructor.name}`);
            log.out(p.DEBUG, JSON.stringify(type));
            eName  = "Unknown";
            return undefined;
    }

    const sql = `SELECT * FROM ${table} WHERE id = ${id}`;
    const row = query(sql);
    if (!row) {
        log.out(p.WARN, `No ${eName} found with ID: ${id}`);
        return undefined;
    }

    return entity.fromRow(row);
}

export function insert(type: Serialisable): any {
    var sql:    string;
    var args:   any;
    switch (type.constructor) {
        case Customer:
            sql = `INSERT OR IGNORE INTO customers VALUES (NULL, ?, ?, ?, ?, ?)`;
            var c = type as Customer;
            var scooter: Scooter | number | undefined = c.scooter;
            const cast = scooter as Scooter;
            if (cast) scooter = cast.id;
            args = [c.firstName, c.lastName, c.dob, c.strikes, scooter];
            break;
        case Scooter:
            sql = `INSERT OR IGNORE INTO scooters VALUES (NULL, ?, ?, ?, ?, ?)`;
            var sc = type as Scooter;
            args = [sc.available, sc.lastUsed, sc.usedBy, sc.lastStationId, sc.coordinates];
            break;
        case Station:
            sql = `INSERT OR IGNORE INTO stations VALUES (NULL, ?, ?, ?)`;
            var st = type as Station;
            args = [st.name, st.maxCapacity, st.currentCapacity];
            break;
        default:
            log.out(p.ERROR, `Invalid type: ${type}`);
            return;
    }
    return query(sql, args);
}

export function updateById(type: Serialisable, id: string | number, columns: Array<string>, values: Array<string | number>): any {
    var table: string;
    switch (type) {
        case Customer:
            table = `customers`;
            break;
        case Scooter:
            table = `scooters`;
            break;
        case Station:
            table = `stations`;
            break;
        default:
            log.out(p.ERROR, `Invalid type: ${type}`);
            return;
    }

    const whereStmt = ` WHERE id = ${id}`;
    if (columns.length == values.length) {
        var sql = `UPDATE ${table} SET `;
        columns.forEach((column, i) => {
            sql = typeof values[i] == "number" 
            ? sql + `${column} = ${values[i]}, ` 
            : sql + `${column} = '${values[i]}', `  
        });
        sql = sql.substring(0, sql.lastIndexOf(',')) + whereStmt;
        return query(sql);
    }
    log.out(p.ERROR, `Attempt to update ${columns.length} columns with ${values.length} values`);
}

function query(stmt: string, ...params: any): any {
    var result: any = undefined;
    try {
        db.query(stmt, params)
            .then((res) => result = res)
            .catch((err) => { throw err });
    }
    catch (err: any) {
        log.out(p.ERROR, `Failed to execute statement (${stmt}): ${err}`);
        log.out(p.DEBUG, `Args: ${params}`);
    }
    return result;
}