import * as hl from '@nktkas/hyperliquid'
import { exchangeClient } from '../clients'
import { getCoinAssetId } from '../util/helpers'
import { handleError } from '../util/error'
import order from '../../input/order.toml'

const cancelOrder: hl.CancelParameters = {
    cancels: [{
        a: getCoinAssetId(order.coin),
        o: order.orderId,
    }]
}

try {
    const response = await exchangeClient.cancel(cancelOrder)
    if (response.status === 'ok') {
        console.log(`Order '${order.orderId}' canceled.`)
    }
}
catch (error) {
    handleError(error as Error)
}
