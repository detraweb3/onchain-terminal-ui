import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import connectRedux from "../../redux/connect";
import Chat from "../../components/Chat/Chat";
import "./Platform.css";
import ChartWidget from "../../containers/ChartWidget/ChartWidget";
import TokenAlertCard from "../../components/TokenAlertCard/TokenAlertCard";

const exampleTokens = [{
  "token": "n('～')n",
  "quote": "WETH",
  "name": "PepeFace",
  "address": "0xB7B31402565FE4A39A3a83d025dd292Dc40aD393",
  "status": "Created 2 hours ago",
  "verification": {
    "verified": true,
    "renounced": false
  },
  "marketcap": 2174,
  "trading": {
    "buys": 0,
    "sells": 0
  },
  "honeypot": {
    "buy": true,
    "sell": true
  },
  "taxes": {
    "buyTax": 0.2,
    "sellTax": 0.2
  },
  "liquidity": 3410,
  "owner": "N/A",
  "unlock": "-",
  "holders": [
    {
      "holderName": "Pepe Face",
      "holderAddress": "0x4eb3…4c8c",
      "amount": "98%"
    },
    {
      "holderName": "",
      "holderAddress": "0x4eb3…4c8c",
      "amount": "2%"
    }
  ],
  "ethBalance": {
    "holderName": "-",
    "ethAmount": "0.05Ξ"
  },
  "deployer": {
    "deployerAddress": "0x4eb3…4c8c",
    "balance": "0.05Ξ",
    "txCount": 6
  },
  "fundingSources": [
    {
      "source": "0xf45d…fb72",
      "type": "red_circle",
      "amount": "0.03Ξ",
      "date": "2 hours ago"
    },
    {
      "source": "FixedFloat",
      "type": "green_circle",
      "amount": "1.20Ξ",
      "date": "4 hours ago"
    }
  ],
  "contracts": "-",
  "maxWallet": "TD",
  "maxTX": "2%",
  "links": {
    "dexTools": "DexTools Link",
    "dexScreener": "DexScreener Link",
    "coinScan": "CoinScan Link",
    "lpEtherscan": "LP Etherscan Link",
    "copyscape": "Copyscape Link"
  },
  "contractLinks": {
    "website": "https://pepeface.club/",
    "telegram": "https://t.me/ercpepeface"
  }
}]

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
      <h3>On-Chain Terminal MVP</h3>
      <div className="grid" style={{ paddingBottom: "40px" }}>
        <div className={`card-dnd card-3x1`}>
          <ChartWidget />
        </div>
        <div className={`card-dnd card-1x2`}>
          <TokenAlertCard title={"New Tokens"} tokens={exampleTokens}/>
          <TokenAlertCard title={"New Liquidity Locked"} tokens={exampleTokens} />
        </div>
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
