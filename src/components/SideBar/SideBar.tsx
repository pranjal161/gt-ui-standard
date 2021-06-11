import {DoubleArrowLeftIcon, DoubleArrowRightIcon, OpenInNewTabIcon, OpenInNewWindowIcon} from 'assets/svg';
import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

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
     * value of current object
     */
    value?: any

    /**
     * onToggle callback
     */
    onToggle?: ()=> void

    /**
     * triggered when Open in new window icon is clicked.
     * The current value object is passed
     */
    onOpenInNewWindow?:(value:any)=> void

    /**
     * triggered when Open in new tab icon is clicked.
     * The current value object is passed
     */
    onOpenInNewTab?:(value:any)=> void

    /**
     * className to add
     */
    className?: string
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '2px',
        },
        '*::-webkit-scrollbar-thumb': {
            background: '#97a0af',
            borderRadius: '2px'
        },
        '*::-webkit-scrollbar-track': {
            background: theme.palette.project.sidebar.toolbar.border,
            borderRadius: '2px'
        }
    },
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flex: '1 0 auto',
        height: '100%',
        width: 'fit-content',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        placeSelf: 'stretch',
        justifyContent: 'left',
        minWidth: '44px',
        overflow: 'hidden',
        borderColor: theme.palette.project.sidebar.toolbar.border,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '44px',
        marginTop: theme.spacing(3),
        color: theme.palette.project.sidebar.toolbar.color,
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper
    },
    headerAndContent: {
        display: 'flex',
        margin: theme.spacing(3, 4, 0, 4),
        flexDirection: 'column',
        alignItems: 'start',
        height: '-webkit-fill-available'
    },
    divider: {
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.project.sidebar.toolbar.border
    },
    header: {
        display: 'flex',
        flex: '0 0 auto',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        flexGrow: 1
    },
    headerActions: {
        display: 'flex',
        flex: '0 0',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        display: 'flex',
        flex: '1 1 auto',
        overflowY: 'hidden',
        width: 'fit-content',
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

const SideBar: React.FC<SideBarProps> = ({
    toolbar,
    header = 'no header',
    content,
    value,
    open,
    onToggle,
    onOpenInNewWindow,
    onOpenInNewTab,
    className = ''
}: SideBarProps) => {
    const classes = useStyles();
    const handleToggle = () => {
        onToggle && onToggle()
    }

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.toolbar}>
                <div className={classes.toggle} onClick={() => handleToggle()} data-testid="sidebarToggle">
                    {open ? <DoubleArrowRightIcon/> : <DoubleArrowLeftIcon/>}
                </div>
                {toolbar}
            </div>
            <div className={clsx(classes.headerAndContent, {
                [classes.contentOpen]: open,
                [classes.contentClose]: !open,
            })}>
                <div className={clsx(classes.header, classes.divider)}>
                    <div className={classes.headerTitle}>{header}</div>
                    <div className={classes.headerActions}>
                        <IconButton onClick={() => onOpenInNewWindow && onOpenInNewWindow(value)} data-testid="sidebarOpenInNewWindow">
                            <OpenInNewWindowIcon size={18}/>
                        </IconButton>
                        <IconButton onClick={() => onOpenInNewTab && onOpenInNewTab(value)} data-testid="sidebarOpenInNewTab">
                            <OpenInNewTabIcon size={18}/>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.content}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default React.memo(SideBar);
