import { Button, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import "./LoginOrCreateModal.css";

const LoginOrCreateModal = ({ open, onClose, handleLogin, handleCreate }) => {
  return (
    <Modal open={open} onClose={onClose} className={"modal"}>
      <Paper className={`${"paper"}`}>
        <Typography variant="h6" gutterBottom>
          An existing instance was found. Would you like to login? Creating a
          new instance will remove all of your current data.
        </Typography>
        <div className={`${"buttonContainer"}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={`${"loginButton"}`}
          >
            Login
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCreate}>
            Create New Instance
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default LoginOrCreateModal;
