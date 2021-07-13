import ContractSideBar from 'components/Activity/ContractOperation/SideBar/ContractSideBar/ContractSideBar';
import GlobalSideBar from 'components/SideBar/SideBar';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useSidebar } from 'hooks/useSidebar';
import useTabs from 'hooks/useTabs';
import { useTranslation } from 'react-i18next';

const contractController = (value: any) => <ContractSideBar hRef={value.id}/>
const loadingController = () => <div>Loading</div>

const SideBar = (props: any) => {
    const {mainEntityHRef} = props
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract} = useTabs()
    const [mainEntityResponse] = useResponse(mainEntityHRef)

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
