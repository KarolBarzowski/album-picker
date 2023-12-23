import { Button, Card, CardContent, Stack } from "@mui/material";
import { HomeTabs } from "../../../enums/enums";

interface INavigationProps {
  currentTab: HomeTabs;
  setCurrentTab: (tab: HomeTabs) => void;
}

const Navigation: React.FC<INavigationProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  
  return (
    <Card>
      <CardContent>
        <Stack gap={1} direction="row">
          {Object.values(HomeTabs).map((tab) => (
            <Button sx={{ width: "100%" }} variant={currentTab === tab ? "contained" : "outlined"} onClick={() => setCurrentTab(tab)} key={tab}>
              {tab}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Navigation;