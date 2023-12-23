import { Box, Button, Card, CardContent, CardHeader, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import { useLocalStorage } from "usehooks-ts";
import { getAlbumById, getRandomAlbum } from "../../../../utils/data.utils";
import { LocalStorageKeys } from "../../../../enums/enums";
import AlbumTracklist from "./fragments/Tracklist";

const Album: React.FC = () => {
  const [lastAlbum, setLastAlbum] = useLocalStorage<number>(LocalStorageKeys.LastAlbum, 0);
  const [albumsListened, setAlbumsListened] = useLocalStorage<number[]>(LocalStorageKeys.AlbumsListened, []);
  const [album, setAlbum] = useState(getAlbumById(lastAlbum) || getRandomAlbum(albumsListened));

  useEffect(() => {
    setLastAlbum(album.Rank);
  }, [album, setLastAlbum])

  const handleRefresh = () => {
    const newAlbum = getRandomAlbum(albumsListened);

    setAlbum(newAlbum);
  }

  const handleSaveAsListened = () => {
    setAlbumsListened([...albumsListened, album.Rank]);
    handleRefresh();
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Card sx={{ position: "relative", zIndex: 1 }}>
        <CardHeader
          action={(
            <Button
              color="inherit"
              size="medium"
              startIcon={(
                <SvgIcon fontSize="small">
                  <ArrowPathIcon />
                </SvgIcon>
              )}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          )}
          title="Album"
          subheader={`You've listened ${albumsListened.length} of 500 albums`}
        />
        <CardContent sx={{display: "flex", flexFlow: "column nowrap", gap: 2}}>
          <Stack gap={1}>
          <Typography variant="subtitle1">
              Nº {album.Rank}
            </Typography>
            <Typography variant="h4">
              {album.Album}
            </Typography>
            <Typography
              variant="subtitle1"
              >
              {album.Artist}
            </Typography>
            <Typography
              variant="subtitle2"
              >
              {album.Info}
            </Typography>
            <Typography
              variant="body1"
              >
              {album.Description}
            </Typography>
          </Stack>
          <Stack display="flex">
            <Button
              color="primary"
              size="medium"
              variant="contained"
              startIcon={(
                <SvgIcon fontSize="medium">
                  <CheckCircleIcon />
                </SvgIcon>
              )}
              onClick={handleSaveAsListened}
              sx={{ mt: 2 }}
            >
              Save as listened
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <AlbumTracklist album={album.Album.toString()} artist={album.Artist} />
    </Box>
  )
}

export default Album;