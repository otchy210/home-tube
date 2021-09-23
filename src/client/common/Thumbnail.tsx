import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

interface Props {
    moviePath: string;
}

const Thumbnail: React.FC<Props> = ({ moviePath }) => {
    const classes = useStyles();
    return <Paper className={classes.paper}>{moviePath}</Paper>;
};

export default Thumbnail;
