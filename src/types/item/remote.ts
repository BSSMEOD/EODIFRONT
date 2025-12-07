export interface GetItemDetailRes {
  id: number;
  name: string;
  image_url: string;
  found_at: string;
  found_place: string;
  found_place_detail: string;
}

export interface GetItemListParams {
  page?: number;
  size?: number;
  status: string;
  place_id?: number;
}

export interface GetItemListRes {
  content: GetItemDetailRes[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
  is_last: boolean;
  last: boolean;
}
