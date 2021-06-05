import {Theme, makeStyles} from '@material-ui/core/styles';
import React from 'react';
import clsx from 'clsx'

export interface TypoProps {

    /**
     * Variant to use
     */
    variant: 'title' | 'titleSection' | 'subTitleSection' | 'body' | 'secondaryBody' | 'link' | 'tab' | 'placeholder' ;

    /**
     * Value to display
     */
    value: any

    /**
     * className
     */
    className?:string

}

const useStyles = makeStyles((theme: Theme) => ({
    root:{
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        fontWeight:'normal',
        letterSpacing: '0px'
    },
    title: {
        fontSize : 16,
        fontWeight:'bold'
    },
    titleSection: {
        fontSize : 16,
    },
    subTitleSection: {
        fontSize : 14,
        fontWeight:'bold'
    },
    body: {
        fontSize : 16,
    },
    secondaryBody: {
        fontSize : 14,
    },
    link: {
        fontSize : 14,
        color:theme.palette.project.text.link
    },
    tab: {
        fontSize : 14,
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing:'0.28px',
        textAlign: 'center'
    },
    placeholder: {
        fontSize : 12,
        fontStyle:'italic',
        color:theme.palette.project.text.placeholder
    },
}));

/**
 * Display the typo according the variant
 * @param {TypoProps} props Props of the component.
 * @returns {React.component} Display the typography
 */
const Typo: React.FC<TypoProps> = ({variant, value, className=''}: TypoProps) => {
    const classes:any = useStyles()

    return (<span className={clsx(classes.root, className, classes[variant])}>{value}</span>)
}

export default Typo;
