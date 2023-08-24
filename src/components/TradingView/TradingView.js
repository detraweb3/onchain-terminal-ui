import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import "./TradingView.css";

const TradingView = () => {
  return (
    <div style={{ width: "100%", height: "100%", marginRight: "auto" }}>
      <AdvancedRealTimeChart
        interval={"D"}
        symbol={"BTCUSD"}
        theme="dark"
        autosize={true}
      ></AdvancedRealTimeChart>
    </div>
  );
};

export default TradingView;
