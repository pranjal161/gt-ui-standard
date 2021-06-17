import { MaterialEye, NotificationBellAdd } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';

import ActivitiesList from './ActivitiesList/ActivitiesList';
import HeaderInformation from './HeaderInformation/HeaderInformation';
import React from 'react';
import { getActivities } from 'utils/functions';
import { useTranslation } from 'react-i18next';

export interface ContractDisplayHeaderProps {

    /**
     * Title
     */
    title?: string

    /**
     * Response
     */
    response?: any;

    /**
     * SetActivityUrl
     */
     setActivityUrl?: Function;
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
 * @param {ContractDisplayHeaderProps} props Props of the component.
 * @returns {React.component} Display the contract header
 */
const ContractDisplayHeader: React.FC<ContractDisplayHeaderProps> = (props: ContractDisplayHeaderProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const {
        title = 'Default title',
        response,
        setActivityUrl
    } = props

    const [activities, setActivities] = React.useState([{ href: null, name: t('operation:operation_empty_list') }]);

    React.useEffect(() => {
        let formatResponse = getActivities(response);

        if (formatResponse) {
            setActivities(formatResponse);
        }
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.informationContainer}>
                <HeaderInformation title={title} />
                <div className={classes.infoRight}>
                    <div className={classes.iconContainer}>
                        <MaterialEye size={25} />
                        <NotificationBellAdd size={25} />
                    </div>
                    <ActivitiesList activities={activities} setActivityUrl={setActivityUrl} />
                </div>
            </div>
        </div>
    )
}

export default ContractDisplayHeader;