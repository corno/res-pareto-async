import * as pt from "pareto-core-types"

export type FGetAsyncData<PConfigurationData, PResultData> = (
    $: PConfigurationData,
) => pt.AsyncValue<PResultData>
