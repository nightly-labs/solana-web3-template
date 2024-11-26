import React, { useState } from "react";
import "./StarryButton.css";
export interface ChangeNetworkButtonProps {
  onClick: (genesisHash: string, url: string | undefined) => Promise<void>;
}
export interface INetwork {
  name: string;
  genesisHash: string;
  url: string | undefined;
}
const CUSTOM_NETWORK: INetwork[] = [
  {
    name: "Solana Mainnet",
    genesisHash: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d",
    url: undefined,
  },
  {
    name: "Solana Testnet",
    genesisHash: "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY",
    url: undefined,
  },
  {
    name: "Solana Devnet",
    genesisHash: "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG",
    url: undefined,
  },
  {
    name: "Eclipse Mainnet",
    genesisHash: "EAQLJCV2mh23BsK2P9oYpV5CHVLDNHTxYss3URrNmg3s",
    url: undefined,
  },
  {
    name: "Eclipse Testnet",
    genesisHash: "CX4huckiV9QNAkKNVKi5Tj8nxzBive5kQimd94viMKsU",
    url: undefined,
  },
  {
    name: "Eclipse Devnet",
    genesisHash: "8axJLKAqQU9oyULRunGrZTLDEXhn17VWxoH5F7MCmdXG",
    url: undefined,
  },
  {
    name: "Sonic Testnet V0",
    genesisHash: "Ep5wb4kbMk8yHqV4jMXNqDiMWnNtnTh8jX6WY59Y8Qvj",
    url: undefined,
  },
  {
    name: "Sonic Testnet V1",
    genesisHash: "E8nY8PG8PEdzANRsv91C2w28Dbw9w3AhLqRYfn5tNv2C",
    url: undefined,
  },
  {
    name: "Sonic Devnet",
    genesisHash: "BsJstMXKW4DpjzHPsSCdEcAn4YtpNiLFRFa5M5L7UxFx",
    url: undefined,
  },
  // {
  //   name: "Mantis Mainnet",
  //   genesisHash: "3dbfejPqbZ5rgBnNd6wPP45Y5EAniqd2B8PwpV7aduag",
  //   url: undefined,
  // },
  {
    name: "Mantis Testnet",
    genesisHash: "HK9p9HKs63CxRQCHDuRdX7pEuxA4iXCLZvPLr8aywmAa",
    url: undefined,
  },
  {
    name: "Soon Devnet",
    genesisHash: "4y1i28kttkRTjNcKM8i7xXsRK8xBK2ML9TGhn7Ratrws",
    url: undefined,
  },
  {
    name: "Solana Mainnet with url",
    genesisHash: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d",
    url: "https://solana-mainnet.rpc.extrnode.com/85c27167-63a1-4fa3-9971-fc1df7b132dc",
  },
];

const ChangeNetworkButton: React.FC<ChangeNetworkButtonProps> = ({
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSelector = () => setIsOpen(!isOpen);
  const handleNetworkSelect = (networkName: INetwork) => {
    setIsOpen(false);
    onClick(networkName.genesisHash, networkName.url);
  };
  return (
    <>
      <div className="relative">
        <button
          onClick={toggleSelector}
          className="relative overflow-hidden bg-black text-white w-[180px] h-[50px] rounded-lg glow-effect hover:scale-105 transition-transform duration-250 flex items-center justify-center"
        >
          <span className="z-10 flex items-center">
            Change network
            <span className="ml-2 inline-block w-4 h-4">
              {isOpen ? (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </span>
          </span>
          <div className="absolute inset-0 bg-black stars-bg animate-move-stars z-0"></div>
        </button>

        {isOpen && (
          <div
            className="absolute mt-1 w-[180px] bg-black border border-gray-700 rounded-lg shadow-lg z-20 sm:max-h-screen max-h-[200px] overflow-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "gray transparent",
            }}
          >
            {CUSTOM_NETWORK.map((network) => (
              <div
                key={network.name}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-white relative z-10"
                onClick={() => handleNetworkSelect(network)}
              >
                {network.name}
              </div>
            ))}
            <div className="absolute inset-0 bg-black stars-bg animate-move-stars z-0"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangeNetworkButton;
