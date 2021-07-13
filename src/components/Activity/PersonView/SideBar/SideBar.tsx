import ContractSideBar from 'components/Activity/ContractOperation/SideBar/ContractSideBar/ContractSideBar';
import GlobalSideBar from 'components/SideBar/SideBar';
import {APIConfig} from 'configs/apiConfig';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useSidebar } from 'hooks/useSidebar';
import useTabs from 'hooks/useTabs';
import { useTranslation } from 'react-i18next';
import {getCollectionItems} from 'utils/functions';

const contractController = (value: any) => <ContractSideBar hRef={value.id}/>
const loadingController = () => <div>Loading</div>

const SideBar = (props: any) => {
    const {hRef} = props
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract} = useTabs()

    const contractsHRef = APIConfig().defaultHostUrl + 'contracts?_mode=individual_contract&_inquiry=cs_contract_owner_contract_list&party_role:person=' + hRef

    const [contractsResponse] = useResponse(contractsHRef)

    let items: any = {}

    const contracts = contractsResponse && getCollectionItems(contractsResponse.data)

    if (contracts) {
        items.contract = contracts.map((contract:any) => {
            const title = contract.summary['contract:number']
            
            return {
                title,
                display: t('common:contractNumberTitle', {value: title}),
                id: contract.href,
                hRef: contract.href,
                entityType: 'contract',
                controller: contractController,} 
        })
    }
    else
        //This is a workaround for the initial state and to have contract define by default
        items.contract = [{title: 'Loading', id: 'not_defined', controller: loadingController}]

    const sidebarProps = useSidebar(items, props, true)

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
            <GlobalSideBar {...sidebarProps} {...{onOpenInNewTab, onOpenInNewWindow}} position={'left'}/>
        </>
    )
}

export default React.memo(SideBar);
