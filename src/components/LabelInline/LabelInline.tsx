import {formatValue, getDescriptionFromOneOf} from 'utils/functions';
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

export interface LabelInlineProps {

    /**
     * Property to display
     */
    property: any

    /**
     * Raw data structured as AIA API Rest response
     */
    data?: any

    /**
     * Style of the type + option
     */
    styleType?: ['text' | 'currency' | 'percent' | 'decimal' | 'number' | 'date' | 'dateLong', any?]

    /**
     * isLoading
     */
    loading?: boolean

    /**
     * classname to add to Root classeName
     */
    className?: string
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: '1 1 auto',
        width: '100%',
        height: theme.spacing(3),
    },
    label: {
        color: theme.palette.project.text.label,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        textAlign: 'left',
        width: '50%',

    },
    loading: {
        height:'100%',
        width: '50%',
        background: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        lineHeight: '1rem',
    },
    loadingItem: {
        animation: 'glow 1.5s ease-in-out infinite',
        borderTop: '1px solid #f0f9fb',
        background: theme.palette.project.skeleton,
        width: '50%',
        height:'1rem',
        color: 'transparent',
        cursor: 'progress',
        display: 'inline-block'
    },
    value: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        textAlign: 'left',
        width: '50%',
    },
    text: {
        textAlign: 'left'
    },
    number: {
        textAlign: 'right'
    },
    decimal: {
        textAlign: 'right'
    },
    currency: {
        textAlign: 'right'
    },
    percent: {
        textAlign: 'right'
    },
    date: {
        textAlign: 'left'
    },
    dateLong: {
        textAlign: 'left'
    },
}));

/**
 * Display a LabelInline
 * @param {props} props Contains information related to the LabelInline
 * @returns {*} Return the LabelInline
 */
const LabelInline: React.FC<LabelInlineProps> = ({
    property,
    data,
    loading,
    styleType = ['text'],
    className
}: LabelInlineProps) => {
    const classes: any = useStyles();
    const {t} = useTranslation();
    const Skeleton = () => <div className={classes.loading}><span className={classes.loadingItem}></span></div>

    /**
     * Retrieve description for a given data
     * @returns {*} Return the description
     */
    function processDataOutput() {
        if (data && data[property]) {
            let value = getDescriptionFromOneOf(data[property], property, data);

            if (styleType)
                value = formatValue(value, styleType[0], styleType[1])

            return value
        }

        return '#NA'
    }

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.label}>
                {loading ? <Skeleton/> : property && t(property)}
            </div>
            <div className={classes.value}>
                {loading ? <Skeleton/> : <label dangerouslySetInnerHTML={{__html: processDataOutput()}}/>}
            </div>
        </div>
    );
};

export default LabelInline;
