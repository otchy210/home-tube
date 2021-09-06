import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import i18nText from '../common/i18nText';

const MenuList: React.FC<{}> = () => {
    return (
        <List>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={i18nText('Home')} />
            </ListItem>
        </List>
    );
};

export default MenuList;
