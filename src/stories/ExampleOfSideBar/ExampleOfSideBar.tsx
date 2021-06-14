import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react';
import SideBar from 'components/SideBar/SideBar';
import {makeStyles} from '@material-ui/core/styles';
import {resource} from 'assets/staticData/data';
import {useSidebar} from 'hooks/useSidebar';

let mockLoading = false

export interface ExampleOfSideBarProps {

    /**
     * To test loading skeleton
     */
    loading?:boolean
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
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        [theme.breakpoints.up('sm')]: {
            width: '330px',
        },
        overflow: 'auto'
    },
    firstSectionContent: {
        paddingTop: theme.spacing(0),
        ' & > * ': {
            marginBottom: theme.spacing(1)
        }
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
    console.log('render ContentController')

    const FirstSectionContent = () => <div className={classes.firstSectionContent}>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
            loading={mockLoading}
        />)}</div>

    return (<div className={classes.content}>
        <PanelSection title={props.value} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 2'} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 3'} content={<FirstSectionContent/>}/>
    </div>)
}

const controller = (value: any) => <ContentController value={value}/>

const items = {
    contract:
        [
            {display: 'Contract A', id: 'contractA', controller},
            {display: 'Contract B', id: 'contractB', controller},
            {display: 'Contract C', id: 'contractC', controller}],
    person: [
        {display: 'Person 1', id: 'person1', controller},
        {display: 'Person 2', id: 'person2', controller},
    ],
    ticket:
        [
            {display: 'Ticket 1', id: 'ticket1', controller}]
}

const ExampleOfSideBar:React.FC<ExampleOfSideBarProps> = ({loading=false}:ExampleOfSideBarProps) => {
    const classes = useStyles();
    const sidebarProps = useSidebar(items, true)
    mockLoading = loading

    return (
        <div className={classes.root}>
            <SideBar {...sidebarProps} />
        </div>
    )
}

export default ExampleOfSideBar;
