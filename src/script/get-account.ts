import * as hl from '@nktkas/hyperliquid'
import { TablePrinter } from '@bobanm/table-printer'
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

    const positionsTable = new TablePrinter([
        ['COIN', 'AMOUNT', 'VALUE', 'B.PRICE', 'LIQUID', 'FUNDING', 'PROFIT'],
    ])

    for (const position of account.assetPositions) {
        const p = position.position
        totalUnrealizedPnl += Number(p.unrealizedPnl)

        positionsTable.addRow([
            p.coin,
            p.szi,
            removeDecimals(p.positionValue),
            p.entryPx,
            Number(p.liquidationPx ?? 0).toPrecision(5),
            // Invert funding sign, because the response shows received funding as negative
            removeDecimals(-Number(p.cumFunding.sinceOpen)),
            removeDecimals(p.unrealizedPnl),
        ])
    }

    console.log(positionsTable.toString())
}

console.log(`All positions value  $ ${removeDecimals(account.marginSummary.totalNtlPos).padStart(6)}`)
console.log(`Total unrealized PnL $ ${removeDecimals(totalUnrealizedPnl).padStart(6)}`)
console.log(`Net account size     $ ${removeDecimals(account.marginSummary.accountValue).padStart(6)}`)
