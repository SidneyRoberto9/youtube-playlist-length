'use client';

import { estimate } from '@/lib/estimate';
import { TimeString } from '@/model/youtube';
import { Fragment, useRef, useState } from 'react';

export function PlaylistInput() {
  const [estimatedTime, setEstimatedTime] = useState<TimeString | null>(null);
  const playListUrlRef = useRef<HTMLInputElement>(null);

  async function handleEstimate() {
    const data = playListUrlRef.current?.value;

    let urlFormat = '';

    if (data?.includes('list=')) {
      urlFormat = data.split('list=')[1].split('&')[0];
    } else {
      if (data?.length === 34) {
        urlFormat = data;
      }
    }

    if (urlFormat != '') {
      const estimatedTime = await estimate(urlFormat);

      setEstimatedTime(estimatedTime);

      if (playListUrlRef.current) {
        playListUrlRef.current.value = '';
      }
    }
  }

  function handleClean() {
    if (playListUrlRef.current) {
      playListUrlRef.current.value = '';
      setEstimatedTime(null);
    }
  }

  return (
    <Fragment>
      <div className="flex sm:flex-row flex-col items-center justify-center max-w-2xl w-full gap-4 m-auto sm:px-2  px-4">
        <input
          ref={playListUrlRef}
          type="text"
          className="w-full p-2 px-4 border-2 rounded-xl border-stone-900 placeholder:text-stone-900 placeholder:opacity-75 dark:placeholder:text-stone-300
      "
          placeholder="youtube.com/playlist?list=ID"
        />
        <div className="flex items-center justify-around sm:w-36 w-full">
          <button
            onClick={handleEstimate}
            className="w-36 p-2 px-4 border-2 rounded-xl border-stone-900 dark:border-stone-50">
            Estimate
          </button>

          <button
            onClick={handleClean}
            className="sm:hidden block w-36 p-2 px-4 border-2 rounded-xl border-stone-900 dark:border-stone-50">
            Clear
          </button>
        </div>
      </div>
      <div className="my-2 sm:max-w-xl max-w-sm text-sm p-4 text-center flex flex-col items-center justify-center m-auto">
        <p>You can enter a playlist link, playlist ID or even a video link from the playlist!</p>
        <p>This only works with playlists with upto 500 videos.</p>
      </div>

      {estimatedTime && (
        <Fragment>
          <hr className="sm:my-8 my-4 h-0.5 border-t-0 bg-stone-900 opacity-100 dark:bg-stone-100  sm:max-w-lg max-w-xs m-auto" />
          <div className="my-2 flex flex-col gap-2 items-center justify-center m-auto">
            <p className="sm:block flex flex-col items-center">
              No of videos <strong>{estimatedTime.num}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              Average length of video <strong>{estimatedTime.avg}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              Total length of playlist <strong>{estimatedTime.total}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              At 1.25x <strong>{estimatedTime['1.25']}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              At 1.50x <strong>{estimatedTime['1.5']}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              At 1.75x <strong>{estimatedTime['1.75']}</strong>
            </p>
            <p className="sm:block flex flex-col items-center">
              At 2.00x <strong>{estimatedTime['2']}</strong>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
