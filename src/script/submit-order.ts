import * as hl from '@nktkas/hyperliquid'
import { exchangeClient } from '../clients'
import { formatOrder, type Order } from '../util/helpers'
import { handleError } from '../util/error'
import order from '../../input/order.toml'

const newOrder: hl.OrderParameters = {
    orders: [formatOrder(order as Order)],
    grouping: 'na',
}

try {
    const response = await exchangeClient.order(newOrder)
    if (response.status === 'ok') {
        console.log(response.response.data.statuses[0])
    }
}
catch (error) {
    handleError(error as Error)
}
