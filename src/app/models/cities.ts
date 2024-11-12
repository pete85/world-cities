export interface Cities {
  data: City[];
  totalRecords: number;
}

export interface City {
  name: string;
  country: string;
  region?: string;
}
