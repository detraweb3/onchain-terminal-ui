import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { DecryptData } from "../../../util";
import PasswordConfirmationFlow from "../../../components/PasswordConfirmationFlow/PasswordConfirmationFlow";



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



export default Login;
