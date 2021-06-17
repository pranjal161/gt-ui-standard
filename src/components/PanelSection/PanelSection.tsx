import clsx from 'clsx';
import React from 'react';
import Typo from 'components/Typography/Typo';
import {makeStyles} from '@material-ui/core/styles';

export interface PanelSectionItem {

    /**
     * id
     */
    id?: string

    /**
     * Style of the data, format is :
     * first item : currency, date, ...
     * second item : option, like 'usd', to use the currency of the ocntract per example instead the current of locale
     */
    styleType?: [any, any?]
}

export interface PanelSectionProps {

    /**
     * Title
     */
    title?: any,

    /**
     * content to display
     */
    content?: any

    /**
     * Classname
     */
    className?:string

}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        width: '100%',
    },
    title: {
        textAlign: 'start',
        overflowWrap: 'break-word',
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.project.sidebar.toolbar.border
    },
    content: {
        paddingTop: theme.spacing(2),
        ' & > * ': {
            marginBottom: theme.spacing(1)
        }
    }

}));

const PanelSection: React.FC<PanelSectionProps> = ({title, content, className}: PanelSectionProps) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, className)}>
            <Typo className={classes.title} variant={'subTitleSection'} value={title}/>
            <div className={classes.content}>
                {content}
            </div>
        </div>
    )
}

export default PanelSection;
