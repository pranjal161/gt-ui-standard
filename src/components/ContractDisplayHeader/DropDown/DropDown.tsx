import { Theme, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { capitalizeFirstLetterAndRemove_ } from 'utils/functions';
import { useTranslation } from 'react-i18next';

// import { globalTokens } from 'theme/standard/palette';
export interface DropDownProps {

    /**
     * Activities
     */
    activities?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
        fontWeight: 400
    },
    dropDown: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.text.primary,
        borderRadius: 4
    },
}));

/**
 * Dropdown to display activities list available
 * @param {DropDownProps} props Props of the component.
 * @returns {React.component} Display the dropdown for activities
 */
const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        activities
    } = props

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (element: string) => {
        console.log(element);
        setAnchorEl(null);
    };

    return (
        <div className={classes.dropDown}>
            <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} data-testid="button-activities">
                {t('operation:activities')}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    activities &&
                    activities.map((item: any, key: number) => (
                        <MenuItem key={key} onClick={() => handleClose(activities[key].href)}>{capitalizeFirstLetterAndRemove_(activities[key].name)}</MenuItem>))
                }
            </Menu>
        </div>
    )
}

export default DropDown;