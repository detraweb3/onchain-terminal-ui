import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import "./CardOption.css";
import { useNavigate } from "react-router";

const CardOption = (props) => {
  const navigate = useNavigate();

  const setPage = (page) => {
    navigate(`/${page.toLowerCase().replace(" ", "")}`);
  };

  return (
    <div className="custom-container">
      <div className="content-container">
        <h4 className="custom-title">{props.title}</h4>
        <p>{props.description}</p>
        <div className="custom-button">
          <Button
            disabled={props.isDisabled}
            variant="contained"
            color="primary"
            onClick={() => setPage(props.title + "/create")}
          >
            Select
          </Button>
        </div>
        <h2 className="feature-title">Features</h2>
        <ul className="feature-list">
          {props.features.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardOption;
