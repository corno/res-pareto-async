import * as pt from 'pareto-core-types'
import * as pi from 'pareto-core-internals'

import * as api from "../../interface"

export const aggregate: api.FCreateAggregater = ($d) => {
    function x<PD, PT>(
        $d: {
            connectToStream: (
                $: PD,
                $i: api.IStreamConsumer<PT>
            ) => void
        }
    ): api.FGetAsyncData<PD, pt.Array<PT>> {
        return ($) => {
            return pi.wrapAsyncValueImp(
                true,
                (cb) => {
                    const temp: PT[] = []
                    $d.connectToStream(
                        $,
                        {
                            onData: ($) => {
                                temp.push($)
                            },
                            onEnd: () => {
                                cb(pi.wrapRawArray(temp))
                            }
                        }
                    )
                }
            )


        }
    }
    return x($d)
}
