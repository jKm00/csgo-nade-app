interface SupabaseError {
  code: string;
  message: string;
  hint: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}
