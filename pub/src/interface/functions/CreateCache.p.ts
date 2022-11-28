import * as pt from "pareto-core-types"

import { FGetAsyncData } from "./GetAsyncData.p"

export type FCreateCache = <PResultData>(
    $d: {
        getData: FGetAsyncData<string, PResultData>
    }
) => FGetAsyncData<string, PResultData>