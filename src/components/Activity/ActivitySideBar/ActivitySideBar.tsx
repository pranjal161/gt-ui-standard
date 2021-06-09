import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import {useSidebar} from 'hooks/useSidebar';
import React from 'react';
import LabelInline from 'components/LabelInline/LabelInline';
import SideBar from 'components/SideBar/SideBar';
import {makeStyles} from '@material-ui/core/styles';
import {resource} from 'assets/staticData/data';

export interface ActivitySideBarProps {

    /**
     * Expand or collapse
     */
    open?: boolean

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
    navBar: {
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
        width: '44px',
        overflow: 'hidden',
        borderColor: theme.palette.primary.main,
        borderStyle: 'solid'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: '0 0 auto',
        width: '330px',
        overflow: 'auto'
    },
    contentOpen: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentClose: {
        display: 'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    firstSectionContent: {
        paddingTop: theme.spacing(2),
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
    {id: 'loan_account:total_amount_due', styleType: ['percent']}
]

const ContentController = (props: { value: string }) => {
    const classes = useStyles();
    const FirstSectionContent = () => <>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
            className={classes.firstSectionContent}/>)}</>

    const content = <div className={classes.content}>
        <PanelSection title={props.value} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 2'} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details 3'} content={<FirstSectionContent/>}/>
    </div>

    return content
}

const controller = (value: any) => (<ContentController value={value}/>)

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

const ActivitySideBar: React.FC<ActivitySideBarProps> = ({open}: ActivitySideBarProps) => {
    const classes = useStyles();
    const sidebarProps = useSidebar(items)

    return (
        <div className={classes.root}>
            <SideBar {...sidebarProps} />
        </div>
    )
}

export default ActivitySideBar;
