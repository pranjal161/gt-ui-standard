import {DoubleArrowLeftIcon, DoubleArrowRightIcon, OpenInNewTabIcon, OpenInNewWindowIcon} from 'assets/svg';
import React, {useEffect} from 'react';
import IconButton from 'theme/components/material/IconButton/IconButton';
import WithScroll from 'components/WithScroll/WithScroll';
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
    onToggle?: () => void

    /**
     * onChange callback
     */
    onChange?: (open: boolean) => void

    /**
     * triggered when Open in new window icon is clicked.
     * The current value object is passed
     */
    onOpenInNewWindow?: (value: any) => void

    /**
     * triggered when Open in new tab icon is clicked.
     * The current value object is passed
     */
    onOpenInNewTab?: (value: any) => void

    /**
     * className to add
     */
    className?: string

}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        flex: '1 0 auto',
        height: '100%',
        width: '100%',
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
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
        margin: '5% 0 0 5%',
        flexDirection: 'column',
        alignItems: 'start',
        height: '-webkit-fill-available',
        width: '100%'
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
        paddingBottom: theme.spacing(1)
    },
    headerTitle: {
        width: '100%',
        minWidth: 'calc(100% - 84px)'
    },
    headerActions: {
        display: 'flex',
        flex: '0 0',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        height: '-webkit-fill-available',
        width: '-webkit-fill-available',
        overflowY: 'hidden'
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

/**
 * Display a Sidebar with
 *
 * - toolbar
 *
 * - header
 *
 * - content
 *
 * - icons to open in NewTab and NewWindow
 *
 * The logic of toolbar/header/content is not handled by the Sidebar component.
 *
 * It can contains anyelse component.
 *
 * To have a logic navigation => headers => content, you can use useSidebar hook.
 * @param {any} props props
 * @param {any} toolbar Instantiate component
 * @param {any} header  Instantiate component
 * @param {any} content Instantiate component
 * @param {any} value Value of the current content, will be passed to the onOpen... callback
 * @param {boolean} open Default value for open
 * @param {function} onToggle Callback when the toggle icon is clicked
 * @param {function} onOpenInNewWindow Callback when the open in new window is clicked
 * @param {function} onOpenInNewTab Callback when the open in new tab is clicked
 * @param {string} className className to add with of the root CSS
 * @constructor
 */
export const PureSideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const {
        toolbar,
        header = 'no header',
        content,
        value,
        open,
        onToggle,
        onChange,
        onOpenInNewWindow,
        onOpenInNewTab,
        className = '',
    } = props
    const classes = useStyles();
    const handleToggle = () => {
        onToggle && onToggle()
    }

    useEffect(() => {
        onChange && onChange(open === true)
    }, [onChange, open])

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
                        <IconButton onClick={() => onOpenInNewWindow && onOpenInNewWindow(value)}
                            data-testid="sidebarOpenInNewWindow">
                            <OpenInNewWindowIcon size={18}/>
                        </IconButton>
                        <IconButton onClick={() => onOpenInNewTab && onOpenInNewTab(value)}
                            data-testid="sidebarOpenInNewTab">
                            <OpenInNewTabIcon size={18}/>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.content}>
                    <WithScroll>
                        {content}
                    </WithScroll>
                </div>
            </div>
        </div>
    )
}

export default React.memo(PureSideBar);
