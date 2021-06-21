import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';

import GlobalSideBar from 'components/SideBar/SideBar';
import LabelInline from 'components/LabelInline/LabelInline';
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

const ContentController = ( { value }:any) => {
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
    const mainEntityResponse = useResponse(mainEntityHRef)
    let items: any = {}

    const mainEntitySummary = mainEntityResponse && mainEntityResponse.data._links.self
    if (mainEntitySummary) {

        items.contract = [{
            display: t('common:contractNumberTitle', {value: mainEntityResponse.data['contract:number']}),
            id: mainEntitySummary.href,
            controller: contractController
        }]
    }

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const rolePartiesResponse = useResponse(rolePartiesHRef)

    let personList = [{display: 'Loading', id: 'not_defined', controller: personController}]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0) {
        personList = rolePartiesResponse.data._links.item
            .filter((item: any) => item.summary['party_role:party_type'] === 'person' && item.summary['party_role:role_type'] === 'owner')
            .map((item: any) => {
                const display = t('common:clientTitle', {value : item.summary['person:display_id'].split(' - ')[0]})

                return {display, id: item.href, controller: roleController}
            })
    }

    items.person = personList

    const sidebarProps = useSidebar(items, true)

    return (
        <>
            <GlobalSideBar {...sidebarProps} />
        </>
    )
}

export default SideBar;
