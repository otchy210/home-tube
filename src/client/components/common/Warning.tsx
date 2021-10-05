import { withStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ReactNode } from 'react';
import { useAlertStyles } from './useAlertStyles';

interface Props {
    children?: ReactNode;
}

const Warning: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const classes = useAlertStyles();
    return (
        <Alert severity="warning" className={classes.alert}>
            {children}
        </Alert>
    );
};

export default withStyles({})(Warning);
