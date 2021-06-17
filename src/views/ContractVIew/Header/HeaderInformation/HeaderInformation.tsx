import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';
import { useTranslation } from 'react-i18next';

export interface HeaderInformationProps {

    /**
     * Title
     */
    title?: string
}

const useStyles = makeStyles((theme: Theme) => ({
    informationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        boxSizing: 'border-box',
    },
    title: {
        color: theme.palette.primary.contrastText,
        margin: '0',
        marginRight: theme.spacing(2),
        fontWeight: 600,
        fontSize: 20,
    },
    pictureSlot: {
        height: 40,
        width: 40,
        backgroundColor: theme.palette.text.primary,
        borderRadius: '8px',
        marginRight: theme.spacing(2)
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 40,
        boxSizing: 'border-box',
        '& :first-child': {
            fontWeight: 300,
            fontSize: 12,
        }
    }
}));

/**
 * Information container for the contract header
 * @param {HeaderInformationProps} props Props of the component.
 * @returns {React.component} Display the header information (Title)
 */
const HeaderInformation: React.FC<HeaderInformationProps> = (props: HeaderInformationProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        title,
    } = props

    return (
        <div className={classes.informationContainer}>
            <div className={classes.pictureSlot} />
            <div className={classes.titleContainer}>
                <p className={classes.title}>{title}</p>
                <p className={classes.title}>{t('operation:contract_title')}</p>
            </div>
        </div>
    )
}

export default HeaderInformation;