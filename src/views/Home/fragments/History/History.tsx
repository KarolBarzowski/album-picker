import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, SvgIcon, TablePagination, Typography } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { LocalStorageKeys } from "../../../../enums/enums";
import { getAlbumById } from "../../../../utils/data.utils";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import AlbumCover from "../../../../components/AlbumCover";

const rowsPerPageOptions = [5, 10, 25, 50, 100, 500];

const History: React.FC = () => {
  const [albumsListened, setAlbumsListened] = useLocalStorage<number[]>(LocalStorageKeys.AlbumsListened, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const albumsListenedPage = useMemo(() => {
    const reversedAlbums = [...albumsListened].reverse();

    const paginatedAlbums = reversedAlbums.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );

    return paginatedAlbums;
  }, [page, rowsPerPage, albumsListened])

const handleDelete = (id: number) => {
  setAlbumsListened(albumsListened.filter((album) => album !== id))
}

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
    <>
      <Card raised>
        <CardHeader title="History" subheader="Your already listened albums" />
        <CardContent>
          {albumsListened.length ? (
            <List>
              {albumsListenedPage.map((id, index) => {
                const album = getAlbumById(id);
                const hasDivider = index < albumsListenedPage.length - 1;

                return (
                  <ListItem
                    divider={hasDivider}
                    key={id}
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
                    <IconButton edge="end" onClick={() => handleDelete(id)}>
                      <SvgIcon>
                        <XCircleIcon />
                      </SvgIcon>
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary" mx="auto">No history to show</Typography>
          )}
          <TablePagination
            component="div"
            count={albumsListened.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default History;