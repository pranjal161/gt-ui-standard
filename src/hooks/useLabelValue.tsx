import React, {useCallback} from 'react';
import {formatValue, getDescriptionFromOneOf} from 'utils/functions';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';

export interface useLabelValueProps {

    /**
     * Property to display
     */
    property: any

    /**
     * hRef of the label, the fetch has to be done outside
     */
    hRef: any

    /**
     * response of the hRef, requitred
     */
    response : any

    /**
     * loading
     */
    loading : boolean

    /**
     * Style of the type + option
     */
    styleType?: ['text' | 'currency' | 'percent' | 'decimal' | 'number' | 'date' | 'dateLong' | any, any?]

    /**
     * context used for translation
     */
    context?:string

    /**
     * onClick callback
     */
    onClick?: any
}

const useStyles = makeStyles((theme) => ({
    loading: {
        height: '100%',
        width: '100%',
        background: theme.palette.common.white,
        display: 'flex',
        alignItems: 'center',
        lineHeight: '1rem',
    },
    loadingItem: {
        animation: '$glow 1.5s ease-in-out infinite',
        borderTop: '1px solid #f0f9fb',
        background: '#eee',
        height: '1rem',
        color: 'transparent',
        cursor: 'progress',
        display: 'inline-block',
        width: '75%',
    },
    value: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        flex: 4,
        fontSize: 14,
        textAlign: 'left',
        width: '50%',
        overflowWrap: 'break-word',
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
    '@keyframes glow': {
        '0%': {},
        '100%': {
            opacity: 1
        },
        '50%': {
            opacity: 0.5
        }
    },
}));

const Skeleton = React.memo(() => {
    const classes: any = useStyles()

    return (<div className={classes.loading}>
        <span className={clsx(classes.loadingItem, classes.loadingItemLabel)}/></div>)
})
Skeleton.displayName = 'Skeleton'

const useLabelValue = ({property, hRef, response, loading, styleType, onClick, context}: useLabelValueProps) => {
    const {t} = useTranslation();

    const getValue = useCallback(() => {
        if (response && response.data[property]) {
            let value = getDescriptionFromOneOf(response.data[property], property, response.data);

            if (styleType)
                value = formatValue(value, styleType[0], styleType[1])

            return value
        }

        return ''
    }, [property, response, styleType])

    const options = context && {context}
    const Label = React.memo(() => property && t(property, {...options})) //(loading ? <Skeleton/> : property && t(property))
    Label.displayName='Label'
    const Value = React.memo(() => (loading ? <Skeleton/> :
        <label dangerouslySetInnerHTML={{__html: getValue()}} onClick={onClick}/>))
    Value.displayName='Value'

    return {Label, Value}
}

export default useLabelValue;
