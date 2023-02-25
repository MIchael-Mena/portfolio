export interface Social {
  id?: number;
  name: string;
  url: string;
  icon: string;
}

export interface AboutMeData {
  id?: number;
  name: string;
  title: string;
  photo: string;
  description: string;
  social: Social[];

}
