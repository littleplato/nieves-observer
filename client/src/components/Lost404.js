import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function Lost404() {
  const history = useHistory();

  const handleBack = () => {
    history.push("/");
  };
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        404: Universe Not Found
      </Typography>
      <Button variant="outlined" onClick={handleBack}>
        Head Back to Earth
      </Button>
    </div>
  );
}
