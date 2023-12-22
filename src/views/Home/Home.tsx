
import Sidebar from "./fragments/Sidebar";
import Album from "./fragments/Album/Album";
import { Container, Grid } from "@mui/material";
import AnimatedCard from "./fragments/AnimatedCard";
import History from "./fragments/History/History";
// import List from "./fragments/List/List";
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
  }}>
    <Grid container>
      <Grid item xs={3} my="auto">
        <Sidebar {...{
          currentTab,
          setCurrentTab,
        }} />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={6}>
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
        {/* {currentTab === HomeTabs.List && (
          <AnimatedCard>
            <List />
          </AnimatedCard>
        )} */}
      </Grid>
    </Grid>
  </Container>
  )
}

export default Home;