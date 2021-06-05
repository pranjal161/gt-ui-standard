import {makeStyles} from '@material-ui/core/styles';
import SavingToolbar from 'components/SavingToolbar/SavingToolbar';
import SideBar from 'components/SideBar/SideBar';
import Typo from 'components/Typography/Typo';
import React, {useState} from 'react';

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
        height: '400px',
        width:'fit-content',
    },
    navBar: {
        height: '100%',
        display: 'flex',
        flex: '0 0 auto',
        width:'44px',
        overflow: 'hidden',
        borderColor: theme.palette.primary.main,
        borderStyle:'solid'
    },
    content: {
        height: '100%',
        display: 'flex',
        flex: '1 1 auto',
        width:'300px',
        overflow: 'hidden'
    },
    contentOpen: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentClose: {
        display:'none',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));
const items = {
    contract:
        [{display: 'contract A', id: 'contractA'}, {
            display: 'contract B', id: 'contractB'
        }, {display: 'contract C', id: 'contractC'}],
    person: [{display: 'Person 1', id: 'person1'},
        {display: 'Person 2', id: 'person2'}],
}

const ActivitySideBar: React.FC<ActivitySideBarProps> = ({open}: ActivitySideBarProps) => {
    const classes = useStyles();

    const [nav, setNav] = useState(Object.keys(items)[0])

    const handleNavChange = (value:string) => setNav(value)

    const Toolbar = () => <SavingToolbar value={nav} onChange={handleNavChange}/>
    const Content = () => <div className={classes.content}>{nav}</div>
    const Header = () => <Typo variant={'title'} value={'Contract view'} />

    return (
        <div className={classes.root}>
            <SideBar open={open} header={<Header />} toolbar={<Toolbar/>} content={<Content/>}/>
        </div>
    )
}

export default ActivitySideBar;
