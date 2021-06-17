import {useTranslation} from 'react-i18next';
import {addSecondaryTabByID} from 'store/reducers/secondaryTabsReducer';
import {addWindowTabByID} from 'store/reducers/newWindowReducer';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

export interface openNewTabProps {

    /**
     * Id of the item, use to prevent doublon tab
     */
    id: string

    /**
     * Type of tab to display
     */
    type : string

    /**
     * Title
     */
    title: string

    /**
     * SubTitle
     */
    subTitle?: string

    /**
     * hRef of entity to display or execute
     */
    hRef?: string

    /**
     * activityProps
     */
    activityProps?:any
}

const useTabs = () => {
    let dispatch = useDispatch();
    const {t} = useTranslation()
    const history = useHistory();

    const openNewTab = ({id, type, hRef, subTitle, title, activityProps }:openNewTabProps) => {
        dispatch(addSecondaryTabByID({
            tabId: id,
            tabType: type,
            displayTabLabel: t(`common:${type}`, {value:id, activity:activityProps.activityCode}),
            displayTabSmallLabel: subTitle,
            href: hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    const openNewTabInSecondaryWindow = ({id, type, hRef, subTitle, title, activityProps }:openNewTabProps) => {
        dispatch(addWindowTabByID({
            tabId: id,
            tabType: type,
            displayTabLabel:t(`common:${type}`, {value:id, activity:activityProps.activityCode}),
            displayTabSmallLabel: subTitle,
            href: hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    return {openNewTab, openNewTabInSecondaryWindow}
}

export default useTabs
