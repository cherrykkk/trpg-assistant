import winston from "winston";

const { combine, timestamp, printf } = winston.format;

const logFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss.SSS",
  }),
  printf((info) => {
    const { level, message, label, timestamp } = info;
    const labelTag = label ? ` [${label}] ` : " ";
    return `${timestamp}${labelTag}${level}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  defaultMeta: {
    service: "assistant",
  },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: logFormat,
      level: "info",
    })
  );
}

export default logger;
