/* eslint-disable */
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
        overflow: 'auto',
        width: '100%',
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

const ContentController = () => {
    const classes = useStyles();

    const FirstSectionContent = () => <div className={classes.firstSectionContent}>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
            loading={mockLoading}
        />)}</div>

    return (<div className={classes.content}>
        <PanelSection title={'Detail'} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 2'} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 3'} content={<FirstSectionContent/>}/>
    </div>)
}

const controller = (value: any) => <ContentController/>

const items = {
    contract:
        [
            {title: 'Contract A', display:'Contract A', id: 'contractA', controller},
            {title: 'Contract B', display: 'Contract B', id: 'contractB', controller},
            {title: 'Contract C', display: 'Contract B', id: 'contractC', controller}],
    person: [
        {title: 'Person 1', display: 'Person 1', id: 'person1', controller},
        {title: 'Person 2', display: 'Person 2', id: 'person2', controller},
    ],
    ticket:
        [
            {title: 'Ticket 1', display: 'Ticket 1', id: 'ticket1', controller}]
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
