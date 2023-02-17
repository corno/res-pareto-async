import * as pd from 'pareto-core-data'

import * as mproject from "lib-pareto-typescript-project/dist/submodules/project"

const d = pd.wrapRawDictionary

import { $ as api } from "./api.data"

export const $: mproject.T.Project = {
    'author': "Corno",
    'description': "asynchronous functions that are not supported by the language itself",
    'license': "ISC",

    'dependencies': d({
    }),
    'type': ['library', {
        'main': {
            'definition': api,
        },
        'submodules': d({
        }),
        'executables': d({}),
        'test': {
            'dependencies': d({
            }),
            'glossary': {
                'functions': d({}),
                'imports': d({}),
                'parameters': d({}),
                'types': d({}),
                'interfaces': d({}),
            },
        }
    }],
}