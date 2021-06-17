import {MaterialEye, NotificationBellAdd} from 'assets/svg';
import {Theme, makeStyles} from '@material-ui/core/styles';
import useResponse from 'hooks/useResponse';

import ActivitiesList from './ActivitiesList/ActivitiesList';
import HeaderInformation from './HeaderInformation/HeaderInformation';
import React, {useEffect} from 'react';
import {getActivities} from 'utils/functions';
import {useTranslation} from 'react-i18next';

export interface HeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * Response
     */
    response?: any;

    /**
     * onLaunchActivity
     */
    onLaunchActivity?: Function;

    /**
     * hRef
     */
    hRef: string
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
    infoRight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > svg': {
            fill: theme.palette.primary.contrastText,
            marginRight: theme.spacing(3)
        }
    }
}));

/**
 * Generic contract header, use to display contract name and activities launcher
 * @param {HeaderProps} props Props of the component.
 * @returns {React.component} Display the contract header
 */
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const classes = useStyles();
    const {t} = useTranslation();
    const response = useResponse(props.hRef)
    const [operationHRef, setOperationHRef]: [any, any] = React.useState();
    const responseOperations = useResponse(operationHRef)

    const {
        title = 'Default title',
        onLaunchActivity
    } = props

    const [activities, setActivities] = React.useState([{href: null, name: t('operation:operation_empty_list')}]);

    if (response && !operationHRef) {
        setOperationHRef(response.data._links['cscaia:operations'].href)
    }

    useEffect(() => {
        let formatResponse = getActivities(responseOperations);
        if (formatResponse) {
            setActivities(formatResponse);
        }
    }, [responseOperations])

    console.log('render')

    return (
        <div className={classes.container}>
            <div className={classes.informationContainer}>
                <HeaderInformation title={title}/>
                <div className={classes.infoRight}>
                    <div className={classes.iconContainer}>
                        <MaterialEye size={25}/>
                        <NotificationBellAdd size={25}/>
                    </div>
                    <ActivitiesList activities={activities} onLaunchActivity={onLaunchActivity}/>
                </div>
            </div>
        </div>
    )
}

export default Header;
