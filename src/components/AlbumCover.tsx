import { useEffect, useState } from "react";
import { coverArtApi } from "../store/services/coverArtService";
import { IAlbum } from "album-types";
import { useGetAlbumQuery } from "../store/services/musicService";
import { Box, Skeleton, SvgIcon } from "@mui/material";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface IAlbumCoverProps {
  album?: IAlbum;
  coverUrl?: string | null;
}

const AlbumCover: React.FC<IAlbumCoverProps> = ({ album, coverUrl: initialCoverUrl }) => {
  console.log(album, initialCoverUrl)
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCoverUrl || null);
  const [isError, setIsError] = useState(false);

  const { data: albumData, isError: isAlbumError } = useGetAlbumQuery({ artist: album?.Artist || "", album: album?.Album.toString() || "" }, {
    skip: !!initialCoverUrl || !album,
  });
  const releaseId = albumData?.id;

  useEffect(() => {
    if (initialCoverUrl) {
      setCoverUrl(initialCoverUrl);
      setIsError(false);
      return;
    }

    setCoverUrl(null);
    setIsError(false);
    if (!releaseId?.length || isAlbumError) return;

    const fetchAlbumCover = async () => {
      const coverArt = await coverArtApi.downloadCoverArt(releaseId);
      
      if (!coverArt) setIsError(true);

      setCoverUrl(coverArt);
    };

    fetchAlbumCover();
  }, [releaseId, initialCoverUrl, isAlbumError]);

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
      (isError || isAlbumError) ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            height: 48,
            width: 48,
            backgroundColor: "neutral.100"
          }}
        >
        <SvgIcon color="disabled">
          <QuestionMarkCircleIcon />
        </SvgIcon>
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
    )
  );
};

export default AlbumCover;
