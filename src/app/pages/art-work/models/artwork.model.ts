import { BasePageList } from "src/app/core/models/base-page-list.model";


export interface ArtWorkListSearchCriteria {
  searchCriteria?: string;
  page?: number;
  size?: number;
  total?: number;
}

export interface ArtWorkListResponse extends BasePageList<ArtWorkListContent> { }

export interface ArtWorkListContent {
  id: number;
  title: string;
  artist_title: string;
  place_of_origin: string;
  date_start: string;
  date_end: string;
  medium_display: string;
  image_id: string;
  style_titles: string[];
}

