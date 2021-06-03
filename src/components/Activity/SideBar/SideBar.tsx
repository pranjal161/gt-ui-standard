import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

export interface SideBarProps {

    /**
     * Expand or collapse
     */
    open?: boolean

    /**
     * NavBar
     */
    navBar?: any

    /**
     * Header
     */
    header?: any

    /**
     * content
     */
    content?: any

    /**
     * className to add
     */
    className? : any
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
        width:'fit-content',
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

const SideBar: React.FC<SideBarProps> = ({navBar, content, open, className=''}: SideBarProps) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.navBar}>
                {navBar}
            </div>
            <div
                className={clsx(classes.content, {
                    [classes.contentOpen]: open,
                    [classes.contentClose]: !open,
                })}
            >
                {content}
            </div>
        </div>
    )
}

export default SideBar;
