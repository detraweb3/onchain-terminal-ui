import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import connectRedux from "../../redux/connect";
import Chat from "../../components/Chat/Chat";
import "./Platform.css";
import ChartWidget from "../../containers/ChartWidget/ChartWidget";

const Platform = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [showMessageWindow, setShowMessageWindow] = useState(false);

  const toggleMessageWindow = () => {
    setShowMessageWindow(!showMessageWindow);
  };

  useEffect(() => {
    console.log(userData);
    if (!userData) navigate(`/`);
  }, []);

  return (
    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <h3>On-Chain Terminal (Eventually draggable and responsive)</h3>
      <div className="grid" style={{ paddingBottom: "40px" }}>
        <div className={`card-dnd card-3x1`}>
          <ChartWidget />
        </div>
        <Card size="1x2" content="New Tokens and Liquidity locked" />
        <Card size="1x1" content="Token buy/sell simulator (honeypot checks)" />
        <Card size="1x1" content="Live News" />
        <Card size="1x1" content="Trending Tokens" />
        <Card size="1x1" content="Portfolio" />
        <Card size="1x1" content="Trader Feed" />
        <Card size="1x1" content="Perp Positions" />
        <Card size="1x1" content="Options Positions" />
        <Card size="1x1" content="API Keys" />
        <Card size="1x2" content="Trading Bots" />
        <Card size="3x1" content="Token Screener" />
      </div>
      <div
        className={`message-button ${showMessageWindow ? "active" : ""}`}
        onClick={toggleMessageWindow}
      >
        <p>Chat</p>
      </div>
      {showMessageWindow && <Chat toggleMessageWindow={toggleMessageWindow} />}
    </div>
  );
};

const Card = ({ size, content }) => {
  return (
    <div className={`card-dnd card-${size}`}>
      <p>{content}</p>
    </div>
  );
};

export default connectRedux.connectUserDataRedux(Platform);
