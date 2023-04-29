import { fileShow } from '../../database/index';
import sqlite3 from 'sqlite3'

class Annotations {

    getAnnotations(id: number) {
        return new Promise((resolve, reject) => {
            fileShow()
            .then((resp: any) => {
                const db = new sqlite3.Database(resp);
                db.serialize(() => {
                    db.run("CREATE TABLE IF NOT EXISTS anotacoes(id INTEGER PRIMARY KEY AUTOINCREMENT, ID_GASTO INTEGER, TITLE VARCHAR(200) NULL, CREATED_AT VARCHAR(200) NULL)");
                    const query = `SELECT id, ID_GASTO AS idRegister, TITLE AS annotations FROM ANOTACOES WHERE ID_GASTO = '${id}' `;
                    db.all(query, (err: any, rows: unknown) => {
                        if (err)
                            reject(err);
                        resolve(rows);
                    });
                });
            })

        });
    }

    insertAnnotations(idAnnotations: number, annotations: string) {
        return new Promise((resolve, reject) => {
            fileShow()
            .then((resp: any) => {
                const db = new sqlite3.Database(resp);
                db.serialize(() => {
                    var datetime = new Date();
                    const query = `INSERT INTO ANOTACOES (ID_GASTO, TITLE, CREATED_AT) VALUES (${idAnnotations}, '${annotations}', '${datetime.toISOString()}') `;
                    db.run(query, (err) => {
                        reject(err);
                    });
                });
            });


        })
    }

    deleteAnnotations(idAnnotations: number) {
        return new Promise((resolve, reject) => {
            fileShow()
            .then((resp: any) => {
                const db = new sqlite3.Database(resp);
                db.serialize(() => {
                    const query = `DELETE FROM ANOTACOES WHERE ID = ${idAnnotations}`;
                    db.run(query, (err) => {
                        reject(err);
                    });
                });
            });
        });
    }

    deleteAnnotationsPerGastos(idGasto: number) {
        return new Promise((resolve, reject) => {
            fileShow()
            .then((resp: any) => {
                const db = new sqlite3.Database(resp);
                db.serialize(() => {
                    const query = `DELETE FROM ANOTACOES WHERE ID_GASTO = ${idGasto}`;
                    db.run(query, (err) => {
                        reject(err);
                    });
                });
            });
        });
    }

}
export default new Annotations();