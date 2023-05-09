import fs from 'fs';

export const fileShow = () => {
    return new Promise((resolve, reject) => {
        let posicao = __dirname.indexOf("gasto-anotado");
        if (posicao != -1) {
            let path = __dirname.substring(0, posicao + "gasto-anotado".length);
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

export const fileWrite = (filename: string) => {
    return new Promise((resolve, reject) => {
        let posicao = __dirname.indexOf("gasto-anotado");
        if (posicao != -1) {
            let path = __dirname.substring(0, posicao + "gasto-anotado".length);

            fs.writeFile(`${path}\\config`, filename, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            })
        }
    });
}