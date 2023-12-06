interface SupabaseError {
  code: string;
  message: string;
  hint: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}

interface NotificationData {
  id: number;
  created_at: string;
  updated_at: string;
  recipient_id: number;
  reference_id: number;
  sender_id: number;
  status: string;
  type: {
    id: number;
    name: string;
    created_at: string;
  };
  details: Record<string, string>;
}

export interface NotificationResponse
  extends SupabaseResponse<NotificationData[]> {}
