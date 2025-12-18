export interface User {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  cv_path?: string | null;
  cv_url?: string | null;
}
