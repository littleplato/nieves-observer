import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const theme = createTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "Quicksand",
    h1: {
      fontSize: 40,
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography variant="h1">App here</Typography>
    </ThemeProvider>
  );
}

export default App;
