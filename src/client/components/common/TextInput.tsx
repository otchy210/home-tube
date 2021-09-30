import { TextField } from '@material-ui/core';

interface Props {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    errorText?: string;
    helperText?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const TextInput: React.FC<Props> = (props: Props) => {
    const { errorText, helperText, ...subProps } = props;
    return (
        <TextField
            variant="outlined"
            fullWidth={true}
            size="small"
            error={errorText ? errorText.length > 0 : false}
            helperText={helperText ?? errorText}
            {...subProps}
        />
    );
};

export default TextInput;
