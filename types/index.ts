export interface VisitorFormData {
  name: string;
  workPhone: string;
  selectedPrograms: number[]; // Array of program IDs
}

export interface FormErrors {
  name?: string;
  workPhone?: string;
  selectedPrograms?: string;
}

export interface Program {
  id: number;
  program_name: string;
  category: string;
  is_active: boolean;
}

export interface VisitorMetadata {
  ip_address?: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  user_agent?: string;
  browser?: string;
  device?: string;
  submission_date?: string;
  submission_time?: string;
}

export interface VisitorRecord {
  id: string;
  name: string;
  work_phone: string;
  created_at: string;
}

export interface SubmissionData {
  visitor: {
    name: string;
    work_phone: string;
  };
  programs: number[];
  metadata: VisitorMetadata;
}
