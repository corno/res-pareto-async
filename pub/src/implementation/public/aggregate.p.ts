import * as pt from "pareto-core-types"
import * as pi from "pareto-core-internals"

import * as api from "api-pareto-async"

export const aggregate: api.FAggregate = ($, $d) => {
    function x<PD, PT>(
        $: PD,
        $d: {
            connectToStream: (
                $: PD,
                $i: api.IStreamConsumer<PT>
            ) => void
        }
    ): pt.AsyncValue<pt.Array<PT>> {
        return pi.wrapAsyncValueImp(
            true,
            {
                _execute: (cb) => {
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
            }
        )

    }
    return x($, $d)
}