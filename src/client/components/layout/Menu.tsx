import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, IconButton } from '@material-ui/core';
import { SIDE_MENU_WIDTH } from './Base';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuList from './MenuList';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: SIDE_MENU_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
}));

interface Props {
    menuOpened: boolean;
    closeMenu: () => void;
}

const Menu: React.FC<Props> = ({ menuOpened, closeMenu }) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !menuOpened && classes.drawerPaperClose),
            }}
            open={menuOpened}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={closeMenu}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <MenuList />
        </Drawer>
    );
};

export default Menu;
