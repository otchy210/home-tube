import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import i18nText from '../../common/i18nText';
import PureLink from '../../common/PureLink';

const MenuList: React.FC<{}> = () => {
    return (
        <List>
            <PureLink to="/">
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={i18nText('Home')} />
                </ListItem>
            </PureLink>
            <PureLink to="/settings">
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={i18nText('Settings')} />
                </ListItem>
            </PureLink>
        </List>
    );
};

export default MenuList;
