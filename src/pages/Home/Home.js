import React from "react";
import PlatformSelect from "../../containers/PlatformSelect/PlatformSelect";
import { Grid } from "@mui/material";
import "./Home.css";

const Home = () => {
  return (
    <div className={"homepage"}>
      <Grid container spacing={3}>
        <div>
          <h1>On Chain Terminal</h1>
          <p>An open-source on-chain trading platform</p>
          <PlatformSelect />
        </div>
      </Grid>
    </div>
  );
};

export default Home;
