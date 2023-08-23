import NETWORKS from "./Networks";

const ethers = require("ethers");

const uniswapV2PairABI = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
];

let running = false;

async function ListenForNewTokenPairs() {
  if (running) return;

  running = true;

  const uniswapV2FactoryABI = [
    "function getPair(address tokenA, address tokenB) external view returns (address pair)",
    "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
  ];

  const listenForNewTokens = async (network, factory) => {
    const wsprovider = new ethers.WebSocketProvider(network.wsURL);
    const wsfactoryContract = new ethers.Contract(
      factory.address,
      uniswapV2FactoryABI,
      wsprovider,
    );

    const provider = new ethers.JsonRpcProvider(network.rpcURL);
    const factoryContract = new ethers.Contract(
      factory.address,
      uniswapV2FactoryABI,
      wsprovider,
    );

    let tokenPairs = {};

    const getQuotePrice = async (token1, network) => {
      try {
        let pairAddress = tokenPairs[token1];
        if (!pairAddress) {
          pairAddress = await factoryContract.getPair(token1, network.usdc);
          tokenPairs[token1] = pairAddress;
        }

        const pairContract = new ethers.Contract(
          pairAddress,
          uniswapV2PairABI,
          provider,
        );

        const [reserve0, reserve1] = await pairContract.getReserves();
        const token1Contract = new ethers.Contract(
          token1,
          [
            "function name() view returns (string)",
            "function decimals() view returns (uint8)",
          ],
          provider,
        );
        let decimals = await token1Contract.decimals();

        return (
          Number(ethers.parseUnits(reserve0.toString(), decimals)) /
          Number(ethers.parseUnits(reserve1.toString(), 6))
        );
      } catch (error) {
        console.error("Error fetching WETH/USDC price:", error);
        return 0;
      }
    };

    const getTokenPrice = async (pairAddress, token0, token1) => {
      try {
        const pairContract = new ethers.Contract(
          pairAddress,
          uniswapV2PairABI,
          provider,
        );

        const [reserve0, reserve1] = await pairContract.getReserves();
        const token0Contract = new ethers.Contract(
          token0,
          [
            "function name() view returns (string)",
            "function decimals() view returns (uint8)",
          ],
          provider,
        );
        let token0decimals = await token0Contract.decimals();

        const token2Contract = new ethers.Contract(
          token1,
          [
            "function name() view returns (string)",
            "function decimals() view returns (uint8)",
          ],
          provider,
        );
        let token2decimals = await token2Contract.decimals();

        return (
          Number(ethers.formatUnits(reserve1.toString(), token2decimals)) /
          Number(ethers.formatUnits(reserve0.toString(), token0decimals))
        );
      } catch (error) {
        console.error("Error fetching WETH/USDC price:", error);
        return 0;
      }
    };

    wsfactoryContract.on(
      "PairCreated",
      async (token0, token1, pairAddress, event) => {
        const token0Contract = new ethers.Contract(
          token0,
          uniswapV2FactoryABI,
          provider,
        );
        const token1Contract = new ethers.Contract(
          token1,
          uniswapV2FactoryABI,
          provider,
        );
        try {
          const [token0Name, token0Decimals] = await Promise.all([
            token0Contract.name(),
            token0Contract.decimals(),
          ]);

          const [token1Name, token1Decimals] = await Promise.all([
            token1Contract.name(),
            token1Contract.decimals(),
          ]);

          if (pairAddress == "0x0000000000000000000000000000000000000000")
            return;

          let quotePrice = await getQuotePrice(token1, network);
          let tokenPrice = await getTokenPrice(pairAddress, token0, token1);
          if (!tokenPrice) return;
          console.log(
            `New pair created:\nToken0: ${token0}\nToken1: ${token1}\nPair Address: ${pairAddress}\nNetwork: ${network.name}\nFactory: ${factory.name}`,
          );
          console.log(
            `Token0 Name: ${token0Name}, Decimals: ${token0Decimals}`,
          );
          console.log(
            `Token1 Name: ${token1Name}, Decimals: ${token1Decimals}`,
          );
          console.log(`Quote Price: ${quotePrice}`);
          console.log(`Token Price: ${tokenPrice}`);
          console.log(
            `Token/Quote Price: ${(tokenPrice * quotePrice).toFixed(12)}`,
          );
        } catch (error) {
          console.error("Error fetching token information:", error);
        }
      },
    );
  };

  for (const network of NETWORKS) {
    for (const factory of network.factoryAddresses)
      listenForNewTokens(network, factory);
  }
}

export { ListenForNewTokenPairs };
