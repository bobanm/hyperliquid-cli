import { HyperliquidError } from '@nktkas/hyperliquid'

export function handleError(error: Error) {

    if (error instanceof HyperliquidError) {
        console.log('Error:', error.message)
        console.log(error)
    }
    else {
        console.log('An unexpected error occurred:', error)
    }
}
