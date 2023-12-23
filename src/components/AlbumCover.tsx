import { useEffect, useState } from "react";
import { coverArtApi } from "../store/services/coverArtService";
import { IAlbum } from "album-types";
import { useGetAlbumQuery } from "../store/services/musicService";
import { Box, Skeleton } from "@mui/material";

interface IAlbumCoverProps {
  album?: IAlbum;
  initialReleaseId?: string;
}

const AlbumCover: React.FC<IAlbumCoverProps> = ({ album, initialReleaseId }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const { data: albumData } = useGetAlbumQuery({ artist: album?.Artist || "", album: album?.Album.toString() || "" }, {
    skip: !!initialReleaseId || !album,
  });
  const releaseId = initialReleaseId || albumData?.id;

  useEffect(() => {
    setCoverUrl(null);
    if (!releaseId?.length) return;

    const fetchAlbumCover = async () => {
        const coverArt = await coverArtApi.downloadCoverArt(releaseId);
        setCoverUrl(coverArt);
    };

    fetchAlbumCover();
  }, [releaseId]);

  return (
    coverUrl ? (
      <Box
        sx={{
          borderRadius: 1,
          height: 48,
          width: 48
        }}
      >
        <Box
          component="img"
          src={coverUrl}
          sx={{
            borderRadius: 1,
            height: 48,
            width: 48
          }}
        />
      </Box>
    ) : (
      <Skeleton
        variant="rectangular"
        height={48}
        width={48}
        sx={{
          borderRadius: 1,
        }}
      />
    )
  );
};

export default AlbumCover;
