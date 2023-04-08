export interface Image {
  href: string;
  thumbnail: string;
  original: string;
}

export interface Project {
  name: string;
  description: string;
  images: Image[];
  github?: string;
  link?: string;
  date?: string;
}
