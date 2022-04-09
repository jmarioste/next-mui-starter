import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, ButtonProps } from "@mui/material";
import React from "react";

const CallToActionButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      endIcon={<ArrowForwardIcon />}
      variant="contained"
      sx={{ px: 4, py: 2 }}
      {...props}
    >
      {children ?? "Go to App"}
    </Button>
  );
};

export default CallToActionButton;
