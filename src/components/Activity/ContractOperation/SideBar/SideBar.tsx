import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import GlobalSideBar from 'components/SideBar/SideBar';
import LabelInline from 'components/LabelInline/LabelInline';
import useTabs from 'hooks/useTabs';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {resource} from 'assets/staticData/data';
import useResponse from 'hooks/useResponse';
import {useSidebar} from 'hooks/useSidebar';
import {useTranslation} from 'react-i18next';

export interface ExampleOfSideBarProps {

    /**
     * To test loading skeleton
     */
    loading?: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 auto',
        alignItems: 'stretch',
        width: 'fit-content',
        height: '100%'
    },
    controllerContent: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        width: 'fit-content',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.down('md')]: {
            width: 'fit-content',
        },
        //overflow: 'auto'
    },
    firstSectionContent: {
        paddingTop: theme.spacing(0),
        ' & > * ': {
            marginBottom: theme.spacing(1)
        }
    },
    section: {}

}));

const sectionItems: PanelSectionItem[] = [
    {id: 'contract:number', styleType: ['text']},
    {id: 'contract:product_identifier', styleType: ['text']},
    {id: 'contract:product_type', styleType: ['text']},
    {id: 'contract:status', styleType: ['text']},
    {id: 'contract:start_date', styleType: ['date']},
    {id: 'contract:amount', styleType: ['currency']},
    {id: 'loan_account:total_amount_due', styleType: ['percent']}
]

const ContentController = ({value}: any) => {
    const classes = useStyles();

    const FirstSectionContent = () => <div className={classes.firstSectionContent}>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
        />)}</div>

    return (<div className={classes.controllerContent}>
        <PanelSection className={classes.section} title={'Details 1'} content={<FirstSectionContent/>}/>
        <PanelSection className={classes.section} title={'Details 2'} content={<FirstSectionContent/>}/>
        <PanelSection className={classes.section} title={'Details 3'} content={<FirstSectionContent/>}/>
    </div>)
}

const personItems: PanelSectionItem[] = [
    {id: 'person:gender', styleType: ['text']},
    {id: 'person:first_name', styleType: ['text']},
    {id: 'person:last_name', styleType: ['text']},
    {id: 'person:birth_date', styleType: ['date']},
    {id: 'person:age', styleType: ['number']},
    {id: 'person:professional_status', styleType: ['text']},
    {id: 'person:language', styleType: ['text']},
]

const PersonController = ( { hRef }:any) => {
    const classes = useStyles();
    const response = useResponse(hRef)
    const FirstSectionContent = () => <div className={classes.firstSectionContent}>{personItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={response && response.data}
            styleType={item.styleType}
        />)}</div>

    console.log('PersonController Render, hRef : ', hRef, 'response :', response)

    return (<div className={classes.controllerContent}>
        <PanelSection className={classes.section} title={'Details 1'} content={<FirstSectionContent/>}/>
    </div>)
}

const RoleController = ({hRef}:any) => {
    const response = useResponse(hRef)
    const personHRef= response && response.data._links['party_role:person'].href

    console.log('RoleController Render, hRef : ', hRef, 'response :', response)

    return (<PersonController hRef={personHRef}/>)
}

const personController = (value: any) => <ContentController value={value}/>
const roleController = (value: any) => <RoleController hRef={value.id}/>
const contractController = ({props}: any) => <ContentController {...props}/>

const SideBar = ({mainEntityHRef}: any) => {
    const {t} = useTranslation()
    const {openNewTab, openNewTabInSecondaryWindow, forContract} = useTabs()
    const mainEntityResponse = useResponse(mainEntityHRef)
    let items: any = {}

    const mainEntitySummary = mainEntityResponse && mainEntityResponse.data._links.self
    if (mainEntitySummary) {

        const title = mainEntityResponse.data['contract:number']
        items.contract = [{
            title,
            display:t('common:contractNumberTitle', {value: title}),
            id: mainEntitySummary.href,
            hRef:mainEntitySummary.href,
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

    let personList = [{title: 'Loading', id: 'not_defined', controller: personController}]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0) {
        personList = rolePartiesResponse.data._links.item
            .filter((item: any) => item.summary['party_role:party_type'] === 'person' && item.summary['party_role:role_type'] === 'owner')
            .map((item: any) => {

                const title = item.summary['person:display_id'].split(' - ')[0]

                return {
                    title,
                    display: t('common:clientTitle', {value: title}),
                    id: item.href,
                    hRef:item.href,
                    entityType: 'person',
                    controller: roleController
                }
            })
    }

    items.person = personList

    const sidebarProps = useSidebar(items, true)

    const onOpenInNewTab = (item:any) => {
        console.log('item', item)
        if (item.entityType === 'contract')
            openNewTab(forContract(item))
    }

    const onOpenInNewWindow = (item:any) => {
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
