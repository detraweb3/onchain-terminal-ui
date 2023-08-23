import React, { useState } from "react";
import { DecryptData } from "../../util";
import { Button, Paper, TextField, Typography } from "@mui/material";
import connectRedux from "../../redux/connect";
import { useNavigate } from "react-router";

const PasswordConfirmationFlow = ({ userData, setUserData, encryptedData }) => {
  const [failed, setFailed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let decrypted = DecryptData(encryptedData, passwordInput);
    if (decrypted.err) {
      setFailed(true);
    } else {
      setUserData({ ...decrypted.data, pwd: passwordInput });
      navigate(`/platform/home`);
    }
  };

  return (
    <div>
      {failed && (
        <p style={{ color: "#ff3b3b" }}>
          Incorrect Password (this can't be reset!)
        </p>
      )}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Enter Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default connectRedux.connectUserDataRedux(PasswordConfirmationFlow);
