import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { ExpandMore } from 'assets/svg';
import React from 'react';
import Typo from 'components/Typography/Typo';
import { makeStyles } from '@material-ui/core';
import { uniqueId } from 'utils/system';

export interface AccordionProps {

    /**
     * Title
     */
    title: string | undefined;

    /**
     * It can be an icon or component to add in front of title
     */
    prefixActions?: any;

    /**
     * List of actions
     */
    actions?: any;

    /**
     * Content to display
     */
    children?: any;

}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '15px 0',
        boxShadow: '0px 3px 10px 0px rgb(0 0 0 / 25%)'
    },
    header: {
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBlock: theme.spacing(1)
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
    },
    details: {
        flexDirection: 'column'
    },
    actions: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginInline: theme.spacing(2),
        '& > * ': {
            marginLeft: theme.spacing(2)
        },
    }}))

const AccordionContainer = (props: AccordionProps) => {
    const classes = useStyles();
    const { title, prefixActions, actions, children } = props;
    const domId = uniqueId()

    //const handleOnChange = (event:any, expanded:boolean) => expanded && setTimeout(() => scrollIntoView(domId), 500)
    const handleOnChange = () => ({})

    return (
        <>
            <Accordion className={classes.root} onChange={handleOnChange} TransitionProps={{ mountOnEnter:true}}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <div id={domId} className={classes.header}>
                        <div className={classes.iconTitle}>
                            {prefixActions && <div className={classes.icon}>{prefixActions}</div>}
                            <Typo variant={'title'} value={title} />
                        </div>
                        <div className={classes.actions}>
                            {actions}
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    {children}
                </AccordionDetails>
            </Accordion>

        </>
    )
};

export default AccordionContainer;
