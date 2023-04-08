import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

if (!fs.existsSync(path.resolve(__dirname, '../../../../db.sqlite'))) {
    fs.writeFile(path.resolve(__dirname, '../../../../db.sqlite'), '',(err) => {
        fs.writeFile('log', String(err?.message), () => {});
    })
}

export const db = new sqlite3.Database(path.resolve(__dirname, '../../../../db.sqlite'));