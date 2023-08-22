import React, {useState} from 'react';
import {Grid} from '@mui/material';
import CardOption from "../../components/CardOption/CardOption";
import "./PlatformSelect.css"

const platformFeatures = [
  [
    "Store your private keys locally",
    "Access to charting tools",
    "Trade on-chain tokens",
    "Trade on-chain perpetual contracts",
    "Trade on-chain options",
    "Bridge assets to multiple chains",
    "Discover new token launches",
  ],
  [
    "Access to all local features",
    "Access the platform from anywhere",
    "Chat Rooms",
    "Copy Trading",
    "Token Sniper",
    "Wallet Tracker",
    "Trading API Access",
    "Create limit, take profit, and stop loss orders",
    "Token price alerts",
    "Live crypto news",
    "Paper trading",
    "Create pooled bespoke baskets",
    "Access your wallets from anywhere",
    "Create a .onchain domain for your wallet",
    "Select tokens to DCA on a scheduled timeframe",
    "Optionally make a public profile for your wallet(s)",
    "Send messages to other OnChain Terminal traders"
  ],
  [
    "Access to all premium features",
    "Requires knowledge of server setup",
    "All data is stored on your own server"
  ]
]

const PlatformSelect = () => {

  const [selected, setSelect] = useState("local")

  return (
    <div>
      <div className={"card-container container card-option"}>
        <div className={"card-option card"}>
          <CardOption title={"Local"} features={platformFeatures[0]} setSelect={setSelect}
                      description={"Limited features without your keys leaving your computer"}/>
        </div>
        <div className={"card-option card"}>
          <CardOption title={"Premium (Not Available)"} isDisabled={true} features={platformFeatures[1]} setSelect={setSelect}
                      description={"Fully featured platform suitable for most traders and algo traders"}/>
        </div>
        <div className={"card-option card"}>
          <CardOption title={"Self Hosted (Not Available)"} isDisabled={true} features={platformFeatures[2]} setSelect={setSelect}
                      description={"Host your own OnChain Terminal instance to store your data"}/>
        </div>
      </div>
    </div>
  );
};

export default PlatformSelect;
