import {ActivityDetailProps} from 'components/Activity/Activity';
import {addSecondaryTabByID} from 'store/reducers/secondaryTabsReducer';
import {addWindowTabByID} from 'store/reducers/newWindowReducer';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export interface TabProps {

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
    activityProps: ActivityDetailProps
}

export interface forOperationProps {

    /**
     * Type of entity to search, can be all
     */
   entityType: 'contract' | 'person' | 'ticket' | any

    /**
     * hRef of the main entity, ex; contract hRef for an Unsolicited payment activity
     */
    mainEntityHRef : string

    /**
     * operation : operation part of API data response
     */
    operation : any
}

export interface forContractProps {

    /**
     * Title to use when display the contrat (TabButton and Sidebar)
     */
    title: string

    /**
     * hRef of the contract
     */
    hRef : string
}

export interface forSearchProps {

    /**
     * Type of entity to search, can be all
     */
    entityType: 'all' | 'contract' | 'person' | 'ticket' | any

    /**
     * Searching text
     */
    searchString : string

    /**
     * Filter to apply (to be define)
     */
    filters : any
}

const useTabs = () => {
    let dispatch = useDispatch();
    const {t} = useTranslation()
    const history = useHistory();

    const openNewTab = useCallback(({id, subTitle, activityProps}: TabProps) => {
        dispatch(addSecondaryTabByID({
            tabId: id,
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
    }, [t, history, dispatch])

    const openNewTabInSecondaryWindow = useCallback(({id, subTitle, activityProps}: TabProps) => {
        dispatch(addWindowTabByID({
            tabId: id,
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
    }, [t, history, dispatch])

    const forOperation = useCallback(({entityType, mainEntityHRef, operation}: forOperationProps) => ({
        id: operation.href,
        subTitle: t('common:businessActivityLabel'),
        activityProps: {
            title: operation.title,
            entityType,
            activityCode: operation.name,
            mode: 'upsert',
            hRef: operation.href,
            mainEntityHRef,
        }
    }), [t])

    /**
     * Map contract API response based on data part
     */
    const forContract = useCallback(({title, hRef}: forContractProps) => ({
        id: hRef,
        subTitle: t('common:contractViewLabel'),
        activityProps: {
            title,
            entityType: 'contract',
            activityCode: 'contract_view',
            mode:'view',
            hRef,
            mainEntityHRef: hRef
        }
    }), [t])

    const forSearch = useCallback(({entityType, searchString, filters}:forSearchProps) => ({
        id: `search_${entityType}_${searchString}`,
        subTitle: t('common:searchViewLabel', {context:entityType}),
        activityProps: {
            activityCode: 'search',
            entityType: 'search',
            hRef: `search_${entityType}_${searchString}`, // todo : to be changed, not very good . this value is checking in the Activiti useEffect to not fetch on it
            mainEntityHRef: 'search',
            mode:'search',
            title: searchString,
            extraValues: {entityType, searchString, filters}
        }

    }), [t])

    return {openNewTab, openNewTabInSecondaryWindow, forOperation, forContract, forSearch}
}

export default useTabs
