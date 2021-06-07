import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        backgroundColor: theme.palette.background.paper,
        '& > *': {
            marginBottom: theme.spacing(1)
        }
    },

    item: {
        display: 'block',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper
    },

    itemActivated: {
        backgroundColor: theme.palette.primary.light
    }
}));

export interface VerticalToolbarProps {

    /**
     * Array of item
     */
    items?: any

    /**
     * Current value
     */
    value?: string

    /**
     * on change callback
     */
    onChange?: (value: any) => void
}

/**
 * Display the vertical toolbar with icons
 * @param {items} items to display
 * @param {value} current value
 * @param {onChange} callback onChange
 * @constructor
 */
const VerticalToolbar: React.FC<VerticalToolbarProps> = ({items, value, onChange}: VerticalToolbarProps) => {
    const classes = useStyles()
    console.log('VerticalToolbar')

    return (
        <>
            <ul className={classes.root}>
                {items && items.map((item: any, index: number) => (
                    <li key={index} onClick={() => onChange && onChange(item.value)}
                        className={clsx(classes.item, {[classes.itemActivated]: value === item.value})}>
                        {item.display}
                    </li>
                ))}
            </ul>
        </>
    )
}

VerticalToolbar.propTypes = {
    items: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
}

export default VerticalToolbar;
