import {DoubleArrowRightIcon, DoubleArrowLeftIcon} from 'assets/svg';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';

export interface SideBarProps {

    /**
     * Expand or collapse
     */
    open?: boolean

    /**
     * toolbar
     */
    toolbar?: any

    /**
     * content
     */
    content?: any

    /**
     * className to add
     */
    className?: any
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        flexDirection: 'row',
        flex: '1 0 auto',
        height: '400px',
        width: 'fit-content',
    },
    toolbar: {
        height: '100%',
        display: 'flex',
        flexDirection:'column',
        flex: '0 0 auto',
        justifyContent: 'left',
        width: '44px',
        overflow: 'hidden',
        borderColor: theme.palette.project.sidebar.toolbar.border,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '44px',
        height: '44px',
        marginTop: theme.spacing(3),
        color: theme.palette.project.sidebar.toolbar.color,
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper
    },
    content: {
        height: '100%',
        display: 'flex',
        flex: '1 1 auto',
        width: 'fit-content',
        overflow: 'hidden'
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
}));

const SideBar: React.FC<SideBarProps> = ({toolbar, content, open, className = ''}: SideBarProps) => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(open)

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.toolbar}>
                <div className={classes.toggle} onClick={() => setToggle((value) => !value)}>
                    {toggle?<DoubleArrowRightIcon/>:<DoubleArrowLeftIcon/>}
                </div>
                {toolbar}
            </div>
            <div
                className={clsx(classes.content, {
                    [classes.contentOpen]: toggle,
                    [classes.contentClose]: !toggle,
                })}
            >
                {content}
            </div>
        </div>
    )
}

export default SideBar;
