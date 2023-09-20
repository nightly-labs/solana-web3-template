import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

let _adapter: NightlyConnectAdapter | undefined
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter
  _adapter = await NightlyConnectAdapter.build(
    {
      appMetadata: {
        name: 'Solana Template',
        description: 'Solana Template',
        icon: 'https://docs.nightly.app/img/logo.png',
      },
    },
    persisted
  )
  return _adapter
}
