import { db } from "../../database/index";
import { EditData, InsertData } from "../gastosType";

class Gastos {

    getData() {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS gastos( id integer primary key AUTOINCREMENT, title varchar(200) NULL, description varchar(500) NULL, paidout bit(1) NULL, value varchar(200) NULL, duedate varchar(200) NULL)");
                const query = "SELECT ID, TITLE, DESCRIPTION, PAIDOUT, VALUE, DUEDATE FROM GASTOS ORDER BY DUEDATE DESC";
                db.all(query, (err: any, rows: unknown) => {
                    if (err)
                        reject(err);
                    resolve(rows);
                });
            })
        });
    }

    insertData(item: InsertData) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = `INSERT INTO GASTOS ( title, description, paidout, value, duedate ) VALUES ( '${item.title}', '${item.description}', '0', '${item.value}', '${item.dueDate}' )`
                db.run(query, (err: any) => {
                    if (err)
                        reject(err);
                });
            });
        });
    }

    updateData(id: number, bit: number) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = `UPDATE GASTOS SET PAIDOUT = ${String(bit)} where ID = ${String(id)}`;
                db.run(query, (err) => {
                    reject(err);
                });
            });
        });
    }

    deleteData(id: number) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = `DELETE FROM GASTOS WHERE ID = ${id}`;
                db.run(query, (err) => {
                    reject(err);
                });
            });
        });
    }
    
    editData(item: EditData) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = `UPDATE GASTOS SET TITLE = '${item.title}', DESCRIPTION = '${item.description}', VALUE = '${item.value}', DUEDATE = '${item.dueDate}' WHERE ID = ${item.id}`;
                db.run(query, (err) => {
                    reject(err);
                });
            })
        });
    }

}

export default new Gastos();