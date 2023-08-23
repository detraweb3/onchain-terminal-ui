const NETWORKS = [
  {
    name: "ethereum",
    rpcURL: "https://eth.llamarpc.com",
    wsURL: "wss://mainnet.infura.io/ws/v3/ba47d322bd2346e9a1ee0e730bee0d82",
    dexs: [{ uniswapV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f" }],
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    factoryAddresses: [
      {
        name: "uniswapv2",
        address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      },
    ],
  },
];

export default NETWORKS;
