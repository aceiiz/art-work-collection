import { SortByDisplayEnum, SortByEnum } from "../../enum/sort-data.enum";

export const sortByType = [
  { value: '', label: 'Recommendation' },
  { value: SortByEnum.NAME, label: SortByDisplayEnum.NAME },
  { value: SortByEnum.ARTIST, label: SortByDisplayEnum.ARTIST },
  { value: SortByEnum.DATE, label: SortByDisplayEnum.DATE }
];
