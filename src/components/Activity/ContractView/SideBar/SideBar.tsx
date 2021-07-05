import GlobalSideBar from 'components/SideBar/SideBar';
import OrganizationPreview from 'components/ClientPreview/OrganizationPreview';
import PersonPreview from 'components/ClientPreview/PersonPreview';
import React from 'react';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';
import { useSidebar } from 'hooks/useSidebar';
import useTabs from 'hooks/useTabs';
import { useTranslation } from 'react-i18next';

const RoleController = React.memo(({ hRef }: any) => {
    const [response] = useResponse(hRef)
    const personHRef = response && getLink(response.data, 'party_role:person');
    const orgHref = response && getLink(response.data, 'party_role:organization');

    return (
        <>
            {personHRef && <PersonPreview hRef={personHRef} />}
            {orgHref && <OrganizationPreview hRef={orgHref} />}</>
    )
})
RoleController.displayName = 'RoleController'

const roleController = (value: any) => <RoleController hRef={value.id} />
const loadingController = () => <div>Loading</div>

const SideBar = (props: any) => {
    const { mainEntityHRef } = props
    const { t } = useTranslation()
    const { openNewTab, openNewTabInSecondaryWindow, forContract } = useTabs()
    const [mainEntityResponse] = useResponse(mainEntityHRef)

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const [rolePartiesResponse] = useResponse(rolePartiesHRef)

    let items: any = {}

    //This is a workaround for the initial state and to have contract define by default
    let personList = [{ title: 'Loading', id: 'not_defined', controller: loadingController }]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0) {
        personList = rolePartiesResponse.data._links.item
            .filter((item: any) => (item.summary['party_role:party_type'] === 'person'
                || item.summary['party_role:party_type'] === 'organization')
                && item.summary['party_role:role_type'] === 'owner')
            .map((item: any) => {

                const title = item.summary['person:display_id'] ?
                    item.summary['person:display_id'].split(' - ')[0] :
                    item.summary['organization:display_id'].split(' - ')[0]

                return {
                    title,
                    display: t('common:clientTitle', { value: title }),
                    id: item.href,
                    hRef: item.href,
                    entityType: 'person',
                    controller: roleController
                }
            })
    }

    items.person = personList

    const sidebarProps = useSidebar(items, true)

    const onOpenInNewTab = (item: any) => {
        if (item.entityType === 'contract')
            openNewTab(forContract(item))
    }

    const onOpenInNewWindow = (item: any) => {
        if (item.entityType === 'contract')
            openNewTabInSecondaryWindow(forContract(item))
    }

    return (
        <>
            <GlobalSideBar {...sidebarProps} {...{ onOpenInNewTab, onOpenInNewWindow }} />
        </>
    )
}

export default React.memo(SideBar);
