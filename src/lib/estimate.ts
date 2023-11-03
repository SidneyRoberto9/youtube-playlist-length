'use client';

import { getPlaylistItemDuration, getPlaylistItems } from '@/lib/youtube';
import { TimeString } from '@/model/youtube';
import moment from 'moment';

export async function estimate(id: string) {
  let total = 0;
  let nextPage = '';
  let totalDuration = moment.duration('0');

  while (true) {
    const playlistItems = await getPlaylistItems(id);
    const nextPageToken = playlistItems.nextPageToken;
    const urlVideoIdList = playlistItems.items.map((item) => item.contentDetails.videoId);
    const urlVideoIdListJoin = urlVideoIdList.join(',');

    total += urlVideoIdList.length;

    const playlistItemsDuration = await getPlaylistItemDuration(urlVideoIdListJoin);

    const videoDurationFromVideoIdList = playlistItemsDuration.items.map(
      (item) => item.contentDetails.duration,
    );

    videoDurationFromVideoIdList.forEach((item) => {
      totalDuration = totalDuration.add(moment.duration(item));
    });

    if (nextPageToken != null) {
      nextPage = nextPageToken;
    } else {
      return getTimeString(totalDuration, total);
    }
  }
}

function getTimeString(totalDuration: moment.Duration, total: number): TimeString {
  return {
    num: total,
    total: getTime(totalDuration),
    avg: divideTime(totalDuration, total),
    1.25: divideTime(totalDuration, 1.25),
    1.5: divideTime(totalDuration, 1.5),
    1.75: divideTime(totalDuration, 1.75),
    2.0: divideTime(totalDuration, 2.0),
  } satisfies TimeString;
}

function divideTime(totalDuration: moment.Duration, divide: number) {
  const average = totalDuration.asSeconds() / divide;

  return getTime(moment.duration(average, 'seconds'));
}

function getTime(time: moment.Duration) {
  let responseString = '';

  const seconds = time.seconds();
  const minutes = time.minutes();
  const hours = time.hours();
  const days = time.days();
  const weeks = time.weeks();
  const months = time.months();
  const years = time.years();

  if (years > 0) {
    responseString += `${years} years, `;
  }

  if (months > 0) {
    responseString += `${months} months, `;
  }

  if (weeks > 0) {
    responseString += `${weeks} weeks, `;
  }

  if (days > 0) {
    responseString += `${days} days, `;
  }

  if (hours > 0) {
    responseString += `${hours} hours, `;
  }

  if (minutes > 0) {
    responseString += `${minutes} minutes, `;
  }

  if (seconds > 0) {
    responseString += `${seconds} seconds`;
  }

  return responseString;
}
