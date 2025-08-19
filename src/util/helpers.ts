import type { OrderParams, TIF } from '@nktkas/hyperliquid/types'
import { universe as coins } from '../../config/coins.json'

export type Order = {
    coin: string,
    price: number,
    amount: number,
    isReduceOnly: boolean,
    tif: TIF
    orderId: number,
}

/**
 * Look up Hyperliquid's universe for index [asset ID] that corresponds to the provided coin symbol.
 * @param coinSymbol - Human readable coin symbol e.g. ETH
 * @returns Index of the coin, as expected by Hyperliquid
 */
export function getCoinAssetId(coinSymbol: string): number {

    for (const [index, coin] of coins.entries()) {
        if (coin.name === coinSymbol) {
            return index
        }
    }

    throw new Error(`Coin '${coinSymbol}' is not available for perp trading on Hyperliquid.`)
}

/**
 * @param order - Order object specified in input/order.toml
 * @returns Order object in the shape that SDK expects.
*/
export function formatOrder(order: Order): OrderParams {

    return {
        a: getCoinAssetId(order.coin),
        b: order.amount >= 0,
        p: order.price.toString(),
        s: Math.abs(order.amount).toString(),
        r: order.isReduceOnly,
        t: { limit: { tif: order.tif as TIF } },
    }
}
