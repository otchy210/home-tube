export type HTMLElementProps = React.HTMLAttributes<HTMLElement>;

export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;

export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type HTMLFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export type HTMLLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    isInvalid?: boolean;
};

export type HTMLCheckboxProps = HTMLInputProps & {
    label?: string;
};

export type HTMLSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export type HTMLUlProps = React.HTMLAttributes<HTMLUListElement>;

export type HTMLLiProps = React.LiHTMLAttributes<HTMLLIElement>;

export type HTMLAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
