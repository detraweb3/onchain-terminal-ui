import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container } from "@mui/material";
import connectRedux from "../../redux/connect";
import { ListenForNewTokenPairs } from "../../web3/NewTokens";

const Platform = ({ userData, setUserData }) => {
  const [, setLocalDataEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    if (!userData) navigate(`/`);
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <h3>On-Chain Terminal</h3>
      </Container>
    </div>
  );
};

export default connectRedux.connectUserDataRedux(Platform);
