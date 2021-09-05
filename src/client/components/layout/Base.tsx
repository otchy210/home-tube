import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { useState } from 'react';
import Header from './Header';
import Content from './Content';
import Menu from './Menu';

export const SIDE_MENU_WIDTH = 240;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
}));

const Base: React.FC<{}> = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header
                menuOpened={menuOpened}
                openMenu={() => {
                    setMenuOpened(true);
                }}
            />
            <Menu
                menuOpened={menuOpened}
                closeMenu={() => {
                    setMenuOpened(false);
                }}
            />
            <Content />
        </div>
    );
};

export default Base;
