import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AlbumQueryResponse, AlbumRelease, Track, TracklistResponse } from 'music-types';

export const musicApi = createApi({
    reducerPath: 'musicApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://musicbrainz.org/ws/2/' }),
    endpoints: (builder) => ({
      getAlbum: builder.query<AlbumRelease, { artist: string; album: string }>({
        query: ({ artist, album }) => `release/?query=artist:${artist}+AND+release:${album}&fmt=json`,
        transformResponse: (response: AlbumQueryResponse): AlbumRelease => {
            if (response && response.releases && response.releases.length > 0) {
                return response.releases[0];
            }
            throw new Error('Album not found');
        },
      }),
      getTracklist: builder.query<Track[], string>({
          query: (releaseId) => `release/${releaseId}?inc=recordings&fmt=json`,
          transformResponse: (response: TracklistResponse): Track[] => {
              if (response && response.media && response.media.length > 0) {
                  return response.media[0].tracks;
              }
              throw new Error('Tracklist not found');
          },
      }),
    }),
});

export const { useGetAlbumQuery, useGetTracklistQuery } = musicApi;
