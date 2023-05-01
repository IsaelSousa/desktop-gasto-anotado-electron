import fs from 'fs';

type LogLevel = 'Info' | 'Warning' | 'Error' | 'Critical';

class LogServer {
    LogFile(msg: string, logLevel: LogLevel) {
        const fileExists = fs.existsSync('log');
        const date = new Date();
        const dateAndHour = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`;

        const message = `[${logLevel}] - ${dateAndHour} - Message: ${msg}\n`;

        if (fileExists) {
            fs.appendFile('log', message , (err) => {});
        } else {
            fs.writeFile('log', message, () => {});
        }
    }
}

export default new LogServer();