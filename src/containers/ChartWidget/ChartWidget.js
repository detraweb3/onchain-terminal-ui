import React from "react";
import TradingView from "../../components/TradingView/TradingView";

const ChartWidget = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8fr 2fr",
          height: "100%",
        }}
      >
        <TradingView />

        <div style={{ marginTop: "auto", width: "100%", height: "100%" }}>
          <div style={{ height: "100%", backgroundColor: "#131722" }}>
            Token INFO Pair Network DEX Price Liquidity Quote Liquidity MCAP
            5m/1h/24h change 24h Volume Trade Count Watchlist Alerts Buy/Sell
            Box Balance
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartWidget;
