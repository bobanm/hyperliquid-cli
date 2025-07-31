import * as hl from '@nktkas/hyperliquid'
import credentials from '../../input/credentials.toml'
import order from '../../input/order.toml'
import { getCoinAssetId } from '../util/helpers'
import { handleError } from '../util/error'

const exchangeClient = new hl.ExchangeClient({
    wallet: credentials.key,
    transport: new hl.HttpTransport()
})

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
