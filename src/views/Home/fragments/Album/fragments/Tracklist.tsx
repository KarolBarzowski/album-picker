import { Card, CardHeader, IconButton, List, ListItem, ListItemText, SvgIcon, Typography } from "@mui/material";
import { useGetAlbumQuery, useGetTracklistQuery } from "../../../../../store/services/musicService";
import { useState } from "react";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { formatMilliseconds } from "../../../../../utils/date.utils";
import {motion} from 'framer-motion';

interface IAlbumTracklistProps {
  artist: string;
  album: string;
}

const variants = (i: number) => ({
  show: {
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.2,
      delay: .2 + i * 0.05,
    }
  },
  hide: {
    x: -24,
    opacity: 0
  }
});

const AlbumTracklist: React.FC<IAlbumTracklistProps> = ({ artist, album }) => {
  const [isShown, setIsShown] = useState(false);
  const { data: albumData, isLoading: isAlbumLoading } = useGetAlbumQuery({ artist, album });
  const releaseId = albumData?.id;

  const { tracklistData, isLoading: isTracklistLoading } = useGetTracklistQuery(releaseId || '', {
      skip: !releaseId,
      selectFromResult: ({ data, ...rest }) => ({
        tracklistData: data || [],
        ...rest,
      }),
  });

  return (
    <Card sx={{
        position: "absolute",
        top: 24,
        right: 0,
        transform: `translateX(${isShown ? "calc(100% + 24px)" : "64px"})`,
        transition: "transform 0.3s ease-in-out",
        maxHeight: "calc(100% - 48px)",
        height: "calc(100% - 48px)",
      }}
    >
      <CardHeader title="Tracklist" action={
        <IconButton
          onClick={() => setIsShown(!isShown)}
          sx={{ marginLeft: 12 }}
        >
          <SvgIcon fontSize="medium">
            <QueueListIcon />
          </SvgIcon>
        </IconButton>
      } />
      {isAlbumLoading || isTracklistLoading ? (
        <Typography variant="body1" mx={3}>Loading...</Typography>
      ) : (
        <List sx={{ maxHeight: "calc(100% - 80px)", overflowY: isShown ? "auto" : "hidden", paddingX: 1 }}>
          {tracklistData.map((track, index) => {
            const hasDivider = index < tracklistData.length - 1;

            return (
              <motion.li
                key={track.id}
                variants={variants(index)}
                animate={isShown ? "show" : "hide"}
                initial="hide"
              >
                <ListItem
                  role="div"
                  divider={hasDivider}
                  key={track.id}
                  >
                  <ListItemText
                    primary={track.title}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondary={formatMilliseconds(parseInt(track.length))}
                    secondaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              </motion.li>
            )
          })}
        </List>
      )}
    </Card>
  );
};

export default AlbumTracklist;