export interface News {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Olympiad {
  id: number;
  name: string;
  description: string;
  country: string;
  field: string;
  date: string;
  mode: string;
}
