import { NightlyConnectAdapter } from "@nightlylabs/wallet-selector-solana";

export interface ConnectionOptions {
  disableModal?: boolean;
  disableEagerConnect?: boolean;
  initOnConnect?: boolean;
}

let _adapter: NightlyConnectAdapter | undefined;
export const getAdapter = async (
  persisted = true,
  connectionOptions: ConnectionOptions = {}
) => {
  if (_adapter) return _adapter;
  _adapter = await NightlyConnectAdapter.build(
    {
      appMetadata: {
        name: "Solana Template",
        description: "Solana Template",
        icon: "https://docs.nightly.app/img/logo.png",
      },
      persistent: persisted,
    },
    connectionOptions
  );
  return _adapter;
};
