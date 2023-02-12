import * as pi from 'pareto-core-internals'
import * as pt from 'pareto-core-types'

import * as api from "../../interface"

export const createCache: api.FCreateCache = ($d) => {
    function x<T>(
        $d: {
            getData: ($: string) => pt.AsyncValue<T>
        }
    ): api.FGetAsyncData<string, T> {

        const resolved: { [key: string]: T } = {}
        const resolving: {
            [key: string]: {
                _isGuaranteedToReturnAResult: boolean
                callbacks: ((v: T) => void)[]
            }
        } = {}
        return (key) => {
            const resolvedEntry = resolved[key]
            if (resolvedEntry !== undefined) {
                return pi.wrapAsyncValueImp(
                    true,
                    (cb) => {
                        cb(resolvedEntry)
                    }
                )
            } else {
                const entryBeingResolved = resolving[key]
                if (entryBeingResolved !== undefined) {
                    return pi.wrapAsyncValueImp(
                        entryBeingResolved._isGuaranteedToReturnAResult,
                        (cb) => {
                            entryBeingResolved.callbacks.push(cb)
                        }
                    )
                } else {
                    const callbacks: ((v: T) => void)[] = []
                    const x = $d.getData(key)

                    resolving[key] = {
                        _isGuaranteedToReturnAResult: x._isGuaranteedToReturnAResult,
                        callbacks,
                    }

                    return pi.wrapAsyncValueImp(
                        x._isGuaranteedToReturnAResult,
                        (cb) => {
                            callbacks.push(cb)
                            x._execute((v) => {
                                callbacks.forEach(($) => {
                                    $(v)
                                })
                                resolved[key] = v
                                delete resolving[key]
                            })
                        }
                    )
                }
            }
        }
    }
    return x($d)
}