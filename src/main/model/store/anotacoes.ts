import { db } from "../../database/index";

class Gastos {

    getAnnotations(id: number) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("CREATE TABLE IF NOT EXISTS ANOTACOES(id INTEGER PRIMARY KEY AUTOINCREMENT, ID_GASTO INTEGER, TITLE VARCHAR(200) NULL, CREATED_DATE VARCHAR(200) NULL)");
                const query = `SELECT id, ID_GASTO AS idRegister, TITLE AS annotations FROM ANOTACOES WHERE ID_GASTO = '${id}' `;
                db.all(query, (err: any, rows: unknown) => {
                    if (err)
                        reject(err);
                    resolve(rows);
                });
            })
        });
    }

    insertAnnotations() {
        
    }

}
export default new Gastos();