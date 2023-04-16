import fs from 'fs';
import sqlite3 from 'sqlite3'

const DB_PATH = "C:\\Users\\toxic\\OneDrive\\Documentos\\GastoAnotadoDB\\gt.sqlite";

fs.writeFile('log', DB_PATH, () => {});

export const db = new sqlite3.Database(DB_PATH);