import type { Company } from "./company";
import type { Industry } from "./industry";

export interface Internship {
  id: number | null;
  title: string | null;
  slug: string | null;
  company: Company | null;
  industry: Industry | null;
  file_path: string | null;
  description: string | null;
  type: string | null;
  start_at: string | null;
  end_at: string | null;
  is_favorited?: boolean; // Track if the internship is favorited by the user
}
