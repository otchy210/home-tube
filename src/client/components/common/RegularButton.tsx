import { PropTypes } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '2px 0',
    },
}));

interface Props {
    children?: ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    disabled?: boolean;
    color?: PropTypes.Color;
    startIcon?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const RegularButton: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const classes = useStyles();
    return (
        <Button
            variant={props.variant ?? 'contained'}
            disabled={props.disabled ?? false}
            fullWidth={true}
            size="medium"
            className={classes.button}
            {...props}
        >
            {children}
        </Button>
    );
};

export default RegularButton;
