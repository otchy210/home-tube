import { useState } from 'react';
import { Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import i18nText from '../../../common/i18nText';
import TextInput from '../../common/TextInput';
import RegularButton from '../../common/RegularButton';

interface Props {
    path?: string;
    isNew?: boolean;
    addFolder?: (path: string) => void;
    errorText?: string;
    removeFolder?: (path: string) => void;
}

const TargetFolder: React.FC<Props> = (props: Props) => {
    const { isNew, path, errorText } = props;
    const [pathValue, setPathValue] = useState(path);
    return (
        <>
            <Grid item xs={12} sm={7} md={9} lg={10} xl={11}>
                <TextInput
                    label={i18nText('Folder path')}
                    value={pathValue}
                    onChange={(e) => setPathValue(e.target.value)}
                    disabled={!isNew}
                    errorText={errorText}
                />
            </Grid>
            <Grid item xs={12} sm={5} md={3} lg={2} xl={1}>
                <RegularButton
                    color={isNew ? 'primary' : 'secondary'}
                    variant="outlined"
                    startIcon={isNew ? <AddCircleIcon /> : <DeleteIcon />}
                    onClick={() => {
                        if (isNew && props.addFolder) {
                            props.addFolder(pathValue || '');
                        } else if (props.removeFolder) {
                            props.removeFolder(pathValue || '');
                        }
                    }}
                >
                    {isNew ? i18nText('Add folder') : i18nText('Remove folder')}
                </RegularButton>
            </Grid>
        </>
    );
};

export default TargetFolder;
