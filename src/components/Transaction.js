import React from "react";
import moment from "moment";
import { ethers } from "ethers";

import { CgNotes } from "react-icons/cg";

const Transaction = ({ receipt, timestamp }) => {
  const timeAgo = (timestamp) => {
    const time = moment(timestamp * 1000).fromNow();
    return time;
  };

  return (
    <div className="transaction">
      <div style={{ display: "flex" }}>
        <CgNotes className="transaction-icon" />
        <div className="number">
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://etherscan.io/tx/${receipt.hash}`}
          >
            {String(receipt.hash).slice(0, 15)}...
          </a>
          <span>{timeAgo(timestamp)}</span>
        </div>
      </div>
      <div className="fee-recipient">
        <div>
          From{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://etherscan.io/address/${receipt.from}`}
          >
            {String(receipt.from).slice(0, 8)}...
            {String(receipt.from).slice(-8)}
          </a>
        </div>
        <div>
          To{" "}
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://etherscan.io/address/${receipt.to}`}
          >
            {String(receipt.to).slice(0, 8)}...{String(receipt.to).slice(-8)}
          </a>
        </div>
      </div>
      <div className="reward">
        {Number(ethers.formatEther(String(receipt.value))).toFixed(5)} Eth
      </div>
    </div>
  );
};

export default Transaction;
