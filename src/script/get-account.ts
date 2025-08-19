import { TablePrinter } from '@bobanm/table-printer'
import { NiceNumber } from '@bobanm/nice-utils'
import { infoClient } from '../clients'
import credentials from '../../input/credentials.toml'

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
            new NiceNumber(p.positionValue).toSimpleCurrency(),
            p.entryPx,
            Number(p.liquidationPx ?? 0).toPrecision(5),
            // Invert funding sign, because the response shows received funding as negative
            new NiceNumber(-Number(p.cumFunding.sinceOpen)).toSimpleCurrency(),
            new NiceNumber(p.unrealizedPnl).toSimpleCurrency(),
        ])
    }

    console.log(positionsTable.toString())
}

console.log(`All positions value  $ ${new NiceNumber(account.marginSummary.totalNtlPos).toSimpleCurrency().padStart(7)}`)
console.log(`Total unrealized PnL $ ${new NiceNumber(totalUnrealizedPnl).toSimpleCurrency().padStart(7)}`)
console.log(`Net account size     $ ${new NiceNumber(account.marginSummary.accountValue).toSimpleCurrency().padStart(7)}`)
