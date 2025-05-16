/* eslint-disable react-hooks/exhaustive-deps */
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { getAdapter } from "../misc/adapter";
import { getSolana } from "../misc/solana";
import ActionStarryButton from "./ActionStarryButton";
import StarryButton from "./StarryButton";
import ChangeNetworkButton from "./ChangeNetworkButton";
import nacl from "tweetnacl";
import bs58 from "bs58";
import type { SolanaSignInInput } from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";

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
                    error: (error) => {
                      console.log(error);
                      return "Operation has been rejected!";
                    },
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
                    const msg = new Uint8Array(
                      Buffer.from("I love Nightly 🦊")
                    );
                    const signature = await adapter.signMessage(msg);

                    // Verify the signature
                    const signatureBuffer = signature;
                    const publickeyBuffer = bs58.decode(publicKey);
                    const isVerified = nacl.sign.detached.verify(
                      msg,
                      signatureBuffer,
                      publickeyBuffer
                    );
                    // console.log(isVerified);
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

              <ActionStarryButton
                onClick={async () => {
                  const signMessage = async () => {
                    // const adapter = await getAdapter();
                    //@ts-expect-error
                    const adapter = window.nightly.solana;
                    const msg = "I love Nightly 🦊";
                    const signIn = adapter.features["solana:signIn"].signIn;
                    if (!signIn) {
                      throw new Error("signIn not supported");
                    }
                    const input: SolanaSignInInput = {
                      domain: window.location.host,
                      address: publicKey,
                      statement: "Please sign in.",
                    };

                    const output = await signIn(input);
                    const isVerified = verifySignIn(input, output[0]);
                    if (!isVerified) {
                      throw new Error("Sign In verification failed!");
                    }
                  };
                  toast.promise(signMessage, {
                    loading: "SignIn...",
                    success: (_) => {
                      return `SignIn Success!`;
                    },
                    error: "Operation has been rejected!",
                  });
                }}
                name="SignIn"
              ></ActionStarryButton>

              {/* Custom function to change network */}
              {walletName === "Nightly" ? (
                <ChangeNetworkButton
                  onClick={async (
                    genesisHash: string,
                    url: string | undefined
                  ) => {
                    try {
                      const adapter = await getAdapter();
                      await adapter.changeNetwork({ genesisHash, url });
                      toast.success("Network changed!");
                    } catch (err) {
                      console.log(err);
                      toast.error("Changing network failed");
                    }
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
