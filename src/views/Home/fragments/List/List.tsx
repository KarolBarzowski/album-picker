import { Box, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, SvgIcon, TablePagination } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { LocalStorageKeys } from "../../../../enums/enums";
import { CheckCircleIcon, QueueListIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { albums } from "../../../../utils/data.utils";
import AlbumCover from "../../../../components/AlbumCover";
import { IAlbum } from "album-types";
import AlbumTracklist from "../Album/fragments/Tracklist";

const rowsPerPageOptions = [5, 10, 25, 50, 100, 500];

const AlbumList: React.FC = () => {
  const [albumsListened] = useLocalStorage<number[]>(LocalStorageKeys.AlbumsListened, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [showAlbum, setShowAlbum] = useState<IAlbum | null>(null);

  const albumsPage = useMemo(() => {
    const reversedAlbums = [...albums].reverse();

    const paginatedAlbums = reversedAlbums.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return paginatedAlbums;
  }, [page, rowsPerPage])

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box sx={{ position: "relative" }}>
      {showAlbum && (
        <AlbumTracklist album={showAlbum?.Album.toString()} artist={showAlbum?.Artist} show />
      )}
      <Card sx={{ position: "relative", zIndex: 1 }} raised>
        <CardHeader title="List" subheader="Top 500 albums" />
        <CardContent>
          <List>
            {albumsPage.map((album, index) => {
              const hasDivider = index < albumsPage.length - 1;

              return (
                <ListItem
                  divider={hasDivider}
                  key={album.Rank}
                >
                  <ListItemAvatar>
                      {album && (
                        <AlbumCover album={album} />
                      )}
                    </ListItemAvatar>
                  <ListItemText
                    primary={`Nº ${album?.Rank} - ${album?.Album}`}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={`${album?.Artist}, ${album?.Info}`}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                  <Stack direction="row" alignItems="center" gap={2}>
                    {showAlbum?.Rank !== album.Rank && (
                      <IconButton edge="end" onClick={() => setShowAlbum(album)}>
                        <SvgIcon>
                          <QueueListIcon />
                        </SvgIcon>
                      </IconButton>
                      )}
                    {albumsListened.includes(album.Rank) && (
                      <SvgIcon color="success">
                        <CheckCircleIcon />
                      </SvgIcon>
                    )}
                  </Stack>
                </ListItem>
              );
            })}
          </List>
          <TablePagination
            component="div"
            count={albums.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default AlbumList;