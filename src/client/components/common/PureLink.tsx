import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useClasses = makeStyles((theme) => ({
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
}));

interface Props {
    to: string;
    children: React.ReactNode;
}

const PureLink: React.FC<Props> = ({ to, children }) => {
    const classes = useClasses();
    return (
        <Link to={to} className={classes.link}>
            {children}
        </Link>
    );
};

export default PureLink;
