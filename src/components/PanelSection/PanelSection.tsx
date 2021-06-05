import {makeStyles} from '@material-ui/core/styles';
import {resource} from 'assets/staticData/data';
import LabelInline from 'components/LabelInline/LabelInline';
import Typo from 'components/Typography/Typo';
import React from 'react';

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
     * items to display
     */
    items?: PanelSectionItem[]

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
        marginTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: theme.palette.project.sidebar.toolbar.border
    },
    items: {
        paddingTop: theme.spacing(2),
        ' & > * ': {
            marginBottom: theme.spacing(1)
        }
    }

}));

const PanelSection: React.FC<PanelSectionProps> = ({title, items}: PanelSectionProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typo className={classes.title} variant={'subTitleSection'} value={title}/>
            <div className={classes.items}>
                {items && items.map(
                    (item) => <LabelInline key={item.id} property={item.id} data={resource} styleType={item.styleType}/>)}
            </div>
        </div>
    )
}

export default PanelSection;
