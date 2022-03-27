import { ButtonProps } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    white?: PaletteOptions["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    white: true;
  }
}

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    neutral: true;
    header: true;
  }
}
