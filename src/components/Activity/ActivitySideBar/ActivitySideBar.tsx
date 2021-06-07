import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import React, {useState} from 'react';
import LabelInline from 'components/LabelInline/LabelInline';
import SavingToolbar from 'components/SavingToolbar/SavingToolbar';
import SideBar from 'components/SideBar/SideBar';
import Typo from 'components/Typography/Typo';
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
        flexDirection:'column',
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
const items = {
    contract:
        [{display: 'contract A', id: 'contractA'}, {
            display: 'contract B', id: 'contractB'
        }, {display: 'contract C', id: 'contractC'}],
    person: [{display: 'Person 1', id: 'person1'},
        {display: 'Person 2', id: 'person2'}],
}

const sectionItems: PanelSectionItem[] = [
    {id: 'contract:number', styleType: ['text']},
    {id: 'contract:product_identifier', styleType: ['text']},
    {id: 'contract:product_type', styleType: ['text']},
    {id: 'contract:status', styleType: ['text']},
    {id: 'contract:start_date', styleType: ['date']},
    {id: 'loan_account:total_amount_due', styleType: ['percent']}
]

const ActivitySideBar: React.FC<ActivitySideBarProps> = ({open}: ActivitySideBarProps) => {
    const classes = useStyles();

    const [nav, setNav] = useState(Object.keys(items)[0])

    const handleNavChange = (value: string) => setNav(value)
    const Toolbar = () => <SavingToolbar value={nav} onChange={handleNavChange}/>

    const FirstSectionContent = () => <>{sectionItems.map(
        (item) => <LabelInline key={item.id}
            property={item.id}
            data={resource}
            styleType={item.styleType}
            className={classes.firstSectionContent}/>)}</>

    const Content = () => <div className={classes.content}>
        <PanelSection title={'Details'} content={<FirstSectionContent/>}/>
        <PanelSection title={'Details'} content={<FirstSectionContent/>}/>
    </div>
    const Header = () => <Typo variant={'title'} value={'Contract view'}/>

    return (
        <div className={classes.root}>
            <SideBar open={open} header={<Header/>} toolbar={<Toolbar/>} content={<Content/>}/>
        </div>
    )
}

export default ActivitySideBar;
