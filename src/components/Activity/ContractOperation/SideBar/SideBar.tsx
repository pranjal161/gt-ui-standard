import ContractSideBar from './ContractSideBar/ContractSideBar';
import GlobalSideBar from 'components/SideBar/SideBar';
import PersonPreview from 'components/ClientPreview/PersonPreview';
import React from 'react';
import StatusReportPreview from 'components/StatusReportPreview/StatusReportPreview';
import useResponse from 'hooks/useResponse';
import {useSidebar} from 'hooks/useSidebar';
import useTabs from 'hooks/useTabs';
import {useTranslation} from 'react-i18next';

const RoleController = React.memo(({hRef}: any) => {
    const [response] = useResponse(hRef)
    const personHRef = response && response.data._links['party_role:person'].href

    return (<PersonPreview hRef={personHRef}/>)
})
RoleController.displayName='RoleController'

const roleController = (value: any) => <RoleController hRef={value.id}/>
const contractController = (value: any) => <ContractSideBar hRef={value.id}/>
const statusReportController = (value: any) => <StatusReportPreview hRef={value.id}/>
const loadingController = () => <div>Loading</div>

const SideBar = (props: any) => {
    const {mainEntityHRef, hRef} = props
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract} = useTabs()
    const [mainEntityResponse] = useResponse(mainEntityHRef)

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const [rolePartiesResponse] = useResponse(rolePartiesHRef)

    let items: any = {}

    const mainEntitySummary = mainEntityResponse && mainEntityResponse.data._links.self
    if (mainEntitySummary) {

        const title = mainEntityResponse.data['contract:number']
        items.contract = [{
            title,
            display: t('common:contractNumberTitle', {value: title}),
            id: mainEntitySummary.href,
            hRef: mainEntitySummary.href,
            entityType: 'contract',
            controller: contractController,
        }]
    }
    else
        //This is a workaround for the initial state and to have contract define by default
        items.contract = [{title: 'Loading', id: 'not_defined', controller: loadingController}]

    let personList = [{title: 'Loading', id: 'not_defined', controller: roleController}]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0) {
        personList = rolePartiesResponse.data._links.item
            .filter((item: any) => item.summary['party_role:party_type'] === 'person' && item.summary['party_role:role_type'] === 'owner')
            .map((item: any) => {

                const title = item.summary['person:display_id'].split(' - ')[0]

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

    items.statusReport = [{
        title: 'Status report',
        display: 'Status report',
        id: hRef,
        hRef: hRef,
        entityType: 'statusReport',
        controller: statusReportController
    }]

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
            <GlobalSideBar {...sidebarProps} {...{onOpenInNewTab, onOpenInNewWindow}} />
        </>
    )
}

export default React.memo(SideBar);
