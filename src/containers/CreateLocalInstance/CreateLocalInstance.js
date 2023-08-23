import React, { useState } from "react";
import { DecryptData, EncryptData } from "../../util";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import * as ethers from "ethers";
import { useNavigate } from "react-router";

const CreateLocalInstance = () => {
  const [wallet, setWallet] = useState({});
  const [selected, setSelected] = useState("import");

  const generatePrivateKey = () => {
    const _wallet = ethers.Wallet.createRandom();
    console.log(_wallet.privateKey)
    setWallet(_wallet);
  };

  const importPrivateKey = (privateKey) => {
    const _wallet = new ethers.Wallet(privateKey);
    console.log(_wallet)

    console.log('Address:', _wallet.address);
    if (_wallet.address) {
      setWallet(_wallet)
      setSelected("create")
    }
  }


  const handleNavigation = (option) => {
    setSelected(option);
    if (option == "create") generatePrivateKey();
  };

  return (
    <div className={"homepage"}>
      <Container maxWidth="sm">
        <div>
          <CardNavigation
            selected={selected}
            handleNavigation={handleNavigation}
          />
        </div>
        {selected == "import" && <Import importPrivateKey={importPrivateKey}/>}
        <div>
          {wallet.address && (
            <p>
              New Wallet:{" "}
              {wallet.address.slice(0, 5) +
              "...." +
              wallet.address.slice(
                wallet.address.length - 6,
                wallet.address.length,
              )}
            </p>
          )}
          {selected == "create" && (
            <PasswordConfirmationFlow
              wallet={{
                privateKey: wallet.privateKey,
                publicKey: wallet.address,
                name: "1",
              }}
            />
          )}
        </div>

      </Container>
    </div>
  );
};

const Import = ({ importPrivateKey }) => {
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    importPrivateKey(passwordInput);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Enter Private Key
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Private Key"
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
          Confirm
        </Button>
      </form>
    </Paper>
  );
};

const CardNavigation = ({ selected, handleNavigation }) => {
  return (
    <div style={{ display: "flex" }}>
      <Paper
        elevation={selected === "create" ? 3 : 1}
        style={{
          flex: 1,
          padding: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => handleNavigation("create")}
      >
        <Typography>Create</Typography>
      </Paper>
      <Paper
        elevation={selected === "import" ? 3 : 1}
        style={{
          flex: 1,
          padding: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => handleNavigation("import")}
      >
        <Typography>Import</Typography>
      </Paper>
    </div>
  );
};

const PasswordForm = ({ setPassword, setConfirming }) => {
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPassword(passwordInput);
    setConfirming(true);
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Enter New Password
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
          Set Password
        </Button>
      </form>
    </Paper>
  );
};

const ConfirmationForm = ({ password, resetPassword, setFailed, wallet }) => {
  const [confirmationInput, setConfirmationInput] = useState("");
  const navigate = useNavigate();

  const setInstance = (password) => {
    let encrypted = EncryptData(
      { wallets: [wallet.wallet], default: 0 },
      password,
    );
    window.localStorage.setItem("localDataEncrypted", encrypted);
    navigate(`/local/login`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmationInput === password) {
      setInstance(password);
    } else {
      resetPassword();
      setFailed(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Confirm Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Confirm
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const PasswordConfirmationFlow = (wallet) => {
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const resetPassword = () => {
    setPassword("");
    setConfirming(false);
  };

  return (
    <div>
      {!confirming ? (
        <div>
          {failed && <p style={{ color: "#ff3b3b" }}>Password did not match</p>}
          <PasswordForm
            setPassword={setPassword}
            setConfirming={setConfirming}
          />
        </div>
      ) : (
        <ConfirmationForm
          wallet={wallet}
          password={password}
          resetPassword={resetPassword}
          setFailed={setFailed}
        />
      )}
    </div>
  );
};

export default CreateLocalInstance;
