import React from "react";
import moment from "moment";

import { FiBox } from "react-icons/fi";

const Block = ({ block }) => {
  const timeAgo = (timestamp) => {
    const time = moment(timestamp * 1000).fromNow();
    return time;
  };

  return (
    <div className="block">
      <div style={{ display: "flex", width: "165px" }}>
        <FiBox className="block-icon" />
        <div className="number">
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://etherscan.io/block/${block.number}`}
          >
            {block.number}
          </a>
          <span>{timeAgo(block.timestamp)}</span>
        </div>
      </div>
      <div className="fee-recipient">
        <div>
          Fee Recipient{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://etherscan.io/address/${block.miner}`}
          >
            {String(block.miner).slice(0, 10)}...
          </a>
        </div>
        <a
          rel="noreferrer"
          target="_blank"
          href={`https://etherscan.io/txs?block=${block.number}`}
        >
          {block.transactions.length} txns
        </a>{" "}
        <span>in 12 secs</span>
      </div>
      <div className="reward">{block.blockReward} Eth</div>
    </div>
  );
};

export default Block;
