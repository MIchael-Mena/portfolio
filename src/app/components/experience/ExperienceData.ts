export interface ExperienceData {
  id?: number;
  primaryInfo: string;
  secondaryInfo: string;
  /*  title?: string;
    institution?: string;
    job?: string;
    company?: string;*/

  initialDate: string;
  finalDate: string | null;
  description: string;
  link: string;
  position: number;
}
