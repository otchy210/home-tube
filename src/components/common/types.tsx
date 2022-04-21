export type HTMLDivProps = React.HTMLAttributes<HTMLDivElement>;

export type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export type HTMLFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    isInvalid?: boolean;
};
