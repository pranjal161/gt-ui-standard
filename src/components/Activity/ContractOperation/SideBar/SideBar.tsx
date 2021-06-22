import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import GlobalSideBar from 'components/SideBar/SideBar';
import LabelInline from 'components/LabelInline/LabelInline';
import useTabs from 'hooks/useTabs';
import React from 'react';
import useResponse from 'hooks/useResponse';
import {useSidebar} from 'hooks/useSidebar';
import {useTranslation} from 'react-i18next';

const ContentList = ({items, data}: any) => items.map(
    (item: any) => <LabelInline key={item.id}
        property={item.id}
        data={data}
        loading={!data}
        styleType={item.styleType}
    />)

/*************** For contract *******************/

const ContractPreview = React.memo(({hRef}: any) => {
    const response = useResponse(hRef)
    console.log('hRef : ', hRef, ' response :', response)

    return <ContractGeneralSection key={'general'} hRef={hRef}/>
})
ContractPreview.displayName='ContractPreview'

const contractGeneralItems: PanelSectionItem[] = [
    {id: 'contract:number', styleType: ['text']},
    {id: 'contract:product_identifier', styleType: ['text']},
    {id: 'contract:product_type', styleType: ['text']},
    {id: 'contract:status', styleType: ['text']},
    {id: 'contract:start_date', styleType: ['date']},
    {id: 'contract:amount', styleType: ['currency']},
    {id: 'loan_account:total_amount_due', styleType: ['percent']}
]
const ContractGeneralSection = React.memo(({hRef}: any) => {
    const response = useResponse(hRef)

    return <PanelSection title={'Detail'}
        content={<ContentList items={contractGeneralItems} data={response && response.data}/>}/>
})
ContractGeneralSection.displayName='ContractGeneralSection'

/*************** For Person *******************/

const PersonPreview = ({hRef}: any) => {
    const response = useResponse(hRef)
    const hRefBankAccount = response && response.data._links['person:preferred_bank_account'].href

    return (
        <>
            <PersonGeneralSection key={'general'} hRef={hRef}/>,
            <PreferredBankAccount key={'preferred_bank'} hRef={hRefBankAccount}/>
        </>)
}

const personGeneralItems: PanelSectionItem[] = [
    {id: 'person:gender', styleType: ['text']},
    {id: 'person:first_name', styleType: ['text']},
    {id: 'person:last_name', styleType: ['text']},
    {id: 'person:birth_date', styleType: ['date']},
    {id: 'person:age', styleType: ['number']},
    {id: 'person:professional_status', styleType: ['text']},
    {id: 'person:language', styleType: ['text']},
]
const PersonGeneralSection = ({hRef}: any) => {
    const response = useResponse(hRef)

    return <PanelSection title={'Detail'}
        content={<ContentList items={personGeneralItems} data={response && response.data}/>}/>
}

/*************** For Preferred bank accoubt *******************/

const preferredBankAccount: PanelSectionItem[] = [
    {id: 'bank_account:account_details', styleType: ['text']},
    {id: 'bank_account:account_holder_name', styleType: ['text']},
    {id: 'bank_account:i_b_a_n', styleType: ['text']},
]
const PreferredBankAccount = ({hRef}: any) => {
    const response = useResponse(hRef)

    return <PanelSection title={'Preferred bank account'}
        content={<ContentList items={preferredBankAccount} data={response && response.data}/>}/>
}

const RoleController = React.memo(({hRef}: any) => {
    const response = useResponse(hRef)
    const personHRef = response && response.data._links['party_role:person'].href

    return (<PersonPreview hRef={personHRef}/>)
})

const roleController = (value: any) => <RoleController hRef={value.id}/>
const contractController =(value: any) => <ContractPreview hRef={value.id}/>

const SideBar = ({mainEntityHRef}: any) => {
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract} = useTabs()
    const mainEntityResponse = useResponse(mainEntityHRef)
    let items: any = {}

    console.log('SideBar render', mainEntityResponse)

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
        items.contract = [{title: 'Loading', id: 'not_defined', controller: contractController}]

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const rolePartiesResponse = useResponse(rolePartiesHRef)

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

    const sidebarProps = useSidebar(items, true)

    const onOpenInNewTab = (item: any) => {
        console.log('item', item)
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

export default SideBar;
