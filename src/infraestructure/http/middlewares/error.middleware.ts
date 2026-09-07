import { Request, Response, NextFunction } from "express";
import { DomainException } from "../../../domain/exceptions/domain.exception";
import { logger } from "../../logger/logger";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // JSON mal formado
  if (err instanceof SyntaxError && "body" in err) {
    logger.warn({
      code: "INVALID_JSON",
      message: "Invalid JSON body",
    });

    res.status(400).json({
      code: "INVALID_JSON",
      message: "Invalid JSON body",
    });

    return;
  }

  // Errores de dominio
  if (err instanceof DomainException) {
    logger.warn({
      code: err.code,
      message: err.message,
    });

    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });

    return;
  }

  // Error desconocido
  logger.error(err);

  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  });
};
