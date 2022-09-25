import * as test from "lib-pareto-test"
import { DDependencies } from "../dependencies/dependencies.p"

export type FCreateGetTestset = (
    $: {},
    $d: DDependencies
) => test.FGetTestSet