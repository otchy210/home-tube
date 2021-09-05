import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SIDE_MENU_WIDTH } from './Base';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: SIDE_MENU_WIDTH,
        width: `calc(100% - ${SIDE_MENU_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
}));

interface Props {
    menuOpened: boolean;
    openMenu: () => void;
}

const Header: React.FC<Props> = ({ menuOpened, openMenu }) => {
    const classes = useStyles();
    return (
        <AppBar position="absolute" className={clsx(classes.appBar, menuOpened && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={openMenu}
                    className={clsx(classes.menuButton, menuOpened && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography>HomeTube</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
