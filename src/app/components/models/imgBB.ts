interface ImageDetails {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

interface ImgBB {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImageDetails; // Tamaño original
  thumb: ImageDetails;
  medium?: ImageDetails;
  delete_url: string;
}

interface ImgBBResponse {
  data: ImgBB;
  success: boolean;
  status: number;
}

export { ImgBB, ImgBBResponse };
