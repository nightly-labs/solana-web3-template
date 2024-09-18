/* eslint-disable react-hooks/exhaustive-deps */
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { getAdapter } from "../misc/adapter";
import { getSolana } from "../misc/solana";
import ActionStarryButton from "./ActionStarryButton";
import StarryButton from "./StarryButton";
import ChangeNetworkButton from "./ChangeNetworkButton";

const StickyHeader: React.FC = () => {
  const [publicKey, setPublicKey] = React.useState<string | undefined>();
  const [walletName, setWalletName] = React.useState<string | undefined>();
  useEffect(() => {
    const init = async () => {
      const adapter = await getAdapter();

      adapter.on("connect", (publicKey) => {
        if (publicKey) {
          setPublicKey(publicKey.toString());
          setWalletName(adapter.selectedWallet?.name);
        }
      });

      adapter.on("disconnect", () => {
        setPublicKey(undefined);
      });

      adapter.on("change", (a) => {
        if (!!a.accounts?.length) setPublicKey(a.accounts[0].address);
      });

      if (await adapter.canEagerConnect()) {
        try {
          await adapter.connect();
        } catch (error) {
          await adapter.disconnect().then(() => {});
          console.log(error);
        }
      }
    };
    init();
    // Try eagerly connect
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-50  p-6 z-10">
      <div className="flex items-center justify-between">
        <div>
          {/* <Image
            style={{ width: '200px', cursor: 'pointer' }}
            src={NightlyLogo}
            alt='logo'
            onClick={() => {
              // redirect to nightly.app
              window.location.href = 'https://nightly.app'
            }}
          /> */}
        </div>
        <div className="flex flex-col space-y-4">
          <StarryButton
            connected={publicKey !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter();
              try {
                await adapter.connect();
              } catch (error) {
                await adapter.disconnect().then(() => {});
                console.log(error);
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter();

                await adapter.disconnect();
              } catch (error) {
                console.log(error);
              }
            }}
            publicKey={publicKey}
          />
          {publicKey && (
            <>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const solana = getSolana();
                    const adapter = await getAdapter();
                    const ix = SystemProgram.transfer({
                      fromPubkey: new PublicKey(publicKey),
                      lamports: 1e6,
                      toPubkey: new PublicKey(
                        "C3XueH9USYvEioWKvn3TkApiAf2TjYd7Gpqi83h6cNXg"
                      ),
                    });
                    const tx = new Transaction().add(ix);
                    const a = await solana.getLatestBlockhash();
                    tx.recentBlockhash = a.blockhash;
                    tx.feePayer = new PublicKey(publicKey);
                    const signedTx = await adapter.signTransaction!(tx);
                    const sig = await solana.sendRawTransaction(
                      signedTx.serialize()
                    );
                    toast.success("Transaction sent!", {
                      action: {
                        label: "Show Transaction",
                        onClick: () => {
                          // Open url in a new tab
                          window.open(
                            `https://explorer.solana.com/tx/${sig}`,
                            "_blank"
                          );
                        },
                      },
                    });
                  };
                  toast.promise(signTransaction, {
                    loading: "Signing Transaction...",
                    success: (_) => {
                      return `Transaction signed!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="Sign Transaction"
              ></ActionStarryButton>
              <ActionStarryButton
                onClick={async () => {
                  const signAllTransactions = async () => {
                    const solana = getSolana();
                    const adapter = await getAdapter();
                    const ix = SystemProgram.transfer({
                      fromPubkey: new PublicKey(publicKey),
                      lamports: 1e6,
                      toPubkey: new PublicKey(
                        "C3XueH9USYvEioWKvn3TkApiAf2TjYd7Gpqi83h6cNXg"
                      ),
                    });
                    const txs = [
                      new Transaction().add(ix),
                      new Transaction().add(ix).add(ix),
                    ];

                    const a = await solana.getLatestBlockhash();
                    for (const tx of txs) {
                      tx.recentBlockhash = a.blockhash;
                      tx.feePayer = new PublicKey(publicKey);
                    }

                    const sendPromises: Promise<string>[] = [];
                    const signedTxs = await adapter.signAllTransactions!(txs);
                    for (const signedTx of signedTxs) {
                      sendPromises.push(
                        solana.sendRawTransaction(signedTx.serialize())
                      );
                    }

                    toast.promise(Promise.all(sendPromises), {
                      loading: "Sending Transactions...",
                      success: (_) => {
                        return `Transactions sent!`;
                      },
                      error: "Transactions failed to send!",
                    });
                  };
                  toast.promise(signAllTransactions, {
                    loading: "Signing Transactions...",
                    success: (_) => {
                      return `Transactions signed!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="Sign All"
              ></ActionStarryButton>
              <ActionStarryButton
                onClick={async () => {
                  const signMessage = async () => {
                    const adapter = await getAdapter();
                    await adapter.signMessage(
                      new Uint8Array(Buffer.from("I love Nightly 🦊"))
                    );
                  };
                  toast.promise(signMessage, {
                    loading: "Signing message...",
                    success: (_) => {
                      return `Message signed!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="Sign Message"
              ></ActionStarryButton>
              {/* Custom function to change network */}
              {walletName === "Nightly" ? (
                <ChangeNetworkButton
                  onClick={async (
                    genesisHash: string | undefined,
                    url: string | undefined
                  ) => {
                    //get actual genesisHash
                    // window.nightly.solana.genesisHash

                    //@ts-ignore
                    await window?.nightly?.solana?.changeNetwork({
                      genesisHash,
                      url,
                    });
                  }}
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default StickyHeader;
