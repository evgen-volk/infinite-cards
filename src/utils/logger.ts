// logger.ts
interface LoggerConfig {
  appName: string;
  loggerName: string;
}

interface Formatter {
  format(level: string, message: string, meta?: Record<string, string>): string;
}

export class JsonFormatter implements Formatter {
  private space: number;

  constructor(options: { space?: number } = {}) {
    this.space = options.space ?? 2;
  }

  format(
    level: string,
    message: string,
    meta?: Record<string, string>
  ): string {
    const logObject = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      logger: meta?.loggerName,
      app: meta?.appName,
      ...(meta?.data && { data: JSON.stringify(meta.data) }),
    };

    return JSON.stringify(logObject, null, this.space);
  }
}

export class Logger {
  private readonly config: LoggerConfig;
  private readonly formatter: Formatter;

  constructor(config: LoggerConfig, formatter: Formatter) {
    this.config = config;
    this.formatter = formatter;
  }

  private log(level: string, message: string, data?: Record<string, string>) {
    const formatted = this.formatter.format(level, message, {
      ...this.config,
      ...(data ?? ""),
    });
    console.log(formatted);
  }

  info(message: string, data?: Record<string, string>) {
    this.log("info", message, data);
  }

  error(message: string, data?: Record<string, string>) {
    this.log("error", message, data);
  }

  warn(message: string, data?: Record<string, string>) {
    this.log("warn", message, data);
  }

  debug(message: string, data?: Record<string, string>) {
    this.log("debug", message, data);
  }
}
