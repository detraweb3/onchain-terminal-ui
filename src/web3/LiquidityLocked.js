import NETWORKS from "./Networks";
import { getQuotePrice, getTokenPrice } from "./NewTokens";

const ethers = require("ethers");

const UnicryptListener = async () => {
  const unicryptABI = [
    "event onDeposit(address lpToken, address user, uint256 amount, uint256 lockDate, uint256 unlockDate)",
    "function getPair(address tokenA, address tokenB) external view returns (address pair)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function factory() view returns (address)",
    "function token0() view returns (address)",
    "function token1() view returns (address)",
  ];

  const listenForNewLocks = async (network, unicryptAddress) => {
    const wsprovider = new ethers.WebSocketProvider(network.wsURL);
    const wsLockerContract = new ethers.Contract(
      unicryptAddress,
      unicryptABI,
      wsprovider,
    );

    const provider = new ethers.JsonRpcProvider(network.rpcURL);

    wsLockerContract.on(
      "onDeposit",
      async (lpToken, user, amount, lockDate, unlockDate) => {
        const lpTokenContract = new ethers.Contract(
          lpToken,
          unicryptABI,
          provider,
        );

        let factoryAddress = await lpTokenContract.factory();
        let token0 = await lpTokenContract.token0();
        let token1 = await lpTokenContract.token1();

        const factoryContract = new ethers.Contract(
          factoryAddress,
          unicryptABI,
          wsprovider,
        );

        const token0Contract = new ethers.Contract(
          token0,
          unicryptABI,
          provider,
        );

        const token1Contract = new ethers.Contract(
          token1,
          unicryptABI,
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

          if (lpTokenContract == "0x0000000000000000000000000000000000000000")
            return;

          let quotePrice = await getQuotePrice(
            token1,
            network,
            provider,
            factoryContract,
          );
          let tokenPrice = await getTokenPrice(
            lpToken,
            token0,
            token1,
            provider,
          );
          if (!tokenPrice) return;
          console.log(
            `New Liquidity Lock:\nToken0: ${token0}\nToken1: ${token1}\nPair Address: ${lpToken}\nNetwork: ${network.name}\n`,
          );
          console.log(
            `User: ${user} | LP Amount: ${amount} | Lock Date: ${lockDate} | Unlock Date: ${unlockDate}`,
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
    listenForNewLocks(network, network.unicrypt);
  }
};

export default UnicryptListener;
