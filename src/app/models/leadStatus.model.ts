export interface LeadStatus{
  lead_id: number;
  owner: string;
  area: string;
  region: string;
  date: string;
  status: string;
  note?: string;
  policy?: string;
  income?: number
}