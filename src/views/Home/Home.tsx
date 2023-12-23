
import Navigation from "./fragments/Navigation";
import Album from "./fragments/Album/Album";
import { Container, Grid } from "@mui/material";
import AnimatedCard from "./fragments/AnimatedCard";
import History from "./fragments/History/History";
import List from "./fragments/List/List";
import { useLocalStorage } from "usehooks-ts";
import { HomeTabs, LocalStorageKeys } from "../../enums/enums";

const Home = () => {
  const [currentTab, setCurrentTab] = useLocalStorage(LocalStorageKeys.CurrentTab, HomeTabs.Album);
    
  return (
  <Container sx={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }} maxWidth="sm">
    <Grid container direction="column" gap={3}>
      <Grid item>
        <Navigation {...{
          currentTab,
          setCurrentTab,
        }} />
      </Grid>
      <Grid item>
        {currentTab === HomeTabs.Album && (
          <AnimatedCard>
            <Album />
          </AnimatedCard>
        )}
        {currentTab === HomeTabs.History && (
          <AnimatedCard>
            <History />
          </AnimatedCard>
        )}
        {currentTab === HomeTabs.List && (
          <AnimatedCard>
            <List />
          </AnimatedCard>
        )}
      </Grid>
    </Grid>
  </Container>
  )
}

export default Home;