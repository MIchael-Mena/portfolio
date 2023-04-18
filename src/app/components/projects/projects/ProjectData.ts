export interface Image {
  id?: number;
  thumbnail: string;
  original: string;
  description?: string;
  position?: number;
  deleteUrl: string;
}

export interface ProjectData {
  id?: number;
  name: string;
  description: string;
  images: Image[];
  technologies: string[];
  githubLink?: string;
  link?: string;
  date: string;
}
