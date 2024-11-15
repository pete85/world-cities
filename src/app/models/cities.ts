export interface Cities {
  data: City[];
  totalRecords: number;
}

export interface City {
  name: string;
  country: string;
  region?: string;
  geonameid?: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
