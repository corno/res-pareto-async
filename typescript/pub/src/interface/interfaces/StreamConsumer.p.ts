
export type IStreamConsumer<T> = {
    onData: ($: T) => void
    onEnd: () => void
}
