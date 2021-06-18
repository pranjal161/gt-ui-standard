import React from 'react';
import Typo from 'components/Typography/Typo';
import { makeStyles } from '@material-ui/core/styles';

export interface SectionProps {

    /**
     * Title
     */
    title?: string;

    /**
     * Icon to put beside the Title
     */
    icon?: any;

    /**
     * List of actions
     */
    actions?: any;

    /**
     * Content to display
     */
    children?: any;
}

/**
 * Display group information
 * Have summary and action
 * Can be expand to see Detail
 * @constructor
 */

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection:'column',
        flex: '1 1 auto',
        borderRadius: '6px 6px 0px 0px',
    },
    header: {
        boxShadow: `0px 1px 0px ${theme.palette.project.sidebar.toolbar.border}`,
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: theme.spacing(2)
    },
    iconTitle: {
        display:'inline-flex',
        alignItems:'center',
        marginLeft: theme.spacing(2),
        color: theme.palette.text.primary,
        '& > *': {
            marginRight: theme.spacing(2)
        },
    },
    icon: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: '25px',
        width:'32px',
        height:'32px',
        background: `${theme.palette.project.tabs.activated.border} 0% 0% no-repeat padding-box`
    },
    actions: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginInline: theme.spacing(2),
        '& > * ': {
            marginLeft: theme.spacing(2)
        },
    },
    content:{margin: theme.spacing(2),}
}))

const Section = (props: SectionProps) => {
    const classes = useStyles()
    const {title, icon, actions, children} = props;

    return (
        <div className={classes.root} data-testid="section-root">
            <div className={classes.header}>
                <div className={classes.iconTitle}>
                    { icon && <div className={classes.icon} data-testid="icon-class">{icon}</div>}
                    <Typo variant={'title'} value={title}/>
                </div>
                <div className={classes.actions} data-testid="actions">
                    {actions}
                </div>
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

export default Section;
