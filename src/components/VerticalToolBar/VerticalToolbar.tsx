import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: 'inherit',
        backgroundColor: theme.palette.background.paper,
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '44px',
        height: '44px',
        marginBottom: 0,
        color: theme.palette.project.sidebar.toolbar.color,
        textDecoration: 'none',
        backgroundColor: theme.palette.background.paper,
    },
    itemActivated: {
        color: theme.palette.project.sidebar.toolbar.activatedColor,
        backgroundColor: theme.palette.project.sidebar.toolbar.activatedBackground
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
 * @param {any} items to display
 * @param {string} current value
 * @param {any} onChange callback onChange
 * @constructor
 */
const VerticalToolbar: React.FC<VerticalToolbarProps> = ({items, value, onChange}: VerticalToolbarProps) => {
    const classes = useStyles()

    return (
        <ul className={classes.root}>
            {items && items.map((item: any, index: number) => (
                <li key={index} onClick={() => onChange && onChange(item.value)}
                    className={clsx(classes.item, {[classes.itemActivated]: value === item.value})}>
                    {item.display}
                </li>
            ))}
        </ul>
    )
}

export default React.memo(VerticalToolbar);
