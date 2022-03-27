import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0070f3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2E5289",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    allVariants: {
      fontFamily: ["Inter", "san-serif"].join(","),
    },
  },
});
