import { Connection } from "@solana/web3.js";

let _solana: Connection | undefined;
export const getSolana = () => {
  if (_solana) return _solana;
  _solana = new Connection(
    "https://rpc.helius.xyz/?api-key=1aa1b801-10ea-47eb-80b7-ca3917b2bca7"
  );
  return _solana;
};
