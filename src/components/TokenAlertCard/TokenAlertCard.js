import React, { useEffect, useRef, useState } from "react";
import "./TokenAlertCard.css";

const TokenAlertCard = ({ title, tokens }) => {
  const [selectedToken, setSelectedToken] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#131722",
        border: "0.25px solid gray",
      }}
    >
      <p>{title}</p>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>MCAP</th>
            <th>Liquidity</th>
            <th>Honeypot</th>
            <th>Tax Buy/Sell</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => {
            return (
              <tr
                style={{
                  backgroundColor: "#3e3e3e",
                  borderSpacing: 0,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedToken(token);
                  setIsOpen(true);
                }}
              >
                <td>{token.token}</td>
                <td>${token.marketcap.toLocaleString()}</td>
                <td>${token.liquidity.toLocaleString()}</td>
                <td>
                  {!token.honeypot.buy && !token.honeypot.sell ? "Yes" : "No"}
                </td>
                <td>
                  {(token.taxes.buyTax * 100).toFixed(2)}% /{" "}
                  {(token.taxes.sellTax * 100).toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isOpen && <TokenModal token={selectedToken} setIsOpen={setIsOpen} />}
    </div>
  );
};

const TokenModal = ({ token, setIsOpen }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h2>{token.name} Info</h2>
        <p>Token: {token.token}</p>
        <p>Quote: {token.quote}</p>
        <p>Address: {token.address}</p>
        <p>MCAP: ${token.marketcap.toLocaleString()}</p>
        <p>Liquidity: ${token.liquidity.toLocaleString()}</p>
        <p>
          Buy/Sell Honeypot: {!token.honeypot.buy ? "Yes" : "No"} /{" "}
          {!token.honeypot.sell ? "Yes" : "No"}{" "}
        </p>
        <p>
          Buy/Sell Tax: {(token.taxes.buyTax * 100).toFixed(2)}% /{" "}
          {(token.taxes.sellTax * 100).toFixed(2)}%
        </p>
        <p>
          Number of Buys/Sells: {token.trading.buys} / {token.trading.sells}
        </p>
        <p>Deployer: {token.deployer.deployerAddress}</p>
        <p>Funding Sources: Coming Soon</p>
        <p>Top Holders: Coming Soon</p>
        <p>Max TX: {token.maxTX}%</p>
        <p>Max Wallet: {token.maxWallet}%</p>
        <p>Links</p>
        <div>
          {Object.keys(token.links).map((i) => {
            return (
              <p>
                <a style={{ color: "#a793fa" }} href={token.links[i]}>
                  {i}
                </a>
              </p>
            );
          })}
          {Object.keys(token.contractLinks).map((i) => {
            return (
              <p>
                <a style={{ color: "#a793fa" }} href={token.contractLinks[i]}>
                  {i}
                </a>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TokenAlertCard;
