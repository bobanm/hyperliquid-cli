import * as hl from '@nktkas/hyperliquid'
import credentials from '../../input/credentials.toml'
import { removeDecimals } from '../util/helpers'

const infoClient = new hl.InfoClient({ transport: new hl.HttpTransport() })

const account = await infoClient.clearinghouseState({ user: credentials.address })

if (!account) {
    console.log(`Address '${credentials.address}' has no account data on Hyperliquid.`)
    process.exit()
}

console.log(new Date(account.time).toLocaleString())

let totalUnrealizedPnl = 0

if (account.assetPositions.length > 0) {
    console.log('\nPositions\n')
    console.log('COIN'.padEnd(10), 'AMOUNT'.padStart(8), 'VALUE'.padStart(8).padEnd(11), 'B.PRICE'.padEnd(10), 'LIQUID'.padEnd(9), 'FUNDING'.padStart(7), 'PROFIT'.padStart(9))
    console.log('-'.repeat(70))

    for (const position of account.assetPositions) {
        const p = position.position
        totalUnrealizedPnl += Number(p.unrealizedPnl)

        console.log(
            p.coin.padEnd(10),
            p.szi.padStart(8),
            removeDecimals(p.positionValue).padStart(8).padEnd(11),
            p.entryPx.padEnd(10),
            Number(p.liquidationPx ?? 0).toPrecision(5).padEnd(9),
            // Invert funding sign, because the response shows received funding as negative
            removeDecimals(-Number(p.cumFunding.sinceOpen)).padStart(7),
            removeDecimals(p.unrealizedPnl).padStart(9),
        )
    }
}

console.log('\n')
console.log(`All positions value  $ ${removeDecimals(account.marginSummary.totalNtlPos).padStart(6)}`)
console.log(`Total unrealized PnL $ ${removeDecimals(totalUnrealizedPnl).padStart(6)}`)
console.log(`Net account size     $ ${removeDecimals(account.marginSummary.accountValue).padStart(6)}`)
