import * as hl from '@nktkas/hyperliquid'
import credentials from '../input/credentials.toml'

export const infoClient = new hl.InfoClient({ transport: new hl.HttpTransport() })

export const exchangeClient = new hl.ExchangeClient({
    wallet: credentials.key,
    transport: new hl.HttpTransport()
})
