export interface Image {
  href: string;
  thumbnail: string;
  original: string;
}

export interface Project {
  name: string;
  description: string;
  images: Image[];
  link?: string;
  date?: string;
}
