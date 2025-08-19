import * as hl from '@nktkas/hyperliquid'
import { exchangeClient } from '../clients'
import { formatOrder, type Order } from '../util/helpers'
import { handleError } from '../util/error'
import order from '../../input/order.toml'

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
