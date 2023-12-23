import { CssBaseline, ThemeProvider } from "@mui/material";
import {Helmet} from "react-helmet";
import { createTheme } from "../theme";
import Home from "./Home/Home";
import { Provider } from "react-redux";
import { store } from "../store";

const App: React.FC = () => {
  const theme = createTheme();
  
  return (
    <>
      <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap"
        />
      </Helmet>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default App;


