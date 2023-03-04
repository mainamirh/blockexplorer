import { ethers } from "ethers";
import axios from "axios";

export async function getBlockReward(blockNumber) {
  if (blockNumber) {
    const response = await axios.post(
      `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    );
    const blockReward = response.data.result.blockReward;

    if (blockReward) {
      return Number(ethers.formatEther(blockReward)).toFixed(5);
    } else {
      return await new Promise((res, rej) => {
        setTimeout(() => {
          res(getBlockReward(blockNumber));
        }, 5000);
      });
    }
  }
}
