declare type JsonSerializable =
    | null
    | boolean
    | number
    | string
    | [JsonSerializable]
    | { [key: string]: JsonSerializable };
