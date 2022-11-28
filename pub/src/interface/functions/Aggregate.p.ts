import * as pt from "pareto-core-types"
import { IStreamConsumer } from "../interfaces/StreamConsumer.p"
import { FGetAsyncData } from "./GetAsyncData.p"

export type FCreateAggregater = <PConfigurationData, PResultData>(
    $d: {
        connectToStream: (
            $: PConfigurationData,
            $i: IStreamConsumer<PResultData>
        ) => void
    }
) => FGetAsyncData<PConfigurationData, pt.Array<PResultData>>