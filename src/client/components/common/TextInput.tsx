import { TextField } from '@material-ui/core';

interface Props {
    label?: string;
    value?: string | number;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const TextInput: React.FC<Props> = (props: Props) => {
    return <TextField variant="outlined" fullWidth={true} size="small" {...props} />;
};

export default TextInput;
