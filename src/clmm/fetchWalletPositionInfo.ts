import {
  CLMM_PROGRAM_ID,
  CLMM_LOCK_PROGRAM_ID,
  getPdaPersonalPositionAddress,
  PositionInfoLayout,
  DEVNET_PROGRAM_ID,
  getPdaLockClPositionIdV2,
  LockClPositionLayoutV2,
} from '@raydium-io/raydium-sdk-v2'
import { initSdk, connection, owner } from '../config'
import { fetchPositionInfo } from './fetchPositionInfo'
import { AccountLayout, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

export const fetchWalletPositionInfo = async () => {
  const raydium = await initSdk()

  const programId = CLMM_PROGRAM_ID // devent: DEVNET_PROGRAM_ID.CLMM_PROGRAM_ID
  const positionInfo = await raydium.clmm.getOwnerPositionInfo({ programId })
  const lockPositionInfo = await raydium.clmm.getOwnerLockedPositionInfo({ programId: CLMM_LOCK_PROGRAM_ID }) // devnet:  DEVNET_PROGRAM_ID.CLMM_LOCK_PROGRAM_ID

  /** if you don't want to use sdk fetch owner all position info, try below to fetch by wallet */
   const wallet = new PublicKey('GLniXqcPArMhPju83aeCuwqFEEbN9yqRc813CJDg8dEg')
   const [ownerTokenAccountResp, ownerToken2022AccountResp] = await Promise.all([
     connection.getTokenAccountsByOwner(wallet, { programId: TOKEN_PROGRAM_ID }),
     connection.getTokenAccountsByOwner(wallet, { programId: TOKEN_2022_PROGRAM_ID }),
   ])
   const possibleMints: PublicKey[] = []
   for (const { account } of [...ownerTokenAccountResp.value, ...ownerToken2022AccountResp.value]) {
     const accountInfo = AccountLayout.decode(new Uint8Array(account.data))
     const { mint, amount } = accountInfo
     if (amount.toString() === '1') possibleMints.push(mint)
   }



  for await (const position of positionInfo) {
   const data = await fetchPositionInfo({
      positionNftMint: position.nftMint,
      positionData: position,
      raydium,
      programId,
      notExit: true,
    })
    console.log(data.priceRange+"!!!!")
  }

}

/** uncomment code below to execute */
fetchWalletPositionInfo()
