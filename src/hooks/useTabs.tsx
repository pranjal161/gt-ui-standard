import {ActivityProps} from 'components/Activity/Activity';
import {useCallback} from 'react';
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
    activityProps: ActivityProps
}

const useTabs = () => {
    let dispatch = useDispatch();
    const {t} = useTranslation()
    const history = useHistory();

    const openNewTab = ({subTitle, activityProps}: openNewTabProps) => {
        dispatch(addSecondaryTabByID({
            tabId: activityProps.hRef,
            tabType: activityProps.entityType,
            displayTabLabel: t(`common:${activityProps.activityCode}Tab`, {
                value: activityProps.title,
                activity: activityProps.activityCode
            }),
            displayTabSmallLabel: subTitle,
            href: activityProps.hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    const openNewTabInSecondaryWindow = ({subTitle, activityProps}: openNewTabProps) => {
        dispatch(addWindowTabByID({
            tabId: activityProps.hRef,
            tabType: activityProps.entityType,
            displayTabLabel: t(`common:${activityProps.activityCode}Tab`, {
                value: activityProps.title,
                activity: activityProps.activityCode
            }),
            displayTabSmallLabel: subTitle,
            href: activityProps.hRef,
            activityProps: activityProps
        }));
        history.push('/viewTab');
    }

    const forOperation = useCallback(({entityType, mainEntityHRef, operation}: any) => ({
        id: operation.href,
        subTitle: t('common:businessActivityLabel'),
        activityProps: {
            title: operation.title,
            entityType,
            activityCode: operation.name,
            hRef: operation.href,
            mainEntityHRef,
        }
    }),[])

    /**
     * Map contract API response based on data part
     */
    const forContract = useCallback(({title, hRef }:any) => ({
        id:hRef,
        subTitle: t('common:contractViewLabel'),
        activityProps: {
            title,
            entityType: 'contract',
            activityCode: 'contract_view',
            hRef,
            mainEntityHRef: hRef
        }
    }), [])

    return {openNewTab, openNewTabInSecondaryWindow, forOperation, forContract}
}

export default useTabs
