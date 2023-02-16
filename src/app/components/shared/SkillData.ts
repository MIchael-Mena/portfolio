export interface IconData {
  id?: number;
  name: string;
  content: string;
}

export interface SkillData {
  id?: number;
  name: string;
  level: number;
  icon: IconData;
}
