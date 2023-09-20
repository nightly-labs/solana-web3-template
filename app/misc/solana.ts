import { Connection } from '@solana/web3.js'

let _solana: Connection | undefined
export const getSolana = () => {
  if (_solana) return _solana
  _solana = new Connection('https://rpc.helius.xyz/?api-key=8b0779ce-6e1e-4812-ac61-b17cb4ce1971')
  return _solana
}
