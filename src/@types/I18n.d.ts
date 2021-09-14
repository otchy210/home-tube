declare type Translations = {
    [key: string]: { [context: string]: string };
};

declare interface I18n {
    locale?: string;
    translations?: Translations;
}
