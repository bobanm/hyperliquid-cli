import { describe, expect, test } from 'bun:test'
import { getCoinAssetId } from '../src/util/helpers'

describe("getCoinAssetId()", () => {
    test("Returns asset ID of an existing coin", () => {
        expect(getCoinAssetId('BTC')).toBe(0)
        expect(getCoinAssetId('ETH')).toBe(1)
        expect(getCoinAssetId('SOL')).toBe(5)
        expect(getCoinAssetId('OP')).toBe(9)
        expect(getCoinAssetId('DOGE')).toBe(12)
    })

    test("Throws when provided a non-existing coin symbol", () => {
        expect(() => getCoinAssetId('DUMMY')).toThrow("Coin 'DUMMY' is not available for perp trading on Hyperliquid.")
    })
})