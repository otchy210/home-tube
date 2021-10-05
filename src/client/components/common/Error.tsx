import { Alert } from '@material-ui/lab';
import { ReactNode } from 'react';
import { useAlertStyles } from './useAlertStyles';

interface Props {
    children?: ReactNode;
}

const Error: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const classes = useAlertStyles();
    return (
        <Alert severity="error" className={classes.alert}>
            {children}
        </Alert>
    );
};

export default Error;
