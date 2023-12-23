import { Card, CardContent, CardHeader, List, ListItem, ListItemText, SvgIcon, TablePagination } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import { LocalStorageKeys } from "../../../../enums/enums";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";
import { albums } from "../../../../utils/data.utils";

const AlbumList: React.FC = () => {
  const [albumsListened] = useLocalStorage<number[]>(LocalStorageKeys.AlbumsListened, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <>
      <Card>
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
                  <ListItemText
                    primary={`Nº ${album?.Rank} - ${album?.Album}`}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={`${album?.Artist}, ${album?.Info}`}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                  {albumsListened.includes(album.Rank) && (
                    <SvgIcon color="success">
                      <CheckCircleIcon />
                    </SvgIcon>
                  )}
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
            rowsPerPageOptions={[10, 25, 50, 100, 500]}
          />
        </CardContent>
      </Card>
    </>
  );
}

export default AlbumList;