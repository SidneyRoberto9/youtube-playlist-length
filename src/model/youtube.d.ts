export interface IPlayListItems {
  nextPageToken: string;
  items: IPlayListItem[];
}

export interface IPlayListItem {
  contentDetails: {
    videoId: string;
  };
}

export interface IPlayListDuration {
  nextPageToken: string;
  items: IPlayListItemDuration[];
}

export interface IPlayListItemDuration {
  contentDetails: {
    duration: string;
  };
}

export interface TimeString {
  num: number;
  total: string;
  avg: string;
  1.25: string;
  1.5: string;
  1.75: string;
  2.0: string;
}
