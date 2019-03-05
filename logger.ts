import winston from 'winston';

const myFormat = winston.format.printf(info => `${info.timestamp} ${info.level.toUpperCase()} ${info.message}`);

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});