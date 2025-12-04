import type { Place } from "./place";

export interface Company {
    id: number | null;
    name: string | null;
    website: string | null;
    industry: string | null;
    description: string | null;
    notifications_email: string | null;
    logo_path: string | null;
    place : Place | null;
}
