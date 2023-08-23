import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { DecryptData } from "../../../util";

const Login = () => {
  const [, setLocalDataEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let _encryptedData = window.localStorage.getItem("localDataEncrypted");
    setEncryptedData(_encryptedData);

    if (encryptedData == null) _encryptedData = "";

    if (_encryptedData == "") navigate("/local/create");
  }, []);

  return (
    <div className={"homepage"}>
      <div>
        <Container maxWidth="sm">
          <h1>Instance Found on Device</h1>
          <PasswordConfirmationFlow encryptedData={encryptedData} />
        </Container>
      </div>
    </div>
  );
};

const PasswordConfirmationFlow = (encryptedData) => {
  const [failed, setFailed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let decrypted = DecryptData(encryptedData.encryptedData, passwordInput);
    if (decrypted.err) {
      setFailed(true);
    } else {
      console.log("Success", decrypted);
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

export default Login;
