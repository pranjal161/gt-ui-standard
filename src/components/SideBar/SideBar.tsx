import {DoubleArrowLeftIcon, DoubleArrowRightIcon, OpenInNewTabIcon, OpenInNewWindowIcon} from 'assets/svg';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import IconButton from 'theme/components/material/IconButton/IconButton';

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
     * header
     */
    header?: any

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
        alignItems: 'start',
        flexDirection: 'row',
        flex: '1 0 auto',
        height: '400px',
        width: 'fit-content',
    },
    toolbar: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
    headerAndContent: {
        display: 'flex',
        margin : theme.spacing(3,4,0,4),
        flexDirection: 'column',
        alignItems: 'start'
    },
    divider:{
        borderBottomWidth:2,
        borderBottomStyle:'solid',
        borderBottomColor:theme.palette.project.sidebar.toolbar.border
    },
    header: {
        display: 'flex',
        flex: '1 1 auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerActions: {
        display: 'flex',
        flex: '0 0',
        alignItems: 'center',
        justifyContent: 'space-between',
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

const SideBar: React.FC<SideBarProps> = ({toolbar, header='no header', content, open, className = ''}: SideBarProps) => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(open)

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.toolbar}>
                <div className={classes.toggle} onClick={() => setToggle((value) => !value)}>
                    {toggle ? <DoubleArrowRightIcon/> : <DoubleArrowLeftIcon/>}
                </div>
                {toolbar}
            </div>
            <div className={clsx(classes.headerAndContent, {
                [classes.contentOpen]: toggle,
                [classes.contentClose]: !toggle,
            })}>
                <div className={clsx(classes.header, classes.divider)}>
                    {header}
                    <div className={classes.headerActions}>
                        <IconButton>
                            <OpenInNewWindowIcon size={18}/>
                        </IconButton>
                        <IconButton>
                            <OpenInNewTabIcon size={18}/>
                        </IconButton>
                    </div>
                </div>
                <div
                    className={classes.content}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default SideBar;
