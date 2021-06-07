import {useMediaQuery, useTheme} from '@material-ui/core';
import {DoubleArrowLeftIcon, DoubleArrowRightIcon, OpenInNewTabIcon, OpenInNewWindowIcon} from 'assets/svg';
import React, {useState} from 'react';
import IconButton from 'theme/components/material/IconButton/IconButton';
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
     * className to add
     */
    className?: any
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            display: 'none'
        }},
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
        flex: '0 0 auto',
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
        display: 'flex',
        flex: '1 1 auto',
        overflowY:'hidden',
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
    open,
    className = ''
}: SideBarProps) => {
    const classes = useStyles();
    const theme = useTheme()
    const isLargeMedia = useMediaQuery(theme.breakpoints.up('md'))
    const defaultOpen = open || isLargeMedia
    const [toggle, setToggle] = useState(defaultOpen)

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
                <div className={classes.content}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default SideBar;
