import {ActivityProps} from 'components/Activity/Activity';
import {addSecondaryTabByID} from 'store/reducers/secondaryTabsReducer';
import {addWindowTabByID} from 'store/reducers/newWindowReducer';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export interface openNewTabProps {

    /**
     * Id of the item, use to prevent doublon tab
     */
    id: string

    /**
     * SubTitle
     */
    subTitle?: string

    /**
     * activityProps
     */
    activityProps:ActivityProps
}

const useTabs = () => {
    let dispatch = useDispatch();
    const {t} = useTranslation()
    const history = useHistory();

    const openNewTab = ({id, subTitle, activityProps }:openNewTabProps) => {
        dispatch(addSecondaryTabByID({
            tabId: id,
            tabType: activityProps.entityType,
            displayTabLabel: t(`common:${activityProps.activityCode}Tab`, {value:id, activity:activityProps.activityCode}),
            displayTabSmallLabel: subTitle,
            href: activityProps.hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    const openNewTabInSecondaryWindow = ({id, subTitle, activityProps }:openNewTabProps) => {
        dispatch(addWindowTabByID({
            tabId: id,
            tabType: activityProps.entityType,
            displayTabLabel: t(`common:${activityProps.activityCode}Tab`, {value:id, activity:activityProps.activityCode}),
            displayTabSmallLabel: subTitle,
            href: activityProps.hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    return {openNewTab, openNewTabInSecondaryWindow}
}

export default useTabs
