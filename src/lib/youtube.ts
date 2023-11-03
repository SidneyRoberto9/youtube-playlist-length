'use client';
import axios from 'axios';

import { IPlayListItems, IPlayListDuration } from '@/model/youtube';

const playlistItemsInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/playlistItems',
  params: {
    part: 'contentDetails',
    maxResults: 50,
    fields: 'items/contentDetails/videoId,nextPageToken',
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  },
});

const playlistItemDuration = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/videos',
  params: {
    part: 'contentDetails',
    fields: 'items/contentDetails/duration',
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  },
});

export async function getPlaylistItems(playlistId: string) {
  const { data } = await playlistItemsInstance.get<IPlayListItems>('', {
    params: {
      playlistId,
    },
  });

  return data;
}

export async function getPlaylistItemDuration(id: string) {
  const { data } = await playlistItemDuration.get<IPlayListDuration>('', {
    params: {
      id,
    },
  });

  return data;
}
