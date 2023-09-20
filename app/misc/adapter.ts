import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-solana'

// Create a single supabase client for interacting with your database
let _adapter: NightlyConnectAdapter | undefined
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter
  _adapter = await NightlyConnectAdapter.build(
    {
      appMetadata: {
        name: 'NC TEST AlephZero',
        description: 'Nightly Connect Test',
        icon: 'https://docs.nightly.app/img/logo.png',
        additionalInfo: 'Courtesy of Nightly Connect team',
      },
      network: 'AlephZero',
    },
    persisted
  )
  return _adapter
}
