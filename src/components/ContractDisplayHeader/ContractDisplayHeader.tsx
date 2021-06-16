import { MaterialEye, NotificationBellAdd } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';

import Dropdown from './DropDown/DropDown';
import React from 'react';
import { getActivities } from 'utils/functions';

export interface ContractDisplayHeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * Response
     */
    response?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: '14px 32px',
        maxHeight: '70px',
        borderRadius: '8px 8px 0px 0px',
    },
    informationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoLeft: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        boxSizing: 'border-box',
    },
    infoRight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: theme.palette.primary.contrastText,
        margin: '0',
        marginRight: '15px',
        fontWeight: 600,
        fontSize: 20,
    },
    pictureSlot: {
        height: 40,
        width: 40,
        backgroundColor: theme.palette.text.primary,
        borderRadius: '8px',
        marginRight: '15px'
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > svg': {
            fill: theme.palette.primary.contrastText,
            marginRight: 25
        }
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
 * Generic contract header, use to display contract name and activities launcher
 * @param {ContractDisplayHeaderProps} props Props of the component.
 * @returns {React.component} Display the contract header
 */
const ContractDisplayHeader: React.FC<ContractDisplayHeaderProps> = (props: ContractDisplayHeaderProps) => {
    const classes = useStyles();
    const {
        title,
        response
    } = props

    const [activities, setActivities] = React.useState([{ href: 'empty', name: 'No operations available' }]);

    React.useEffect(() => {
        let formatResponse = getActivities(response);

        if (formatResponse) {
            setActivities(formatResponse);
        }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.informationContainer}>
                <div className={classes.infoLeft}>
                    <div className={classes.pictureSlot}></div>
                    <div className={classes.titleContainer}>
                        <p className={classes.title}>{title}</p>
                        <p className={classes.title}>Contract view</p>
                    </div>
                </div>
                <div className={classes.infoRight}>
                    <div className={classes.iconContainer}>
                        <MaterialEye size={25} />
                        <NotificationBellAdd size={25} />
                    </div>
                    <Dropdown activities={activities} />
                </div>
            </div>
        </div>
    )
}

export default ContractDisplayHeader;