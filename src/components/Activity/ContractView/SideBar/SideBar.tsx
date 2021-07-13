import useAia from 'hooks/useAia';
import {getCollectionItems, getLink} from 'utils/functions';

import GlobalSideBar from 'components/SideBar/SideBar';
import OrganizationPreview from 'components/ClientPreview/OrganizationPreview';
import PersonPreview from 'components/ClientPreview/PersonPreview';
import React from 'react';
import useResponse from 'hooks/useResponse';
import {useSidebar} from 'hooks/useSidebar';
import useTabs from 'hooks/useTabs';
import {useTranslation} from 'react-i18next';

const RoleController = React.memo(({hRef}: any) => {
    const [response] = useResponse(hRef)
    const personHRef = response && getLink(response.data, 'party_role:person');
    const orgHref = response && getLink(response.data, 'party_role:organization');

    return (
        <>
            {personHRef && <PersonPreview hRef={personHRef}/>}
            {orgHref && <OrganizationPreview hRef={orgHref}/>}</>
    )
})
RoleController.displayName = 'RoleController'

const roleController = (value: any) => <RoleController hRef={value.id}/>
const loadingController = () => <div>Loading</div>

const SideBar = (props: any) => {
    const {mainEntityHRef} = props
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract, forPerson} = useTabs()
    const {fetch} = useAia()
    const [mainEntityResponse] = useResponse(mainEntityHRef)

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const [rolePartiesResponse] = useResponse(rolePartiesHRef)

    let items: any = {}

    //This is a workaround for the initial state and to have contract define by default
    let personList: Array<any> = [{title: 'Loading', id: 'not_defined', controller: loadingController}]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0) {
        personList = getCollectionItems(rolePartiesResponse.data)
            .filter((item: any) => (item.summary['party_role:party_type'] === 'person'
                || item.summary['party_role:party_type'] === 'organization')
                && item.summary['party_role:role_type'] === 'owner')
            .map((item: any) => {

                const title = item.summary['person:display_id'] ?
                    item.summary['person:display_id'].split(' - ')[0] :
                    item.summary['organization:display_id'].split(' - ')[0]

                return {
                    title,
                    display: t('common:clientTitle', {value: title}),
                    id: item.href,
                    hRef: item.href,
                    entityType: 'person',
                    controller: roleController
                }
            })
    }

    items.person = personList

    const sidebarProps = useSidebar(items, props, true)

    const onOpenInNewTab = (item: any) => {
        if (item.entityType === 'contract')
            openNewTab(forContract(item))
        else if (item.entityType === 'person') {
            //here we will get an hRef of a roleParty.
            //We have to get the person HREf
            fetch(item.hRef).then((responseRole: any) => {
                const personHRef = getLink(responseRole.data, 'party_role:person');
                openNewTab(forPerson({...item, hRef : personHRef}))
            })
        }
    }

    const onOpenInNewWindow = (item: any) => {
        if (item.entityType === 'contract')
            openNewTabInSecondaryWindow(forContract(item))
        else if (item.entityType === 'person') {
            //here we will get an hRef of a roleParty.
            //We have to get the person HREf
            fetch(item.hRef).then((responseRole: any) => {
                const personHRef = getLink(responseRole.data, 'party_role:person');
                openNewTabInSecondaryWindow(forPerson({...item, hRef : personHRef}))
            })
        }

    }

    return (
        <>
            <GlobalSideBar {...sidebarProps} {...{onOpenInNewTab, onOpenInNewWindow}} />
        </>
    )
}

export default React.memo(SideBar);
