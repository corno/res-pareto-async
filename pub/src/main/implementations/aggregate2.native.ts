import * as pt from 'pareto-core-types'
import * as pi from 'pareto-core-internals'

export const aggregate2: <PResultData>(
    $d: {
        callback: ($i: ($: PResultData) => void) => void
    }
) => pt.AsyncValue<PResultData> = ($d) => {
    return pi.wrapAsyncValueImp(
        true,
        (cb) => {
            let hasBeenCalled = false
            $d.callback(($) => {
                if (hasBeenCalled) {
                    throw new Error("Called twice")
                }
                hasBeenCalled = true
                cb($)
            })
        }
    )
}