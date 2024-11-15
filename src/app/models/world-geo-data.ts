export interface WorldGeoData {
  daily_limit_left: number;
  data: WorldGeoDataCity
}

export interface WorldGeoDataCity {
  geonameid: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  division: Division;
  country: Country;
  currency: Currency;
  timezone: Timezone;
  wiki_id: string;
  wiki_url: string;
  status: string;
}

export interface Division {
  code: string
  geonameid: number
  name: string
  type: string
}

export interface Country {
  code: string
  name: string
  geonameid: number
  depends_on: any
}

export interface Currency {
  code: string
  name: string
}

export interface Timezone {
  timezone: string
  gmt_offset: number
  is_daylight_saving: boolean
  code: string
}
