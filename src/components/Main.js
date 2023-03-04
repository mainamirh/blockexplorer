import React from "react";
import { useEffect, useState } from "react";
import Block from "./Block";
import Transaction from "./Transaction";
import { Alchemy, Network } from "alchemy-sdk";
import { getBlockReward } from "../api/getBlockReward";

import { BsArrowRight } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";

import "../styles/Main.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Main = () => {
  const [blocks, setBlocks] = useState([]);
  const [txnReceipts, setTxnReceipts] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    setDataIsLoaded(false);

    async function getLatestBlocks() {
      const tempBlocks = [];
      let blockNumber;
      for (let i = 0; i <= 5; i++) {
        if (i === 0) {
          const latestBlock = await alchemy.core.getBlock("latest");
          blockNumber = latestBlock.number;
          latestBlock.blockReward = await getBlockReward(blockNumber);
          tempBlocks.push(latestBlock);
        } else {
          const block = await alchemy.core.getBlock(blockNumber - i);
          block.blockReward = await getBlockReward(blockNumber - i);
          tempBlocks.push(block);
        }
      }

      setBlocks(tempBlocks);
    }

    getLatestBlocks();
  }, []);

  useEffect(() => {
    if (!blocks.length) return;

    async function getLatestTransactions() {
      const tempTxnReceipts = [];
      const latestBlock = blocks[0];
      const blockWithTxn = await alchemy.core.getBlockWithTransactions(
        latestBlock.hash
      );
      const num = blockWithTxn.transactions.length;

      for (let i = num - 1; i > num - 7; i--) {
        tempTxnReceipts.push(blockWithTxn.transactions[i]);
      }

      setTxnReceipts(tempTxnReceipts);
      setDataIsLoaded(true);
    }

    getLatestTransactions();
  }, [blocks]);

  return (
    <div className="main">
      <div className="left-side">
        <div className="title">Latest Blocks</div>
        <div className="blocks-container">
          {!dataIsLoaded && (
            <div
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TailSpin
                height="70"
                width="70"
                color="#6ab5db"
                ariaLabel="tail-spin-loading"
                radius="0"
                visible={true}
              />
            </div>
          )}
          {dataIsLoaded &&
            blocks &&
            blocks.map((block, i) => {
              return <Block key={i} block={block} />;
            })}
        </div>
        <div className="view-all">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://etherscan.io/blocks"
          >
            VIEW ALL BLOCKS <BsArrowRight style={{ marginLeft: "5px" }} />
          </a>
        </div>
      </div>
      <div className="right-side">
        <div className="title">Latest Transactions</div>
        <div className="transactions-container">
          {!dataIsLoaded && (
            <div
              style={{
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TailSpin
                height="70"
                width="70"
                color="#6ab5db"
                ariaLabel="tail-spin-loading"
                radius="0"
                visible={true}
              />
            </div>
          )}
          {dataIsLoaded &&
            txnReceipts &&
            txnReceipts.map((receipt, i) => {
              return (
                <Transaction
                  key={i}
                  receipt={receipt}
                  timestamp={blocks && blocks[0].timestamp}
                />
              );
            })}
        </div>
        <div className="view-all">
          <a rel="noreferrer" target="_blank" href="https://etherscan.io/txs">
            VIEW ALL TRANSACTIONS <BsArrowRight style={{ marginLeft: "5px" }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Main;
