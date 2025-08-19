import * as hl from '@nktkas/hyperliquid'
import { TablePrinter } from '@bobanm/table-printer'
import { NiceDate } from '@bobanm/nice-utils'
import { infoClient } from '../clients'
import credentials from '../../input/credentials.toml'

const openOrders = await infoClient.openOrders({ user: credentials.address })

if (openOrders.length === 0) {
    console.log('There are no open orders.')

    process.exit(1)
}

console.log('\nOpen orders\n')

const ordersTable = new TablePrinter([
    ['DATE', 'COIN', 'SIDE', 'PRICE', 'O.SIZE', 'SIZE'],
])

let orderCount = 0

for (const order of openOrders) {
    ordersTable.addRow([
        new NiceDate(order.timestamp).toFineString(true, true),
        order.coin,
        order.side,
        order.limitPx,
        order.origSz,
        order.sz,
    ])

    orderCount += 1
}

console.log(ordersTable.toString())
console.log(`Total ${orderCount} open orders.`)
