import { Button, Card, CardContent, CardHeader, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { getAlbum, getRandomAlbum } from '../utils/data.utils';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import { useLocalStorage } from "usehooks-ts";

const Home = () => {
  const [lastAlbum, setLastAlbum] = useLocalStorage<number>('lastAlbum', 0);
  const [albumsListened, setAlbumsListened] = useLocalStorage<number[]>('albumsListened', []);
  const [album, setAlbum] = useState(getAlbum(lastAlbum) || getRandomAlbum(albumsListened));

  useEffect(() => {
    setLastAlbum(album.Rank);
  }, [album])

  const handleRefresh = () => {
    const newAlbum = getRandomAlbum(albumsListened);

    setAlbum(newAlbum);
  }

  const handleSaveAsListened = () => {
    setAlbumsListened([...albumsListened, album.Rank]);
    handleRefresh();
  }
  
  return (
    <Container maxWidth="sm" sx={{minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Card sx={{width: "100%"}}>
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
          title={`Nº ${album.Rank}`}
        />
        <CardContent sx={{display: "flex", flexFlow: "column nowrap", gap: 2}}>
          <Stack gap={1}>
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
            >
              Save as listened
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Home;