import { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import i18nText from '../../../common/i18nText';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '2px 0',
    },
}));

interface Props {
    path?: string;
    isNew?: boolean;
    addFolder?: (path: string) => void;
    addError?: string;
    removeFolder?: (path: string) => void;
}

const TargetFolder: React.FC<Props> = (props: Props) => {
    const { isNew, path, addError } = props;
    const [pathValue, setPathValue] = useState(path);
    const classes = useStyles();
    return (
        <>
            <Grid item xs={12} sm={7} md={9} lg={10} xl={11}>
                <TextField
                    label={i18nText('Folder path')}
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    value={pathValue}
                    onChange={(e) => setPathValue(e.target.value)}
                    disabled={!isNew}
                    error={addError !== undefined && addError.length > 0}
                    helperText={addError}
                />
            </Grid>
            <Grid item xs={12} sm={5} md={3} lg={2} xl={1}>
                <Button
                    variant="contained"
                    color={isNew ? 'primary' : 'secondary'}
                    size="medium"
                    startIcon={isNew ? <AddCircleIcon /> : <DeleteIcon />}
                    fullWidth={true}
                    className={classes.button}
                    onClick={() => {
                        if (isNew && props.addFolder) {
                            props.addFolder(pathValue || '');
                        } else if (props.removeFolder) {
                            props.removeFolder(pathValue || '');
                        }
                    }}
                >
                    {isNew ? i18nText('Add folder') : i18nText('Remove folder')}
                </Button>
            </Grid>
        </>
    );
};

export default TargetFolder;
