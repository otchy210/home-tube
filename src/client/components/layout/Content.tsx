import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Home from '../page/Home';
import Settings from '../page/Settings';
import GlobalError from './GlobalError';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const Content: React.FC<{}> = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <GlobalError />
                <Switch>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Container>
        </main>
    );
};

export default Content;
