import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DecryptData, EncryptData } from "../../../util";
import CreateLocalInstance from "../../../containers/CreateLocalInstance/CreateLocalInstance";
import LoadLocalInstance from "../../../containers/LoadLocalInstance/LoadLocalInstance";
import { useNavigate } from "react-router";
import LoginOrCreateModal from "../../../components/LoginOrCreateModal/LoginOrCreateModal";

const ethers = require("ethers");

const Create = () => {
  const [localDataEncrypted, setLocalDataEncrypted] = useState(false);
  const [denied, setDenied] = useState(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogin = () => {
    console.log("User chose to login");
    navigate("/local/login");
    closeModal();
  };

  const handleCreate = () => {
    console.log("User chose to create new instance");
    closeModal();
  };

  useEffect(() => {
    let encryptedData = window.localStorage.getItem("localDataEncrypted");
    if (encryptedData == null) encryptedData = "";

    if (encryptedData != "") {
      setModalOpen(true);
      return;
    }

    setLocalDataEncrypted(true);
  }, []);

  return (
    <div className={"homepage"}>
      <div>
        <Container maxWidth="sm">
          <LoginOrCreateModal
            open={modalOpen}
            onClose={closeModal}
            handleLogin={handleLogin}
            handleCreate={handleCreate}
          />
          <h1>On-Chain Terminal Local Instance</h1>
          <CreateLocalInstance />
        </Container>
      </div>
    </div>
  );
};

export default Create;
