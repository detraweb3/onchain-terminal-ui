import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Container} from "@mui/material";
import {connect} from "react-redux";
import {setUserData} from "../../redux/actions";
import connectRedux from "../../redux/connect";

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  setUserData,
};

const Platform = ({userData, setUserData}) => {
  const [, setLocalDataEncrypted] = useState(false);
  const [encryptedData, setEncryptedData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData)
      navigate(`/`);

    if (!userData.pwd === undefined)
      navigate(`/`);

  }, []);

  return (
    <div className={"homepage"}>
      <div>
        <Container maxWidth="sm">
          <h1>Instance Found on Device</h1>
        </Container>
      </div>
    </div>
  );
};

export default connectRedux.connectUserDataRedux(Platform)
