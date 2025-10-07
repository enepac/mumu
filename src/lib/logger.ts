import pino from "pino";

const level = process.env.LOG_LEVEL || "info";

export const logger = pino({
  level,
  formatters: {
    level: (label) => ({ level: label }),
  },
  transport:
    process.env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: { colorize: true },
        },
  timestamp: pino.stdTimeFunctions.isoTime,
});
