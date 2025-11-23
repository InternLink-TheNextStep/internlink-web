import type { Company } from "./company";

export interface Internship { 
    id: number | null;
    title: string | null;
    slug: string | null;
    company: Company | null;
    description: string | null;
    type: string | null;
    start_at: string | null; 
    end_at: string | null;
}