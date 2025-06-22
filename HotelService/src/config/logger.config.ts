import winston from 'winston';
import { getCorrelationId } from '../utils/helpers/request.helpers';
import DailyRotateFile from 'winston-daily-rotate-file';
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.json(), // Format of message as json
        winston.format.printf(({ timestamp, level, message, ...data }) => {
            const output = { 
                level, 
                message, 
                timestamp, 
                correlationId: getCorrelationId(), 
                data };
            return JSON.stringify(output);
        })  
    ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: "logs/app.log" }) // creates logs folder and saves logs in app.log file
        new DailyRotateFile({
            filename: 'logs/%DATE%-app.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

export default logger;