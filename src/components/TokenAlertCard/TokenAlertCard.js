import React from "react";

const TokenAlertCard = ({title, tokens}) => {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#131722", border: "0.25px solid gray" }}>
      <p>{title}</p>
      <table style={{width: "100%"}}>
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
            <tr style={{backgroundColor: "#3e3e3e", borderSpacing: 0, cursor: "pointer"}}>
              <td >{token.token}</td>
              <td>${token.marketcap.toLocaleString()}</td>
              <td>${token.liquidity.toLocaleString()}</td>
              <td>{!token.honeypot.buy && !token.honeypot.sell ? "Yes" : "No"}</td>
              <td>{(token.taxes.buyTax * 100).toFixed(2)}% / {(token.taxes.sellTax * 100).toFixed(2)}%</td>
            </tr>
          )
        })}

        </tbody>
      </table>
    </div>
  );
};

export default TokenAlertCard;
