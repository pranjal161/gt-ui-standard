import {MaterialEye, NotificationBellAdd} from 'assets/svg';
import {Theme, makeStyles} from '@material-ui/core/styles';
import ActivitiesList from './ActivitiesList/ActivitiesList';
import HeaderInformation from './HeaderInformation/HeaderInformation';
import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react';
import useResponse from 'hooks/useResponse';

export interface HeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * onLaunchActivity
     */
    onLaunchActivity?: any;

    /**
     * hRef
     */
    hRef: string
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(2, 4),
        maxHeight: '70px',
        borderRadius: '8px 8px 0px 0px',
    },
    informationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '-5px'
    },
    infoRight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    iconContainer: {
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: theme.spacing(2),
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
    const [response] = useResponse(props.hRef)
    const [operationHRef, setOperationHRef]: [any, any] = React.useState();

    const {
        title = 'Default title',
        onLaunchActivity
    } = props

    if (response && !operationHRef) {
        setOperationHRef(response.data._links['cscaia:operations'].href)
    }

    return (
        <div className={classes.container}>
            <div className={classes.informationContainer}>
                <HeaderInformation title={title}/>
                <div className={classes.infoRight}>
                    <div className={classes.iconContainer}>
                        <IconButton color={'inherit'}> <MaterialEye/></IconButton>
                        <IconButton color={'inherit'}><NotificationBellAdd/></IconButton>
                    </div>
                    <ActivitiesList hRef={operationHRef} onLaunchActivity={onLaunchActivity}/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header);
