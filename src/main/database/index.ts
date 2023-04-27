import fs from 'fs';

const DB_PATH = "D:\\GastoAnotadoDB\\gt.sqlite";

export const fileShow = () => {
    return new Promise((resolve, reject) => {
        let posicao = __dirname.indexOf("desktop-gasto-anotado-electron");
        if (posicao != -1) {
            let path = __dirname.substring(0, posicao + "desktop-gasto-anotado-electron".length);
            fs.readFile(`${path}\\config`, 'utf-8', (err, data) => {
                if (err) {
                    fs.writeFile(`${path}\\config`, `${path}\\config`, () => {});
                    reject(err);
                }
                resolve(data);
            });
        }
    });
}