declare module "music-types" {
  interface AlbumRelease {
    id: string;
    title: string;
    releases: {
        id: string;
        media: {
            tracks: {
                title: string;
                length: string;
            }[];
        }[];
    }[];
  }

  interface Track {
    id: string;
    title: string;
    length: string;
    position: number;
    number: string;
  }

  interface Media {
    tracks: Track[];
  }

  interface TracklistResponse {
    media: Media[];
  }

  interface AlbumQueryResponse {
    releases: AlbumRelease[];
}
}