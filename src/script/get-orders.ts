import * as hl from '@nktkas/hyperliquid'
import credentials from '../../input/credentials.toml'

const infoClient = new hl.InfoClient({ transport: new hl.HttpTransport() })

const openOrders = await infoClient.openOrders({ user: credentials.address })
console.log(openOrders)
