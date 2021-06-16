import {makeStyles} from '@material-ui/core/styles';
import {resource} from 'assets/staticData/data';
import LabelInline from 'components/LabelInline/LabelInline';
import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import useResponse from 'hooks/useResponse';
import {useSidebar} from 'hooks/useSidebar';
import React from 'react';
import GlobalSideBar from 'components/SideBar/SideBar';

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
            width: '330px',
        },
        //overflow: 'auto'
    },
    firstSectionContent: {
        paddingTop: theme.spacing(0),
        ' & > * ': {
            marginBottom: theme.spacing(1)
        }
    },
    section:{

    }

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

const ContentController = (props: { value: string }) => {
    const classes = useStyles();

    const FirstSectionContent = () => <div className={classes.firstSectionContent}>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
        />)}</div>

    return (<div className={classes.controllerContent}>
        <PanelSection className={classes.section} title={props.value} content={<FirstSectionContent/>}/>
        <PanelSection className={classes.section} title={'Details 2'} content={<FirstSectionContent/>}/>
        <PanelSection className={classes.section} title={'Details 3'} content={<FirstSectionContent/>}/>
    </div>)
}

const personController = (value: any) => <ContentController value={value}/>
const contractController = (value: any) => <ContentController value={value}/>

const SideBar = ({mainEntityHRef}: any) => {
    const classes = useStyles();
    const mainEntityResponse = useResponse(mainEntityHRef)
    let items:any = {}

    const mainEntitySummary =mainEntityResponse && mainEntityResponse.data._links.self
    if (mainEntitySummary)
        items.contract = [{display:mainEntitySummary.title.split(':')[0], id:mainEntitySummary.href, controller:contractController}]

    //Get role parties linked to the contract
    //Todo : do we have to put such API parsing in functions ?
    const rolePartiesHRef = mainEntityResponse && mainEntityResponse.data._links['contract:role_list'].href + '?_inquiry=e_contract_parties_view'
    const rolePartiesResponse = useResponse(rolePartiesHRef)

    let personList = [{display:'Loading', id:'not_defined', controller:personController}]
    if (rolePartiesResponse && rolePartiesResponse.data._count > 0){
        personList = rolePartiesResponse.data._links.item.map((item:any, index:number) => ({display:item.title, id:item.href, controller:personController}))
    }

    items.person = personList

    const sidebarProps = useSidebar(items, true)

    return (
        <div className={classes.root}>
            <GlobalSideBar {...sidebarProps} />
        </div>
    )
}

export default SideBar;
