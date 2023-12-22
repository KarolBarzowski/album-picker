import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { HomeTabs } from "../../../enums/enums";

interface ISidebarProps {
  currentTab: HomeTabs;
  setCurrentTab: (tab: HomeTabs) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  
  return (
    <Card>
      <CardHeader title="Menu" />
      <CardContent>
        <Stack gap={1}>
          {Object.values(HomeTabs).map((tab) => (
            <Button variant={currentTab === tab ? "contained" : "outlined"} onClick={() => setCurrentTab(tab)}>
              {tab}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default Sidebar;