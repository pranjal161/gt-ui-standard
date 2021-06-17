import { Theme, makeStyles } from '@material-ui/core/styles';

import Button from 'theme/components/material/Button/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { capitalizeFirstLetterAndRemove_ } from 'utils/functions';
import { useTranslation } from 'react-i18next';

// import { globalTokens } from 'theme/standard/palette';
export interface ActivitiesListProps {

    /**
     * Activities
     */
    activities?: any;

    /**
     * onLaunchActivity
     */
    onLaunchActivity?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        textTransform: 'none',
        color: theme.palette.primary.contrastText,
        fontWeight: 400
    },
    ActivitiesList: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.text.primary,
        borderRadius: 4
    },
}));

/**
 * ActivitiesList to display activities list available
 * @param {ActivitiesListProps} props Props of the component.
 * @returns {React.component} Display the ActivitiesList for activities
 */
const ActivitiesList: React.FC<ActivitiesListProps> = (props: ActivitiesListProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        activities,
        onLaunchActivity
    } = props

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChoice = (event: React.MouseEvent<EventTarget>, operationDetail: any) => {
        if (onLaunchActivity) {
            onLaunchActivity(operationDetail)
        }
        setAnchorEl(null);
    };

    return (
        <div className={classes.ActivitiesList}>
            <Button className={classes.button} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} data-testid="button-activities">
                {t('common:activities')}
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
                        <MenuItem key={key} onClick={(event) => handleChoice(event, item) }>{capitalizeFirstLetterAndRemove_(item.name)}</MenuItem>))
                }
            </Menu>
        </div>
    )
}

export default ActivitiesList;
