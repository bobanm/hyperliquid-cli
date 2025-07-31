import * as hl from '@nktkas/hyperliquid'
import credentials from '../../input/credentials.toml'
import order from '../../input/order.toml'
import { formatOrder, type Order } from '../util/helpers'
import { handleError } from '../util/error'

const exchangeClient = new hl.ExchangeClient({
    wallet: credentials.key,
    transport: new hl.HttpTransport()
})

const modifyOrder: hl.ModifyParameters = {
    oid: order.orderId,
    order: formatOrder(order as Order),
}

try {
    const response = await exchangeClient.modify(modifyOrder)
    if (response.status === 'ok') {
        console.log(`Order '${order.orderId}' updated.`)
    }
}
catch (error) {
    handleError(error as Error)
}
