export interface CustomError {
  code: number;
  message: string;
  hint: string;
}

export interface Success {
  code: number;
  message: string;
  details: Record<string, unknown> | null;
}
