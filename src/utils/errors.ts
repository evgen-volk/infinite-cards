import { DrinkTypeEnum } from "@/shared/types";

class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class InvalidDrinkTypeError extends ValidationError {
  constructor(providedType: string) {
    const allowedTypes = Object.values(DrinkTypeEnum).join(", ");
    super(
      `Invalid drink type: "${providedType}". Allowed types: ${allowedTypes}`
    );
  }
}
